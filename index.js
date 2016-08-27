'use strict';

const _ = require('lodash');
const co = require('co');
const url = require('url');
const yargs = require('yargs');
const api = require('./api');
const socket = require('./socket');
const ui = require('./ui');

function* main(argv) {
    const args = yargs
        .describe('u', 'URL pointing to the IRCDC server')
        .default('u', 'http://localhost:9071/socket')
        .alias('u', 'url')
        .parse(argv);

    yield socket.setup(args.url);

    const parsed = url.parse(args.url);
    const host = `${parsed.protocol}//${parsed.host}`;
    const res = _.first(yield api.say(host, 'Hello World'));
    if (res) {
      console.log(res.text);
    }

    //ui.startUi();
}

co.wrap(main)(process.argv)
    .catch((err) => {
        console.error(err);
        console.error(err.stack);
    });
