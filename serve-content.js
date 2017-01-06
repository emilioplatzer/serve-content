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

function serveContent(root, options) {
  if (!options) {
    throw new TypeError('options required')
  }
  if (!options.allowedExts) {
    throw new TypeError('options.allowedExts required')
  }
  var allowedExts=options.allowedExts;
  delete options.allowedExts;
  
  var wichServeStatic = options.serveStatic || serveStatic(root,options); // Can change how to ServeStatic
  
  root = path.resolve(root);
  return function servingContent(req, res, next){
    var pathname = req.path || parseurl(req).pathname
    var ext = path.extname(pathname).replace(/^\.?/,'');
    if(allowedExts.indexOf(ext)==-1) return next();
    if(ext && !exports.mime.types[ext]) return next();
    var transformer = serveContent.transformer[ext];
    if(transformer){
        return miniTools[transformer](root, true)(req, res, function(err){
            /* istanbul ignore next */
            if(err){
                return next(err);
            }
            return wichServeStatic(req, res, next);
        });
    }else{
        return wichServeStatic(req, res, next);
    }
  }
}

serveContent.transformer={
    '': 'serveJade',
    css: 'serveStylus'
}

serveContent.mime = serveStatic.mime;
 
exports = module.exports = serveContent;
