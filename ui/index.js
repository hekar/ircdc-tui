'use strict';

const _ = require('lodash');
const blessed = require('blessed');

function createScreen(params) {
  _.defaults(params || {}, {
    title: 'title'
  });

  const screen = blessed.screen({
    smartCSR: true
  });

  screen.title = params.title;

  screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
  });

  return screen;
}

function createBox(screen) {
  const box = blessed.box({
    top: 'center',
    left: 'center',
    width: '50%',
    height: '50%',
    content: 'Hello {bold}world{/bold}!',
    tags: true,
    border: {
      type: 'line'
    },
    style: {
      fg: 'white',
      bg: 'magenta',
      border: {
        fg: '#f0f0f0'
      },
      hover: {
        bg: 'green'
      }
    }
  });

  screen.append(box);

  const icon = blessed.image({
    parent: box,
    top: 0,
    left: 0,
    type: 'overlay',
    width: 'shrink',
    height: 'shrink',
    file: __dirname + '/my-program-icon.png',
    search: false
  });

  box.on('click', function(data) {
    box.setContent('{center}Some different {red-fg}content{/red-fg}.{/center}');
    screen.render();
  });

  box.key('enter', function(ch, key) {
    box.setContent('{right}Even different {black-fg}content{/black-fg}.{/right}\n');
    box.setLine(1, 'bar');
    box.insertLine(1, 'foo');
    screen.render();
  });
}

function startUi() {
  const screen = createScreen();
  const box = createBox();

  box.focus();

  screen.render();
  return new Promise((fulfill, reject) => {

  });
}

module.exports = {
  startUi
};
