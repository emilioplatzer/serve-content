<!--multilang v0 es:LEEME.md en:README.md -->
# serve-content

serve-content based on file name extensions and serving jade and stylus files

<!-- cucardas -->
![extending](https://img.shields.io/badge/stability-extending-orange.svg)
[![npm-version](https://img.shields.io/npm/v/serve-content.svg)](https://npmjs.org/package/serve-content)
[![downloads](https://img.shields.io/npm/dm/serve-content.svg)](https://npmjs.org/package/serve-content)
[![linux](https://img.shields.io/travis/emilioplatzer/serve-content/master.svg)](https://travis-ci.org/emilioplatzer/serve-content)
[![windows](https://ci.appveyor.com/api/projects/status/github/emilioplatzer/serve-content?svg=true)](https://ci.appveyor.com/project/emilioplatzer/serve-content)
[![climate](https://img.shields.io/codeclimate/github/emilioplatzer/serve-content.svg)](https://codeclimate.com/github/emilioplatzer/serve-content)
[![dependencies](https://img.shields.io/david/emilioplatzer/serve-content.svg)](https://david-dm.org/emilioplatzer/serve-content)
[![qa-control](http://codenautas.com/github/emilioplatzer/serve-content.svg)](http://codenautas.com/github/emilioplatzer/serve-content)

<!--multilang buttons-->

idioma: ![castellano](https://raw.githubusercontent.com/codenautas/multilang/master/img/lang-es.png)
también disponible en:
[![inglés](https://raw.githubusercontent.com/codenautas/multilang/master/img/lang-en.png)](README.md)

<!--lang:es-->

## basado en serve-static

Tiene todo lo que tiene [*serve-static* documentation](https://www.npmjs.com/package/serve-static#readme). 
El módulo *serve-content* agrega un [parameter](https://www.npmjs.com/package/serve-static#options) obligatorio: 

<!--lang:en--]

## based on serve-static

All in [*serve-static* documentation](https://www.npmjs.com/package/serve-static#readme) is working here. 
But *serve-content* add one mandatory [parameter](https://www.npmjs.com/package/serve-static#options): 

[!--lang:*-->

## allowedExts

<!--lang:es-->

*allowedExts* es una lista de extensiones permitidas. 

<!--lang:en--]

*allowedExts* is a white list of extensions names for serve, this allows something like this:

[!--lang:*-->

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

<!--lang:es-->

## extensiones por defecto

Para usar el parámetro [extensions](https://www.npmjs.com/package/serve-static#extensions) de *serve-static*
hay que incluir la cadena vacía ('') in la lista de extensiones (staticExtension). 

<!--lang:en--]

## default extensions

For use the *serve-static* [extensions](https://www.npmjs.com/package/serve-static#extensions) parameter
you must include de empty string ('') in the staticExtension list (as you see in the example). 

[!--lang:*-->

## mime types

<!--lang:es-->

*serve-content* también busca las extensiones de "mime types". 
Se pueden agregar extensiones en el campo mime. 

<!--lang:en--]

*serve-content* also search the extension in the mime types. 
If you need to add a non standard extension you can add it in the mime field

[!--lang:*-->

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

<!--lang:es-->

## Licencia

[MIT](LICENSE)

<!--lang:en--]

## License

[MIT](LICENSE)

[!--lang:*-->
