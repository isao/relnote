/**
 * Copyright (c) 2012 Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the MIT License.
 * See the accompanying LICENSE file for terms.
 */
/*jslint bitwise: true, unparam: true, sloppy: true, white: true, node: true */

/* TODO use field:code map to generate fmt, split, & parse params generally */

var GITLOG_FORMAT = "» %H\t%an%n%s%n%b",
    GITLOG_SPLIT = /^» (?=[a-z0-9]{40}\t)/gm,
    GITLOG_PARSE = /^([0-9a-f]{40})\t([\w ]+)\n([\S\s]+)/i,
    exec = require('child_process').exec,
    notify,
    tally;

function init(eventemitter) {
    notify = eventemitter;
    tally = 0;
}

function gitlog(args) {
    exec('git log --format="' + GITLOG_FORMAT + '" ' + args, chunk);
}

function chunk(err, stdout, stderr) {
    if(err) {
        return notify.listeners('error') ?
            notify.emit('error', err) : process.exit(err.code);
    }

    stdout.split(GITLOG_SPLIT).forEach(extract);
    notify.emit('end', tally);
}

function extract(str) {
    var m = str.trim().match(GITLOG_PARSE) || [null];

    function isTruthy(i) {
        return Boolean(i);
    }

    if(m.every(isTruthy)) {
        notify.emit('data', {sha: m[1], author: m[2], body: m[3]});
        tally++;
    } else {
        notify.emit('skip', str);
    }
}

module.exports = {
    init: init,
    exec: gitlog,
    chunk: chunk
};
