/**
 * Copyright (c) 2012 Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the MIT License.
 * See the accompanying LICENSE file for terms.
 */

var shortShaLen = 8,
    unwrapMax = 120;

function shortSha(sha) {
    return sha.trim().replace(/^[a-f0-9]{40}$/, sha.slice(0, shortShaLen));
}

function range2version(str) {
    return str.split('..')[1];
}

function compareView(str) {
    var range = str.split('..');
    return '/yahoo/mojito/compare/' + range[0] + '...' + range[1];
}

function unwrap(str) {
    var words = str.split(/\s+/gm),
        out = '';

    for(; words.length; out += ' ' + words.shift()) {
        if(out.length > unwrapMax) {
            out += '…';
            break;
        }
    }
    return out;
}

function commitLink(sha) {
    var commit = shortSha(sha),
        href = '/yahoo/mojito/commit/';

    return ['[', commit, '](', href, commit, ')'].join('');
}

module.exports = {
    range2version: range2version,
    compareView: compareView,
    unwrap: unwrap,
    shortSha: shortSha,
    commitLink: commitLink
};
