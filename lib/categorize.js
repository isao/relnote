/*jslint bitwise: true, unparam: true, sloppy: true, white: true, node: true */

var categorized, //accumulator
    notify, //eventemitter, see emit()
    typemap = {
        bugs: [
            /^fix(?:es|ed|) +(?:issue|bug|bz) +#?\d+/im,
            /\[fix(?:es|ed|) +(?:|bug|bz|issue) +#?\d+\]/i,
            /\[fix(?:es|ed|) +#?\d+\]/i,
        ],
        features: [/^(?:new|feature)\b/im],
        notes: [
            /^(?:note|important)[:!-]/im,
            /^(?:breaks?|deprecate[sd]?)/im,
        ],
        thanks: [
            /^thanks?\b/im,
            /\[thanks?\b.+\]?/i,
        ],
        skipped: []
    };

function init(eventemitter) {
    notify = eventemitter;
    categorized = {};
    Object.keys(typemap).forEach(function(type) {
        categorized[type] = [];
    });
}

function match(obj, textkey) {
    var type, rgxi, matched = false,
        text = obj[textkey || 'body'];

    for(type in typemap) {
        for(rgxi in typemap[type]) {
            if(typemap[type][rgxi].test(text)) {
                emit(type, obj);
                matched = true;
            }
        }
    }

    if(!matched) {
        emit('skipped', obj);
    }
}

function emit(type, obj) {
    categorized[type].push(obj);
    notify.emit('categorized', type, obj);
}

function results() {
    return categorized;
}

module.exports = {
    init: init,
    match: match,
    results: results
};
