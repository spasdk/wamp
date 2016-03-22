WAMP Implementation wrapper
===========================

[![Build Status](https://img.shields.io/travis/spasdk/wamp.svg?style=flat-square)](https://travis-ci.org/spasdk/wamp)
[![NPM version](https://img.shields.io/npm/v/spa-wamp.svg?style=flat-square)](https://www.npmjs.com/package/spa-wamp)
[![Dependencies Status](https://img.shields.io/david/spasdk/wamp.svg?style=flat-square)](https://david-dm.org/spasdk/wamp)
[![Gitter](https://img.shields.io/badge/gitter-join%20chat-blue.svg?style=flat-square)](https://gitter.im/DarkPark/spasdk)


## Installation ##

```bash
npm install spa-wamp
```


## Usage ##

Add the constructor to the scope:

```js
var Wamp = require('spa-wamp');
```

Create an instance from some existing WebSocket connection:

```js
var wamp = new Wamp('ws://echo.websocket.org');
```


## Contribution ##

If you have any problem or suggestion please open an issue [here](https://github.com/spasdk/wamp/issues).
Pull requests are welcomed with respect to the [JavaScript Code Style](https://github.com/DarkPark/jscs).


## License ##

`spa-wamp` is released under the [GPL-3.0 License](http://opensource.org/licenses/GPL-3.0).
