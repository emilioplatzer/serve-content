/*!
 * serve-content
 * 2015-2016 Emilio Platzer
 * GNU Licensed
 */

/**
 * Module dependencies.
 */

var parseurl = require('parseurl');
var path = require('path');
var serveStatic = require('serve-static');
var miniTools = require('mini-tools');

exports = module.exports = function serveContent(root, options) {
  if (!options) {
    throw new TypeError('options required')
  }
  if (!options.staticExtensions) {
    throw new TypeError('options.staticExtensions required')
  }
  var staticExtensions=options.staticExtensions;
  delete options.staticExtensions;
  
  var wichServeStatic = options.serveStatic || serveStatic(root,options); // Can change how to ServeStatic
  
  root = path.resolve(root);
  return function servingContent(req, res, next){
    var pathname = req.path || parseurl(req).pathname
    var ext = path.extname(pathname).replace(/^\.?/,'');
    if(ext===''){
        return miniTools.serveJade(root, true)(req, res, function(err){
            if(err){
                return next(err);
            }
            return wichServeStatic(req, res, next);
        });
    }else{
        if(staticExtensions.indexOf(ext)==-1) return next();
        if(ext && !exports.mime.types[ext]) return next();
        return wichServeStatic(req, res, next);
    }
  }
}

exports.mime = serveStatic.mime
