/*jslint bitwise: true, undef: true, unparam: true, sloppy: true, white: true, node: true */

var fs = require('fs'),
    hb = require('handlebars'),
    ghm = require('github-flavored-markdown'),
    notify,
    hbjs,
    data;

function init(eventemitter, opts) {
    notify = eventemitter;
    data = opts.data || {};

    if(opts.template) {
        setTemplate(opts.template);
    }

    if(opts.helpers) {
        [].concat(opts.helpers).forEach(registerHelpers);
    }
}

function registerHelpers(module_path) {
    var module = require(module_path);

    Object.keys(module).forEach(function(name) {
        if('init' !== name) {
            hb.registerHelper(name, module[name]);
        }
    });
}

function setTemplate(filepath) {
    hbjs = hb.compile(fs.readFileSync(filepath, 'utf-8'));
}

function setKey(key, val) {
    if(key in data) {
        console.warn('replacing %s with %s in %s', data[key], val, key);
    }
    data[key] = val;
}

function setEnum(key, val) {
    if(key in data) {
        if(!Array.isArray(data[key])) {
            console.warn('replacing scalar %s with an enum/array', key);
            data[key] = [];
        }
    } else {
        data[key] = [];
    }

    data[key] = data[key].concat(val);//adds scalar or array
}

function exec() {
    var md = hbjs(data);

    if(notify.listeners('rendered-text')) {
        notify.emit('rendered-text', md);
    }
    if(notify.listeners('rendered-html')) {
        notify.emit('rendered-html', ghm.parse(md, 'yahoo/mojito'));
    }
    return md;
}

module.exports = {
    init: init,
    registerHelpers: registerHelpers,
    setTemplate: setTemplate,
    setKey: setKey,
    setEnum: setEnum,
    exec: exec
};
