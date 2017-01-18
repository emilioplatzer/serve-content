"use strict";
/*!
 * serve-content
 * 2015-2017 Emilio Platzer
 * GNU Licensed
 */

/**
 * Module dependencies.
 */

var parseurl = require('parseurl');
var path = require('path');
var serveStatic = require('serve-static');
var miniTools = require('mini-tools');
var changing = require('best-globals').changing;

function serveContent(root, options) {
  if (!options) {
    throw new TypeError('options required')
  }
  if (!options.allowedExts) {
    throw new TypeError('options.allowedExts required')
  }
  var allowedExts=options.allowedExts;
  delete options.allowedExts;
  
  var whichServeStatic = options.serveStatic || serveStatic(root,changing(options, {allowedExts:undefined}, changing.options({deletingValue:undefined}))); // Can change how to ServeStatic
  
  root = path.resolve(root);
  return function servingContent(req, res, next){
    var pathname = req.path || parseurl(req).pathname
    var ext = path.extname(pathname).replace(/^\.?/,'');
    if(allowedExts.indexOf(ext)==-1) return next();
    if(ext && !exports.mime.types[ext]) return next();
    var transformer = serveContent.transformer[ext];
    if(transformer){
        return miniTools[transformer.name](root, changing(options[transformer.optionName]||{}, {anyFile:true}))(req, res, function(err){
            /* istanbul ignore next */
            if(err){
                return next(err);
            }
            return whichServeStatic(req, res, next);
        });
    }else{
        return whichServeStatic(req, res, next);
    }
  }
}

serveContent.transformer={
    '' : {name:'serveJade'   , optionName:'jade'},
    css: {name:'serveStylus' , optionName:'styl'},
}

serveContent.mime = serveStatic.mime;
 
exports = module.exports = serveContent;
