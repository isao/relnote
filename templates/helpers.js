var shortShaLen = 8,
    unwrapMax = 180;

function init() {
    // set some internal state here if needed
}

function unwrap(str) {
    var words = str.split(/\s+/gm),
        word,
        out = '';

    for(; words.length; out += ' ' + words.pop()) {
        if(out.length > unwrapMax) {
        	out += '…';
        	break;
        }
    }
    return out;
}

function shortSha(sha) {
    return sha.replace(/^([a-f0-9]{40}$/, sha.slice(0, shortShaLen));
}

module.exports = {
    init: init,
    shortSha: shortSha,
    unwrap: unwrap
};
