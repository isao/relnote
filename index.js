#!/usr/bin/env node

var event = new (require('events').EventEmitter)(),
    gitlog = require('./lib/gitlog'),
    categorize = require('./lib/categorize'),
    render = require('./lib/render'),
    range = process.argv[2] || '';

gitlog.init(event);       //emits- error, data, skip, end
categorize.init(event);   //emits- categorized
render.init(event, {      //emits- rendered-text, rendered-html
    template: __dirname + '/templates/plain.md',
    helpers: __dirname + '/templates/helpers.js'
});

event.on('error', console.error);
event.on('data', categorize.match);
event.on('categorized', render.setEnum);
event.on('end', render.exec);
event.on('rendered-text', console.log);
//event.on('rendered-html', console.log);

render.setKey('range', range);
gitlog.exec(range);
