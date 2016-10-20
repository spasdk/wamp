WAMP Implementation wrapper
===========================

[![build status](https://img.shields.io/travis/spasdk/wamp.svg?style=flat-square)](https://travis-ci.org/spasdk/wamp)
[![npm version](https://img.shields.io/npm/v/spa-wamp.svg?style=flat-square)](https://www.npmjs.com/package/spa-wamp)
[![dependencies status](https://img.shields.io/david/spasdk/wamp.svg?style=flat-square)](https://david-dm.org/spasdk/wamp)
[![devDependencies status](https://img.shields.io/david/dev/spasdk/wamp.svg?style=flat-square)](https://david-dm.org/spasdk/wamp?type=dev)
[![Gitter](https://img.shields.io/badge/gitter-join%20chat-blue.svg?style=flat-square)](https://gitter.im/DarkPark/spasdk)

Thin wrapper around [cjs-wamp](https://github.com/cjssdk/wamp) module.


## Installation ##

```bash
npm install spa-wamp
```


## Usage ##

Add the constructor to the scope:

```js
var Wamp = require('spa-wamp');
```

Create a WAMP connection:

```js
var wamp = new Wamp('ws://echo.websocket.org');
```

Wait for an open state to exec remote method and serve remote request:

```js
wamp.addListener(wamp.EVENT_OPEN, function () {
    wamp.call('getInfo', {id: 128}, function ( error, result ) {
        // handle execution result
    });
    
    wamp.addListener('getData', function ( params, callback ) {
        // handle request ...
        // send back results to the sender
        callback(null, requestedData);
    });
});
````

Catch a connection loss and automatically reconnect:

```js
wamp.addListener(wamp.EVENT_CLOSE, function () {
    console.log('reconnecting in 5 seconds ...');
});
````

Create a WAMP instance with increased reconnection time:

```js
var wamp = new Wamp('ws://echo.websocket.org', {timeout: 30000});
```

Timeout can be changed for all instances at once:

```js
Wamp.prototype.timeout = 30000;
```

To disable automatic reconnection set `timeout` to 0;

It's possible to work directly with original WebSocket connection (but messaging should be avoided):

```js
// ok
wamp.socket.close();
// not recommended
wamp.socket.send('some message');
```

## Contribution ##

If you have any problem or suggestion please open an issue [here](https://github.com/spasdk/wamp/issues).
Pull requests are welcomed with respect to the [JavaScript Code Style](https://github.com/DarkPark/jscs).


## License ##

`spa-wamp` is released under the [MIT License](license.md).
