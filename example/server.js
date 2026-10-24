"use strict";

var connect = require('connect');
var path = require('path');
var parseurl = require('parseurl');
var serveContent = require('..');

var mime = serveContent.mime;
mime.types.specialtext = 'text/special';

var app = connect();

app.use(serveContent('test/fixtures', {index: ['todo.html'], extensions:['html'], allowedExts:['','html','png','txt','specialtext']}));

// the urls are logged with JSON.stringify: it escapes the line feeds, so the values cannot forge log lines
app.use(function(req, res, next){
    console.log('entrance:', JSON.stringify(req.url));
    var ext=path.extname(parseurl(req).pathname);
    console.log('ext:', JSON.stringify(ext));
    if (ext === '.php') {
        console.log('a PHP');
        res.end('php recived to serve');
    }else{
        return next();
    }
});

app.use(function(req, res, next){
    console.log('finally:', JSON.stringify(req.url));
    return next();
});

app.listen(3000);

console.log('try:',{
    'localhost:3000':'- groceries',
    'localhost:3000/ok.png':'a ok hand',
    'localhost:3000/a_program.php':'php recived to serve'
});
