var shortShaLen = 8,
    unwrapMax = 120;

module.exports = {

    init: function() {
        // set some internal state here if needed
    },

    range2version: function(str) {
        return str.split('..')[1];
    },

    unwrap: function(str) {
        var words = str.split(/\s+/gm),
            word,
            out = '';

        for(; words.length; out += ' ' + words.shift()) {
            if(out.length > unwrapMax) {
                out += '…';
                break;
            }
        }
        return out;
    },

    shortSha: function(sha) {
        return sha.replace(/^([a-f0-9]{40}$/, sha.slice(0, shortShaLen));
    }
};
