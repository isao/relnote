/**
 * Copyright (c) 2012 Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the MIT License.
 * See the accompanying LICENSE file for terms.
 */

var Eem = require('events').EventEmitter,
    gitlog = require('../lib/gitlog'),

    fs = require('fs'),
    input = fs.readFileSync(__dirname + '/test-gitlog.txt', 'utf8'),
    //git log --format="» %H\t%an%n%s%n%b" 0.3.30..0.4.0

    YUITest = require('yuitest'),
    A = YUITest.Assert,
    AA = YUITest.ArrayAssert,
    cases;

cases = {
    name: 'basic gitlog parse',

    setUp: function() {
        this.logtxt = input;
        this.eem = new Eem();
        gitlog.init(this.eem);
    },

    tearDown: function() {
        this.logtxt = this.notify = null;
    },

    'test data is not empty': function() {
        A.isString(this.logtxt);
        A.areEqual(20624, this.logtxt.length);
    },

    'test gitlog err': function() {
        var errmsg = 'test 1 2 3',
            expected = 'Error: ' + errmsg,
            testerr = new Error('test 1 2 3');

        this.eem.on('error', function(err) {
            A.isObject(err);
            A.areSame(expected, err.toString());
        });

        gitlog.chunk(testerr);
    },

    'test chunk end': function() {
        this.eem.on('end', function(tally) {
            A.areSame(201, tally);
        });
        gitlog.chunk(null, this.logtxt, null);
    },

    'test skipped one': function() {
        this.eem.on('skip', function(str) {
            A.areSame('', str);
        });
        gitlog.chunk(null, this.logtxt, null);
    },

    'test extract simple': function() {
        var data = [];

        function ondata() {
            return function(obj) {
                A.isTrue('sha' in obj);
                A.isTrue('author' in obj);
                A.isTrue('body' in obj);
                data.push(obj);
            };
        }
        this.eem.on('data', ondata());

        this.eem.on('end', function(tally) {
            A.isArray(data);
            A.areSame(201, data.length);
        });

        gitlog.chunk(null, this.logtxt, null);
    }
};

YUITest.TestRunner.add(new YUITest.TestCase(cases));
