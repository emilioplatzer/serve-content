# serve-content

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Linux Build][travis-image]][travis-url]
[![Windows Build][appveyor-image]][appveyor-url]
[![Test Coverage][coveralls-image]][coveralls-url]

serve-content based on file name extensions and serving jade and stylus files
## based on serve-static

All in [*serve-static* documentation](https://www.npmjs.com/package/serve-static#readme) is working here. 
But *serve-content* add one mandatory [parameter](https://www.npmjs.com/package/serve-static#options): 

## allowedExts

*allowedExts* is a white list of extensions names for serve, this allows something like this:

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

[npm-image]: https://img.shields.io/npm/v/serve-content.svg?style=flat
[npm-url]: https://npmjs.org/package/serve-content
[travis-image]: https://img.shields.io/travis/emilioplatzer/serve-content/master.svg?label=linux&style=flat
[travis-url]: https://travis-ci.org/emilioplatzer/serve-content
[appveyor-image]: https://img.shields.io/appveyor/ci/emilioplatzer/serve-content/master.svg?label=windows&style=flat
[appveyor-url]: https://ci.appveyor.com/project/emilioplatzer/serve-content
[coveralls-image]: https://img.shields.io/coveralls/emilioplatzer/serve-content/master.svg?style=flat
[coveralls-url]: https://coveralls.io/r/emilioplatzer/serve-content
[downloads-image]: https://img.shields.io/npm/dm/serve-content.svg?style=flat
[downloads-url]: https://npmjs.org/package/serve-content
