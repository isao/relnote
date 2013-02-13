/**
 * Copyright (c) 2012 Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the MIT License.
 * See the accompanying LICENSE file for terms.
 */

var test = require('tape'),
    Eem = require('events').EventEmitter,
    gitlog = require('../lib/gitlog'),

    fs = require('fs'),
    input = fs.readFileSync(__dirname + '/test-gitlog.txt', 'utf8'),
    //git log --format="» %H\t%an%n%s%n%b" 0.3.30..0.4.0
    
    logtxt,
    eem;


function setUp() {
    logtxt = input;
    eem = new Eem();
    gitlog.init(eem);
}

test('test data is not empty', function(t) {
    setUp();
    t.equal(typeof logtxt, 'string');
    t.equal(20624, logtxt.length);
    t.end();
});

test('test gitlog err', function(t) {
    var errmsg = 'test 1 2 3',
        expected = 'Error: ' + errmsg,
        testerr = new Error('test 1 2 3');

    setUp();
    t.plan(2);
    eem.on('error', function(err) {
        t.ok(err instanceof Error);
        t.equal(expected, err.toString());
    });

    gitlog.chunk(testerr);
});

test('test chunk end', function(t) {
    t.plan(1);
    setUp();
    eem.on('end', function(tally) {
        t.equal(201, tally);
    });
    gitlog.chunk(null, logtxt, null);
});

test('test skipped one', function(t) {
    t.plan(1);
    setUp();
    eem.on('skip', function(str) {
        t.equal('', str);
    });
    gitlog.chunk(null, logtxt, null);
});

test('test extract simple', function(t) {
    var data = [];

    setUp();
    t.plan((201 * 3) + 2);

    function ondata() {
        return function(obj) {
            t.ok('sha' in obj);
            t.ok('author' in obj);
            t.ok('body' in obj);
            data.push(obj);
        };
    }
    eem.on('data', ondata());

    eem.on('end', function(tally) {
        t.ok(data instanceof Array);
        t.equal(201, data.length);
    });

    gitlog.chunk(null, logtxt, null);
});
