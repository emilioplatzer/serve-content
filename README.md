# serve-content

serve-content based on file name extensions and serving jade and stylus files

![extending](https://img.shields.io/badge/stability-extending-orange.svg)
[![npm-version](https://img.shields.io/npm/v/serve-content.svg)](https://npmjs.org/package/serve-content)
[![downloads](https://img.shields.io/npm/dm/serve-content.svg)](https://npmjs.org/package/serve-content)
[![linux](https://img.shields.io/travis/emilioplatzer/serve-content/master.svg)](https://travis-ci.org/emilioplatzer/serve-content)
[![windows](https://ci.appveyor.com/api/projects/status/github/emilioplatzer/serve-content?svg=true)](https://ci.appveyor.com/project/emilioplatzer/serve-content)
[![dependencies](https://img.shields.io/david/emilioplatzer/serve-content.svg)](https://david-dm.org/emilioplatzer/serve-content)


language: ![English](https://raw.githubusercontent.com/codenautas/multilang/master/img/lang-en.png)
also available in:
[![Spanish](https://raw.githubusercontent.com/codenautas/multilang/master/img/lang-es.png)](LEEME.md)


## based on serve-static

All in [*serve-static* documentation](https://www.npmjs.com/package/serve-static#readme) is working here.
But *serve-content* add some mandatory [parameters](https://www.npmjs.com/package/serve-static#options)
to indicate which are the allowed extensions:


## allowedExts


*allowedExts* is a white list of extensions names for serve.


## allowAllExts


*allowAllExts* is a boolean. True means that all extensions are allowed. It can be used with `excludeExts`.


## excludeExts


*allowedExts* is a black list with ignorings extensions.


# example



```js
var connect = require('connect')
var extensionServeStatic = require('serve-content')

var app = connect()

// Serve up all folders for images
app.use(serveContent('/', {
    extensions: ['html', 'htm'],
    index: 'index.html',
    allowedExts: ['', 'html', 'htm', 'png', 'jpg', 'jpeg', 'gif']
})

// Listen
app.listen(3000)
```


## default extensions

For use the *serve-static* [extensions](https://www.npmjs.com/package/serve-static#extensions) parameter
you must include de empty string ('') in the staticExtension list (as you see in the example).


## mime types


*serve-content* also search the extension in the mime types.
If you need to add a non standard extension you can add it in the mime field


```js
var connect = require('connect')
var extensionServeStatic = require('serve-content')

var mime = extensionServeStatic.mime;

mime.types.specialimage = 'image/special';

var app = connect()

// Serve up all folders for images
app.use(serveContent('/', {
    extensions: ['html', 'htm'],
    index: 'index.html',
    allowedExts: ['', 'html', 'htm', 'png', 'jpg', 'jpeg', 'gif', 'specialimage']
})

// Listen
app.listen(3000)
```


## License

[MIT](LICENSE)

