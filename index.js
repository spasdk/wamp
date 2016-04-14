/**
 * @license The MIT License (MIT)
 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
 */

'use strict';

var CjsWamp = require('cjs-wamp'),
    timeout = 5000,
    events  = {
        open:  'connection:open',
        close: 'connection:close'
    };


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

        socket.onopen = function () {
            // there are some listeners
            if ( self.events[events.open] ) {
                self.emit(events.open);
            }

            // set activity flag
            self.open = true;
        };

        // reconnect
        socket.onclose = function () {
            // there are some listeners and it's the first time
            if ( self.events[events.close] && self.open ) {
                self.emit(events.close);
            }

            // mark as closed
            self.open = false;

            setTimeout(function () {
                // recreate connection
                self.socket = getSocket();
                // reroute messages
                self.socket.onmessage = function ( event ) {
                    self.router(event.data);
                };
            }, timeout);
        };

        return socket;
    }

    console.assert(typeof this === 'object', 'must be constructed via new');

    // connection state
    this.open = false;

    // parent constructor call
    CjsWamp.call(this, getSocket());
}


// inheritance
Wamp.prototype = Object.create(CjsWamp.prototype);
Wamp.prototype.constructor = Wamp;


// public
module.exports = Wamp;
