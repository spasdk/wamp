/**
 * @license The MIT License (MIT)
 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
 */

'use strict';

var CjsWamp = require('cjs-wamp');


/**
 * WAMP implementation wrapper.
 *
 * @param {string} uri socket address to connect
 * @param {Object} [config={}] init parameters
 * @param {number} [config.timeout] time between connection retries
 *
 * @constructor
 */
function Wamp ( uri, config ) {
    var self = this;

    function getSocket () {
        var socket = new WebSocket(uri);

        socket.onopen = function () {
            if ( typeof self.onopen === 'function' ) {
                self.onopen();
            }

            // set activity flag
            self.open = true;
        };

        // reconnect
        socket.onclose = function () {
            if ( typeof self.onclose === 'function' && self.open ) {
                self.onclose();
            }

            // mark as closed
            self.open = false;

            if ( self.timeout ) {
                setTimeout(function () {
                    // recreate connection
                    self.socket = getSocket();
                    // reroute messages
                    self.socket.onmessage = function ( event ) {
                        self.router(event.data);
                    };
                }, self.timeout);
            }
        };

        return socket;
    }

    console.assert(typeof this === 'object', 'must be constructed via new');

    // sanitize
    config = config || {};

    // connection state
    this.open = false;

    // override prototype value
    if ( config.timeout ) {
        this.timeout = config.timeout;
    }

    // events
    this.onopen  = null;
    this.onclose = null;

    // parent constructor call
    CjsWamp.call(this, getSocket());
}


// inheritance
Wamp.prototype = Object.create(CjsWamp.prototype);
Wamp.prototype.constructor = Wamp;

// configuration
Wamp.prototype.timeout = 5000;


// public
module.exports = Wamp;
