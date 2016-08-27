'use strict';

const superagent = require('superagent');

function defaultPromise(fulfill, reject) {
    return function() {
        const args = Array.prototype.slice.call(arguments);

        const err = args[0];
        const tail = args.splice(1);

        if (err) {
            reject(err);
        } else {
            fulfill(tail);
        }
    };
}

function* say(host, message) {
    return new Promise((fulfill, reject) => {
        const data = {
            from: 'Manny',
            to: 'cat',
            message
        };

        superagent
            .post(`${host}/api/say`)
            .send(data)
            .set('Accept', 'application/json')
            .end(defaultPromise(fulfill, reject));
    });
}

module.exports = {
  say
};
