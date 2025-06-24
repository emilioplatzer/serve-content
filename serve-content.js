"use strict";

var serveContent = {};

var parseurl = require('parseurl');
var Path = require('path');
var serveStatic = require('serve-static');
var mime = require('mime');
var miniTools = require('mini-tools');
var changing = require('best-globals').changing;

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
    var allowedExts=options.allowedExts||[];
    var excludeExts=options.excludeExts||[];
    if(serveContent.logAll){
        traceForDebug = getTraceroute();
    }
    var whichServeStatic = options.serveStatic ||
        serveStatic(root,changing(options, {
            allowedExts:undefined, 
            allowAllExts:undefined, 
            excludeExts:undefined, 
        }, changing.options({deletingValue:undefined}))); // Can change how to ServeStatic
    root = Path.resolve(root);
    return function servingContent(req, res, next){
        if(req.method!='GET'){
            return next();
        }
        var pathname = req.path || parseurl(req).pathname;
        var ext = Path.extname(pathname).replace(/^\.?/,'');
        // ok cuando excludeExts.indexOf(ext)==-1 && (opt.allowAllExts || allowedExts.indexOf(ext)!=-1)
        if(excludeExts.indexOf(ext)!=-1 || (!options.allowAllExts && allowedExts.indexOf(ext)==-1)) return next();
        if(ext && !mime.getType(ext)) return next();
        var transformers = serveContent.transformer[ext];
        var transformers = transformers ? (transformers instanceof Array ? transformers : [transformers]) : [];
        return transformers.reduce(function(andThen, transformer){
            var defaultOpts={anyFile:true};
            if(transformer.withFlash){
                defaultOpts.flash = {};
                if(req.flash instanceof Function){
                    var newFlash = req.flash() || {};
                    for(var x in newFlash){
                        req.serveContentFlash = newFlash;
                        break;
                    }
                    defaultOpts.flash = req.serveContentFlash || {};
                }
            }
            if(serveContent.logAll){
                defaultOpts.trace = traceForDebug;
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
