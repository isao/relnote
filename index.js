#!/usr/bin/env node
/**
 * Copyright (c) 2012 Yahoo! Inc. All rights reserved.
 * Copyrights licensed under the MIT License.
 * See the accompanying LICENSE file for terms.
 */

var event = new (require('events').EventEmitter)(),
    gitlog = require('./lib/gitlog'),
    categorize = require('./lib/categorize'),
    render = require('./lib/render'),
    range = process.argv[2] || '';

gitlog.init(event);       //emits- error, data, skip, end
categorize.init(event);   //emits- categorized
render.init(event, {      //emits- rendered-text, rendered-html
    template: __dirname + '/templates/mojito-wiki-rel.md',
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
