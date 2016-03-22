/**
 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var CjsWamp = require('cjs-wamp'),
    timeout = 5000;


/**
 * WAMP implementation wrapper.
 *
 * @param {string} uri socket address to connect
 *
 * @constructor
 */
function Wamp ( uri ) {
    var self = this;

    function getSocket () {
        var socket = new WebSocket(uri);

        // reconnect
        socket.onclose = function () {
            setTimeout(function () {
                // recreate connection
                self.socket = getSocket();
                // reroute messages
                socket.onmessage = function ( event ) {
                    self.router(event.data);
                };
            }, timeout);
        };
        
        return socket;
    }
    
    console.assert(typeof this === 'object', 'must be constructed via new');

    // parent constructor call
    CjsWamp.call(this, getSocket());
}


// inheritance
Wamp.prototype = Object.create(CjsWamp.prototype);
Wamp.prototype.constructor = Wamp;


// public
module.exports = Wamp;
