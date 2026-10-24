# serve-content


Serve static files based on file name extensions


[![npm-version](https://img.shields.io/npm/v/serve-content.svg)](https://npmjs.org/package/serve-content)
[![downloads](https://img.shields.io/npm/dm/serve-content.svg)](https://npmjs.org/package/serve-content)
[![linux](https://github.com/emilioplatzer/serve-content/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/emilioplatzer/serve-content/actions/workflows/build-and-test.yml)
[![windows](https://ci.appveyor.com/api/projects/status/github/emilioplatzer/serve-content?svg=true)](https://ci.appveyor.com/project/emilioplatzer/serve-content)
[![coverage](https://img.shields.io/coveralls/emilioplatzer/serve-content/master.svg)](https://coveralls.io/r/emilioplatzer/serve-content)
[![sonar](https://sonarcloud.io/api/project_badges/measure?project=emilioplatzer_serve-content&metric=alert_status)](https://sonarcloud.io/summary/overall?id=emilioplatzer_serve-content)
[![qa-control](https://github.com/emilioplatzer/serve-content/actions/workflows/qa-control.yml/badge.svg)](https://github.com/emilioplatzer/serve-content/actions/workflows/qa-control.yml)


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


*excludeExts* is a black list with ignorings extensions.


## allowUnknownExts


*allowUnknownExts* is a boolean. True means that the files with extensions that are not in the mime types table
are also served (see *mime types*). The default is `false`.


# example



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


## default extensions

For use the *serve-static* [extensions](https://www.npmjs.com/package/serve-static#extensions) parameter
you must include the empty string ('') in the allowedExts list (as you see in the example).
The same for serving the [index](https://www.npmjs.com/package/serve-static#index) of a folder.


## mime types


*serve-content* does not serve the files with extensions that are not in the mime types table,
even if they are allowed (for example with `allowAllExts` the `.bak`, `.swp` and `.php~` files are not served).
If you need to serve a non standard extension you can add it in `serveContent.mime.types`
(it is the [mime-types](https://www.npmjs.com/package/mime-types) module used by *serve-static*),
or use `allowUnknownExts: true` and it is served as `application/octet-stream`, as *serve-static* does.


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


## transformers

Before passing the request to *serve-static*, *serve-content* looks for a source file to transform
(with the [mini-tools](https://www.npmjs.com/package/mini-tools) functions):


URL                  | source file    | served
---------------------|----------------|---------------------------------
`/page` (no extension) | `page.jade`  | the HTML rendered with [pug](https://www.npmjs.com/package/pug)
`/style.css`         | `style.styl`   | the CSS compiled with [stylus](https://www.npmjs.com/package/stylus)


The extension of the URL must be allowed (`''` for jade, `css` for stylus).
If the source file exists it has priority over the file that *serve-static* would serve;
if it does not exist, the request goes on to *serve-static*.

If the request has `req.flash` (for example with [connect-flash](https://www.npmjs.com/package/connect-flash))
the jade template receives its content in the `flash` variable.


```jade
p hello
each errorLine in (flash.error||[])
  pre=errorLine
```


## other options


option        | use
--------------|------------------------------------------
`jade`        | object passed to pug when rendering (pug options and template variables)
`styl`        | object passed to stylus when compiling
`serveStatic` | middleware used instead of *serve-static* for what the transformers do not serve


## module properties


property                   | use
---------------------------|------------------------------------------
`serveContent.mime`        | the [mime-types](https://www.npmjs.com/package/mime-types) module (see *mime types*)
`serveContent.transformer` | table of transformers by URL extension: `{name, optionName, withFlash}`, where `name` is the name of the *mini-tools* function and `optionName` the name of the option that it receives
`serveContent.logAll`      | when `true` logs in the console the files served by the transformers and where the middleware was created (it must be set before calling `serveContent`)


## differences with serve-static

*serve-static* serves any existing file. *serve-content* adds the extensions filter, that:

* takes the extension of the already decoded URL path (`/a%2Ephp` has the `php` extension);
* is case insensitive (`/a.PHP` has the `php` extension);
* does not serve the extensions that are not in the mime types table (except with `allowUnknownExts`);
* uses the extension of the URL, not the one of the file finally served
  (that is why `index`, `extensions` and the transformers depend on the extension of the URL);
* rejects the paths that go outside the root folder (also for the transformers).


As *serve-static* does, it only serves `GET` and `HEAD`, and with the
[fallthrough](https://www.npmjs.com/package/serve-static#fallthrough) option in `true` (the default)
it passes to the next middleware (`next()`) what it does not serve. With `fallthrough: false` it responds:


case                                 | response
-------------------------------------|---------------------------
method other than `GET` or `HEAD`    | `405` with `Allow: GET, HEAD`
malformed URL                        | error `400` (with `next(err)`)
path outside the root folder         | error `403` (with `next(err)`)
not allowed or unknown extension     | error `404` (with `next(err)`)


```js
app.use(serveContent(path.join(__dirname, 'public'), {
    allowedExts: ['', 'html', 'png'],
    fallthrough: false
}))
```


## License

[MIT](LICENSE)

