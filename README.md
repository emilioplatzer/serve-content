# extension-serve-static

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Linux Build][travis-image]][travis-url]
[![Windows Build][appveyor-image]][appveyor-url]
[![Test Coverage][coveralls-image]][coveralls-url]

serve-static based on file name extensions
## based on serve-static

All in [*serve-static* documentation](https://www.npmjs.com/package/serve-static#readme) is working here. 
But *extension-serve-static* add one mandatory [parameter](https://www.npmjs.com/package/serve-static#options): 

## staticExtensions

*staticExtensions* is a white list of extensions names for serve, this allows something like this:

```js
var connect = require('connect')
var extensionServeStatic = require('extension-serve-static')

var app = connect()

// Serve up all folders for images
app.use(extensionServeStatic('/', {
    extensions: ['html', 'htm'], 
    index: 'index.html', 
    staticExtensions: ['', 'html', 'htm', 'png', 'jpg', 'jpeg', 'gif']
})

// Listen
app.listen(3000)
```

## default extensions

For use the *serve-static* [extensions](https://www.npmjs.com/package/serve-static#extensions) parameter
you must include de empty string ('') in the staticExtension list (as you see in the example). 

## mime types

*extension-serve-static* also search the extension in the mime types. 
If you need to add a non standard extension you can add it in the mime field

```js
var connect = require('connect')
var extensionServeStatic = require('extension-serve-static')

var mime = extensionServeStatic.mime;

mime.types.specialimage = 'image/special';

var app = connect()

// Serve up all folders for images
app.use(extensionServeStatic('/', {
    extensions: ['html', 'htm'], 
    index: 'index.html', 
    staticExtensions: ['', 'html', 'htm', 'png', 'jpg', 'jpeg', 'gif', 'specialimage']
})

// Listen
app.listen(3000)
```


## License

[GPL-2.0](LICENSE)

[npm-image]: https://img.shields.io/npm/v/extension-serve-static.svg?style=flat
[npm-url]: https://npmjs.org/package/extension-serve-static
[travis-image]: https://img.shields.io/travis/emilioplatzer/extension-serve-static/master.svg?label=linux&style=flat
[travis-url]: https://travis-ci.org/emilioplatzer/extension-serve-static
[appveyor-image]: https://img.shields.io/appveyor/ci/emilioplatzer/extension-serve-static/master.svg?label=windows&style=flat
[appveyor-url]: https://ci.appveyor.com/project/emilioplatzer/extension-serve-static
[coveralls-image]: https://img.shields.io/coveralls/emilioplatzer/extension-serve-static/master.svg?style=flat
[coveralls-url]: https://coveralls.io/r/emilioplatzer/extension-serve-static
[downloads-image]: https://img.shields.io/npm/dm/extension-serve-static.svg?style=flat
[downloads-url]: https://npmjs.org/package/extension-serve-static
