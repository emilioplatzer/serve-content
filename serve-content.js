"use strict";

var serveContent = {};

var parseurl = require('parseurl');
var Path = require('path');
var serveStatic = require('serve-static');
var mime = require('mime-types');
var miniTools = require('mini-tools');
var changing = require('best-globals').changing;

// same check that send does: a normalized path that goes above the root
var UP_PATH_REGEXP = /(?:^|[\\/])\.\.(?:[\\/]|$)/;

function httpError(status, message){
    var err = new Error(message);
    err.status = status;
    err.statusCode = status;
    return err;
}

function getTraceroute(){
    try{
        throw new Error('aca estamos')
    }catch(err){
        return err.stack.split('\n')[3];
    }
}

serveContent = function serveContent(root, options) {
    var traceForDebug;
    if (!options) {
      throw new TypeError('options required')
    }
    if (!options.allowedExts && !options.allowAllExts) {
      throw new TypeError('options.allowedExts required')
    }
    var allowedExts=(options.allowedExts||[]).map(ext => ext.toLowerCase());
    var excludeExts=(options.excludeExts||[]).map(ext => ext.toLowerCase());
    var fallthrough = options.fallthrough !== false;
    // what to pass to next() when it is not served, as serve-static does
    function rejection(status, message){
        return fallthrough ? undefined : httpError(status, 'serve-content: '+message);
    }
    if(serveContent.logAll){
        traceForDebug = getTraceroute();
    }
    var whichServeStatic = options.serveStatic ||
        serveStatic(root,changing(options, {
            allowedExts:undefined,
            allowAllExts:undefined,
            excludeExts:undefined,
            allowUnknownExts:undefined,
        }, changing.options({deletingValue:undefined}))); // Can change how to ServeStatic
    root = Path.resolve(root);
    return function servingContent(req, res, next){
        if (req.method !== 'GET' && req.method !== 'HEAD') {
            if (fallthrough) {
                return next();
            }
            // method not allowed, as serve-static does
            res.statusCode = 405;
            res.setHeader('Allow', 'GET, HEAD');
            res.setHeader('Content-Length', '0');
            return res.end();
        }
        var pathname;
        try{
            // decoded as serve-static does, so the extension is the one of the file that it will look for
            pathname = decodeURIComponent(req.path || parseurl(req).pathname);
        }catch(err){
            return next(rejection(400, 'malformed URI: '+err.message));
        }
        if (UP_PATH_REGEXP.test(Path.normalize('.' + Path.sep + pathname))) {
            return next(rejection(403, 'path outside root'));
        }
        var ext = Path.extname(pathname).replace(/^\.?/,'').toLowerCase();
        // ok cuando excludeExts.indexOf(ext)==-1 && (opt.allowAllExts || allowedExts.indexOf(ext)!=-1)
        if (excludeExts.indexOf(ext) !== -1 || (!options.allowAllExts && allowedExts.indexOf(ext) === -1)) {
            return next(rejection(404, 'extension not allowed'));
        }
        if (ext && !options.allowUnknownExts && !mime.types[ext]) {
            return next(rejection(404, 'unknown extension'));
        }
        var transformers = serveContent.transformer[ext];
        transformers = transformers ? (transformers instanceof Array ? transformers : [transformers]) : [];
        transformers = transformers.filter(transformer => (typeof miniTools[transformer.name] === "function"));
        return transformers.reduce(function(andThen, transformer){
            var defaultOpts={anyFile:true};
            if(transformer.withFlash){
                defaultOpts.flash = {};
                if(req.flash instanceof Function){
                    var newFlash = req.flash() || {};
                    for(var x in newFlash){ // eslint-disable-line no-unreachable-loop -- it only checks if newFlash has any enumerable property (inherited ones included)
                        req.serveContentFlash = newFlash;
                        break;
                    }
                    defaultOpts.flash = req.serveContentFlash || {};
                }
            }
            if(serveContent.logAll){
                defaultOpts.trace = traceForDebug;
            }
            /* istanbul ignore if */
            if (typeof miniTools[transformer.name] !== "function") {
                console.error('ERROR serve-content miniTools[transformer.name] not found')
                console.log(transformer)
                console.log(options)
                throw new Error("ERROR serve-content miniTools[transformer.name] not found");
            }
            return function(req, res, next){
                return miniTools[transformer.name](root, changing(defaultOpts, options[transformer.optionName]||{}))(req, res, function(err){
                    /* istanbul ignore next */
                    if(err){
                        return next(err);
                    }
                    return andThen(req, res, next);
                });
            }
        }, whichServeStatic)(req, res, next);
    }
}

serveContent.transformer={
    '' : [
        {name:'serveJade'    , optionName:'jade', withFlash:true},
        {name:'serveMarkdown', optionName:'md', withFlash:true}
    ],
    css: {name:'serveStylus' , optionName:'styl'},
};

serveContent.mime = mime;

serveContent.logAll = false;

exports = module.exports = serveContent;
