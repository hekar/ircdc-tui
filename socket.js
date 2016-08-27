'use strict';

const bluebird = require('bluebird');
const sockjs = require('sockjs-client');

function* setup(url) {
    const sock = bluebird.promisifyAll(new sockjs(url));

    sock.open = function() {
      console.log('opened');
    }

    sock.onmessage = function(e) {
        console.log('message', e.data);
    };

    sock.onclose = function() {
        console.log('closed');
    };

    return sock;
}

module.exports = {
    setup
};
