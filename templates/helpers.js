var shortShaLen = 8,
    unwrapMax = 120;

function shortSha(sha) {
    return sha.trim().replace(/^[a-f0-9]{40}$/, sha.slice(0, shortShaLen));
}

module.exports = {

    init: function() {
        // set some internal state here if needed
    },

    range2version: function(str) {
        return str.split('..')[1];
    },

    compareView: function(str) {
        var range = str.split('..');
        return '/yahoo/mojito/compare/' + range[0] + '...' + range[1];
    },

    unwrap: function(str) {
        var words = str.split(/\s+/gm), out = '';

        for(; words.length; out += ' ' + words.shift()) {
            if(out.length > unwrapMax) {
                out += '…';
                break;
            }
        }
        return out;
    },

    shortSha: shortSha,

    commitLink: function(sha) {
        var commit = shortSha(sha),
            href = '/yahoo/mojito/commit/';

        return ['[', commit, '](', href, commit, ')'].join('');
    }
};
