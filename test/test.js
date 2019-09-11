"use strict";

var assert = require('assert');
var http = require('http');
var path = require('path');
var request = require('supertest');
var serveContent = require('..');

var fixtures = __dirname + '/fixtures';
var relative = path.relative(process.cwd(), fixtures);

var skipRelative = ~relative.indexOf('..') || path.resolve(relative) === relative;

describe('serveContent()', function(){
  
  describe('basic operations', function(){
    var server;
    var serverExcl;
    before(function () {
      server = createServer(null,{allowedExts:['','txt','png','html','php','php2','specialtext','css'], extensions:['html']});
      serverExcl = createServer(null,{allowAllExts:true, excludeExts:['']});
    });

    it('should serve static files', function(done){
      request(server)
      .get('/todo.txt')
      .expect(200, '- groceries', done);
    });

    it('should support nesting', function(done){
      request(server)
      .get('/users/tobi.txt')
      .expect(200, 'ferret', done);
    });

    it('should set Content-Type', function(done){
      request(server)
      .get('/ok.png')
      .expect('Content-Type', 'image/png')
      .expect(200, done);
    });

    it('should support index.html', function(done){
      request(server)
      .get('/users/')
      .expect(200)
      .expect('Content-Type', /html/)
      .expect('<p>tobi, loki, jane</p>', done);
    });

    it('should support ../', function(done){
      request(server)
      .get('/users/../todo.txt')
      .expect(200, '- groceries', done);
    });

    it('should skip POST requests', function(done){
      request(server)
      .post('/todo.txt')
      .expect(404, 'sorry!', done);
    });

    it('should skip not mentioned extensions', function(done){
      request(server)
      .get('/a_program.js')
      .expect(404, 'sorry!', done);
    });

    it('should skip not mimed extensions', function(done){
      request(server)
      .get('/a_program.php2')
      .expect(404, 'sorry!', done);
    });

    it('should not skip special mimed extensions', function(done){
      var mime = serveContent.mime;
      mime.types.specialtext = 'text/special';
      request(server)
      .get('/this.specialtext')
      .expect(200, 'this special text', done);
    });

    it('should require options', function(){
      assert.throws(serveContent.bind(null,'/'), /options required/);
    });

    it('should require allowedExts', function(){
      assert.throws(serveContent.bind(null,'/',{}), /options.allowedExts required/);
    });

    it('should serve html without extension', function(done){
      request(server)
      .get('/todo')
      .expect(200, '<li>groceries</li>', done);
    });

    it('should serve jade files', function(done){
      request(server)
      .get('/a-jade')
      .expect(200, '<p>hello</p>', done);
    });

    it.skip('should serve markdown files files', function(done){
      request(server)
      .get('/a-markdown')
      .expect(200, '<h1>title</h1>', done);
    });

    it('should serve stylus files', function(done){
      request(server)
      .get('/a-stylus.css')
      .expect(200, 'p {\n  color: #123;\n}\n', done);
    });

    it('should reject stylus files if not allowed', function(done){
      request(serverExcl)
      .get('/a-jade')
      .expect(404, 'sorry!', done);
    });

    it('should serve all not excluded', function(done){
      request(serverExcl)
      .get('/ok.png')
      .expect('Content-Type', 'image/png')
      .expect(200, done);
    });
  })
});

function createServer(dir, opts, fn) {
  dir = dir || fixtures;

  var _serve = serveContent(dir, opts);

  return http.createServer(function (req, res) {
    fn && fn(req, res);
    _serve(req, res, function (err) {
      res.statusCode = err ? (err.status || 500) : 404;
      res.end(err ? err.stack : 'sorry!');
    });
  });
}


/*
function shouldNotHaveHeader(header) {
  return function (res) {
    assert.ok(!(header.toLowerCase() in res.headers), 'should not have header ' + header)
  }
}

*/