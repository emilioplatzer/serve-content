<!--multilang v0 es:LEEME.md en:README.md -->
# serve-content

<!--lang:es-->

Sirve archivos estáticos según la extensión del nombre del archivo

<!--lang:en--]

Serve static files based on file name extensions

[!--lang:*-->

<!-- cucardas -->
[![npm-version](https://img.shields.io/npm/v/serve-content.svg)](https://npmjs.org/package/serve-content)
[![downloads](https://img.shields.io/npm/dm/serve-content.svg)](https://npmjs.org/package/serve-content)
[![linux](https://github.com/emilioplatzer/serve-content/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/emilioplatzer/serve-content/actions/workflows/build-and-test.yml)
[![windows](https://ci.appveyor.com/api/projects/status/github/emilioplatzer/serve-content?svg=true)](https://ci.appveyor.com/project/emilioplatzer/serve-content)
[![coverage](https://img.shields.io/coveralls/emilioplatzer/serve-content/master.svg)](https://coveralls.io/r/emilioplatzer/serve-content)
[![sonar](https://sonarcloud.io/api/project_badges/measure?project=emilioplatzer_serve-content&metric=alert_status)](https://sonarcloud.io/summary/overall?id=emilioplatzer_serve-content)
[![qa-control](https://github.com/emilioplatzer/serve-content/actions/workflows/qa-control.yml/badge.svg)](https://github.com/emilioplatzer/serve-content/actions/workflows/qa-control.yml)

<!--multilang buttons-->

idioma: ![castellano](https://raw.githubusercontent.com/codenautas/multilang/master/img/lang-es.png)
también disponible en:
[![inglés](https://raw.githubusercontent.com/codenautas/multilang/master/img/lang-en.png)](README.md)

<!--lang:es-->

## basado en serve-static

Tiene todo lo que tiene [*serve-static* documentation](https://www.npmjs.com/package/serve-static#readme).
El módulo *serve-content* agrega un conjunto de [parámetros](https://www.npmjs.com/package/serve-static#options) obligatorios
para indicar cuáles son las extensiones permitidas (o las excluidas):

<!--lang:en--]

## based on serve-static

All in [*serve-static* documentation](https://www.npmjs.com/package/serve-static#readme) is working here.
But *serve-content* add some mandatory [parameters](https://www.npmjs.com/package/serve-static#options)
to indicate which are the allowed extensions:

[!--lang:*-->

## allowedExts

<!--lang:es-->

*allowedExts* es una lista de extensiones permitidas.

<!--lang:en--]

*allowedExts* is a white list of extensions names for serve.

[!--lang:*-->

## allowAllExts

<!--lang:es-->

*allowAllExts* indica que todas las extensiones se permiten, se puede usar junto con `excludeExts`.

<!--lang:en--]

*allowAllExts* is a boolean. True means that all extensions are allowed. It can be used with `excludeExts`.

[!--lang:*-->

## excludeExts

<!--lang:es-->

*excludeExts* es una lista de extensiones que se ignorarán.

<!--lang:en--]

*excludeExts* is a black list with ignorings extensions.

[!--lang:*-->

## allowUnknownExts

<!--lang:es-->

*allowUnknownExts* indica que se sirven también los archivos con extensiones que no están en la tabla de "mime types"
(ver *mime types*). El valor por defecto es `false`.

<!--lang:en--]

*allowUnknownExts* is a boolean. True means that the files with extensions that are not in the mime types table
are also served (see *mime types*). The default is `false`.

[!--lang:es-->

# ejemplo de uso

<!--lang:en--]

# example

[!--lang:*-->


```js
var path = require('path')
var connect = require('connect')
var serveContent = require('serve-content')

var app = connect()

// Serve the files of the public folder
app.use(serveContent(path.join(__dirname, 'public'), {
    extensions: ['html', 'htm'],
    index: 'index.html',
    allowedExts: ['', 'html', 'htm', 'png', 'jpg', 'jpeg', 'gif']
}))

// Listen
app.listen(3000)
```

<!--lang:es-->

## extensiones por defecto

Para usar el parámetro [extensions](https://www.npmjs.com/package/serve-static#extensions) de *serve-static*
hay que incluir la cadena vacía ('') en la lista de extensiones (allowedExts).
Lo mismo para servir el [index](https://www.npmjs.com/package/serve-static#index) de una carpeta.

<!--lang:en--]

## default extensions

For use the *serve-static* [extensions](https://www.npmjs.com/package/serve-static#extensions) parameter
you must include the empty string ('') in the allowedExts list (as you see in the example).
The same for serving the [index](https://www.npmjs.com/package/serve-static#index) of a folder.

[!--lang:*-->

## mime types

<!--lang:es-->

*serve-content* no sirve los archivos con extensiones que no están en la tabla de "mime types",
aunque estén permitidas (por ejemplo con `allowAllExts` no se sirven `.bak`, `.swp` ni `.php~`).
Para servir una extensión que no está en la tabla hay que agregarla en `serveContent.mime.types`
(es el módulo [mime-types](https://www.npmjs.com/package/mime-types) que usa *serve-static*),
o usar `allowUnknownExts: true` y se sirve como `application/octet-stream`, igual que en *serve-static*.

<!--lang:en--]

*serve-content* does not serve the files with extensions that are not in the mime types table,
even if they are allowed (for example with `allowAllExts` the `.bak`, `.swp` and `.php~` files are not served).
If you need to serve a non standard extension you can add it in `serveContent.mime.types`
(it is the [mime-types](https://www.npmjs.com/package/mime-types) module used by *serve-static*),
or use `allowUnknownExts: true` and it is served as `application/octet-stream`, as *serve-static* does.

[!--lang:*-->

```js
var path = require('path')
var connect = require('connect')
var serveContent = require('serve-content')

var mime = serveContent.mime;

mime.types.specialimage = 'image/special';

var app = connect()

// Serve the files of the public folder
app.use(serveContent(path.join(__dirname, 'public'), {
    extensions: ['html', 'htm'],
    index: 'index.html',
    allowedExts: ['', 'html', 'htm', 'png', 'jpg', 'jpeg', 'gif', 'specialimage']
}))

// Listen
app.listen(3000)
```

<!--lang:es-->

## transformadores

Antes de pasarle el pedido a *serve-static*, *serve-content* busca si hay un archivo fuente para transformar
(con las funciones de [mini-tools](https://www.npmjs.com/package/mini-tools)):

<!--lang:en--]

## transformers

Before passing the request to *serve-static*, *serve-content* looks for a source file to transform
(with the [mini-tools](https://www.npmjs.com/package/mini-tools) functions):

[!--lang:es-->

URL                  | archivo fuente | se sirve
---------------------|----------------|---------------------------------
`/page` (sin extensión) | `page.jade` | el HTML renderizado con [pug](https://www.npmjs.com/package/pug)
`/style.css`         | `style.styl`   | el CSS compilado con [stylus](https://www.npmjs.com/package/stylus)

<!--lang:en--]

URL                  | source file    | served
---------------------|----------------|---------------------------------
`/page` (no extension) | `page.jade`  | the HTML rendered with [pug](https://www.npmjs.com/package/pug)
`/style.css`         | `style.styl`   | the CSS compiled with [stylus](https://www.npmjs.com/package/stylus)

[!--lang:es-->

La extensión de la URL tiene que estar permitida (`''` para jade, `css` para stylus).
Si el archivo fuente existe tiene prioridad sobre el archivo que serviría *serve-static*;
si no existe, el pedido sigue a *serve-static*.

Si el pedido tiene `req.flash` (por ejemplo con [connect-flash](https://www.npmjs.com/package/connect-flash))
la plantilla jade recibe su contenido en la variable `flash`.

<!--lang:en--]

The extension of the URL must be allowed (`''` for jade, `css` for stylus).
If the source file exists it has priority over the file that *serve-static* would serve;
if it does not exist, the request goes on to *serve-static*.

If the request has `req.flash` (for example with [connect-flash](https://www.npmjs.com/package/connect-flash))
the jade template receives its content in the `flash` variable.

[!--lang:*-->

```jade
p hello
each errorLine in (flash.error||[])
  pre=errorLine
```

<!--lang:es-->

## otras opciones

<!--lang:en--]

## other options

[!--lang:es-->

opción        | uso
--------------|------------------------------------------
`jade`        | objeto que se le pasa a pug al renderizar (opciones de pug y variables de la plantilla)
`styl`        | objeto que se le pasa a stylus al compilar
`serveStatic` | middleware que se usa en lugar de *serve-static* para lo que no resuelven los transformadores

<!--lang:en--]

option        | use
--------------|------------------------------------------
`jade`        | object passed to pug when rendering (pug options and template variables)
`styl`        | object passed to stylus when compiling
`serveStatic` | middleware used instead of *serve-static* for what the transformers do not serve

[!--lang:es-->

## propiedades del módulo

<!--lang:en--]

## module properties

[!--lang:es-->

propiedad                  | uso
---------------------------|------------------------------------------
`serveContent.mime`        | el módulo [mime-types](https://www.npmjs.com/package/mime-types) (ver *mime types*)
`serveContent.transformer` | tabla de transformadores por extensión de la URL: `{name, optionName, withFlash}`, donde `name` es el nombre de la función de *mini-tools* y `optionName` el nombre de la opción que recibe
`serveContent.logAll`      | si es `true` muestra en la consola los archivos que sirven los transformadores y desde dónde se creó el middleware (hay que asignarlo antes de llamar a `serveContent`)

<!--lang:en--]

property                   | use
---------------------------|------------------------------------------
`serveContent.mime`        | the [mime-types](https://www.npmjs.com/package/mime-types) module (see *mime types*)
`serveContent.transformer` | table of transformers by URL extension: `{name, optionName, withFlash}`, where `name` is the name of the *mini-tools* function and `optionName` the name of the option that it receives
`serveContent.logAll`      | when `true` logs in the console the files served by the transformers and where the middleware was created (it must be set before calling `serveContent`)

[!--lang:es-->

## diferencias con serve-static

*serve-static* sirve cualquier archivo que exista. *serve-content* agrega el filtro de extensiones, que:

* toma la extensión del path de la URL ya decodificado (`/a%2Ephp` tiene extensión `php`);
* no distingue mayúsculas de minúsculas (`/a.PHP` tiene extensión `php`);
* no sirve las extensiones que no están en la tabla de "mime types" (salvo con `allowUnknownExts`);
* usa la extensión de la URL, no la del archivo que finalmente se sirve
  (por eso el `index`, las `extensions` y los transformadores dependen de la extensión de la URL);
* rechaza los paths que salen de la carpeta raíz (también para los transformadores).

<!--lang:en--]

## differences with serve-static

*serve-static* serves any existing file. *serve-content* adds the extensions filter, that:

* takes the extension of the already decoded URL path (`/a%2Ephp` has the `php` extension);
* is case insensitive (`/a.PHP` has the `php` extension);
* does not serve the extensions that are not in the mime types table (except with `allowUnknownExts`);
* uses the extension of the URL, not the one of the file finally served
  (that is why `index`, `extensions` and the transformers depend on the extension of the URL);
* rejects the paths that go outside the root folder (also for the transformers).

[!--lang:es-->

Como *serve-static*, solo atiende `GET` y `HEAD`, y con la opción
[fallthrough](https://www.npmjs.com/package/serve-static#fallthrough) en `true` (el valor por defecto)
pasa al siguiente middleware (`next()`) lo que no atiende. Con `fallthrough: false` responde:

<!--lang:en--]

As *serve-static* does, it only serves `GET` and `HEAD`, and with the
[fallthrough](https://www.npmjs.com/package/serve-static#fallthrough) option in `true` (the default)
it passes to the next middleware (`next()`) what it does not serve. With `fallthrough: false` it responds:

[!--lang:es-->

caso                                 | respuesta
-------------------------------------|---------------------------
método que no es `GET` ni `HEAD`     | `405` con `Allow: GET, HEAD`
URL mal codificada                   | error `400` (con `next(err)`)
path fuera de la carpeta raíz        | error `403` (con `next(err)`)
extensión no permitida o desconocida | error `404` (con `next(err)`)

<!--lang:en--]

case                                 | response
-------------------------------------|---------------------------
method other than `GET` or `HEAD`    | `405` with `Allow: GET, HEAD`
malformed URL                        | error `400` (with `next(err)`)
path outside the root folder         | error `403` (with `next(err)`)
not allowed or unknown extension     | error `404` (with `next(err)`)

[!--lang:*-->

```js
app.use(serveContent(path.join(__dirname, 'public'), {
    allowedExts: ['', 'html', 'png'],
    fallthrough: false
}))
```

<!--lang:es-->

## Licencia

[MIT](LICENSE)

<!--lang:en--]

## License

[MIT](LICENSE)

[!--lang:*-->
