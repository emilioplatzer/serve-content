"use strict";

var connect = require('connect')
var path = require('path')
var url = require('url');
var serveContent = require('..')

mime.types.specialtext = 'text/special';
 
var app = connect()
 
app.use(serveContent('test/fixtures', {index: ['todo.html'], extensions:['html'], staticExtensions:['','html','png','txt','specialtext']}))

app.use(function(req, res, next){
    console.log('entrance:',req.url);
    var ext=path.extname(url.parse(req.url).path);
    console.log('ext:',ext);
    if(ext=='.php'){
        console.log('a PHP');
        res.end('php recived to serve');
    }else{
        return next();
    }
});

app.use(function(req, res, next){
    console.log('finally:',req.url);
    return next();
});

app.listen(3000);

console.log('try:',{
    'localhost:3000':'- groceries',
    'localhost:3000/ok.png':'a ok hand',
    'localhost:3000/a_program.php':'php recived to serve'
});