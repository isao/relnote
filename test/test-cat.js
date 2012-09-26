var Eem = require('events').EventEmitter,
    cat = require('../lib/categorize'),

    YUITest = require('yuitest'),
    A = YUITest.Assert,
    AA = YUITest.ArrayAssert,
    cases;


cases = {
    name: 'category matching',

    setUp: function() {
        this.eem = new Eem();
        cat.init(this.eem);
        this.eem.on('data', cat.match);
    },

    tearDown: function() {},

    forEachMsg: function(expected_type, msgs) {
        this.eem.on('categorized', function(type, obj){
            A.areSame(type, expected_type, "failed for msg: \n\"" + obj.body + '"');
        });
        msgs.forEach(function(msg) {
            cat.match({body:msg})
        });
        A.areSame(msgs.length, cat.results()[expected_type].length);
    },

    'test setup': function() {
        A.areSame('function', typeof this.eem.on);
        A.areSame('function', typeof cat.match);
    },

    '^fix msgs should be categorized "bug"': function() {
        var msgs = [
                'FIX bug #123',
                'fix bug #123',
                'fix bug #123',
                'fix bug 123',
                'fix bug 123',
                'fix bz #123',
                'fix bz 123',
                'fix issue #123',
                'fix issue 123',
                'fix bug #123 the quick brown fox',
                'fix bug #123 the quick brown fox',
                'fix bug 123 the quick brown fox',
                'fix bug 123 the quick brown fox',
                'fix bz #123 the quick brown fox',
                'fix bz 123 the quick brown fox',
                'FIX ISSUE #123 the quick brown fox',
                'fix issue 123 the quick brown fox',
                'fixed bug #123 the quick brown fox',
                'fixed issue #123 the quick brown fox',
                'fixes bug #123 the quick brown fox',
                'fixes bug #123 the quick brown fox',
                'fixes BUG #123 the quick brown fox',
                'fixes bz #123 the quick brown fox',
                'fixes issue #123 the quick brown fox',
                "\nfix bug #123",
                "\n\nfix issue 123",
                'fix: issue #123 the quick brown fox',
                'fixed: issue #123 the quick brown fox',
                'fixes: issue #123 the quick brown fox',
                "Lorem ipsum dolor\nfix bug #123 the quick brown fox",
                "Lorem ipsum dolor\nfix bug #123 the quick brown fox",
                "Lorem ipsum dolor\nfix bug #123 the quick brown fox",
                "Lorem ipsum dolor\nfix bug 123 the quick brown fox",
                "Lorem ipsum dolor\nfix bug 123 the quick brown fox",
                "Lorem ipsum dolor\nfix bz #123 the quick brown fox",
                "Lorem ipsum dolor\nfix bz 123 the quick brown fox",
                "Lorem ipsum dolor\nfix issue #123 the quick brown fox",
                "Lorem ipsum dolor\nfix issue 123 the quick brown fox",
                "Lorem ipsum dolor\nfix: bug #123 the quick brown fox",
                "Lorem ipsum dolor\nfix: bug #123 the quick brown fox",
                "Lorem ipsum dolor\nfix: bug #123 the quick brown fox",
                "Lorem ipsum dolor\nfix: bug 123 the quick brown fox",
                "Lorem ipsum dolor\nfix: bug 123 the quick brown fox",
                "Lorem ipsum dolor\nfix: bz #123 the quick brown fox",
                "Lorem ipsum dolor\nfix: bz 123 the quick brown fox",
                "Lorem ipsum dolor\nfix: issue #123 the quick brown fox",
                "Lorem ipsum dolor\nfix: issue 123 the quick brown fox",
                "Lorem ipsum dolor\nFIXED BUG #123 the quick brown fox",
                "Lorem ipsum dolor\nfixed issue #123 the quick brown fox",
                "Lorem ipsum dolor\nfixes bug #123 the quick brown fox",
                "Lorem ipsum dolor\nFIXES BUG #123 the quick brown fox",
                "Lorem ipsum dolor\nfixes bug #123 the quick brown fox",
                "Lorem ipsum dolor\nfixes bz #123 the quick brown fox",
                "Lorem ipsum dolor\nfixes issue #123 the quick brown fox",
                "Lorem ipsum dolor\nfixed issue #123 the quick brown fox",
                "Lorem ipsum dolor\nfixes: bug #123 the quick brown fox",
                "Lorem ipsum dolor\nFIXES: BUG #123 the quick brown fox",
                "Lorem ipsum dolor\nfixes: bug #123 the quick brown fox",
                "Lorem ipsum dolor\nfixes: bz #123 the quick brown fox",
                "Lorem ipsum dolor\nfixes: issue #123 the quick brown fox",
            ];
        this.forEachMsg('bugs', msgs);
    },

    '^fix msgs should be "skip"': function() {
        var msgs = [
                'FIX an issue with the quick brown fox',
                'fix an issue with the quick brown fox',
                'fix issue123 the quick brown fox',
                'fix stuff the quick brown fox',
                'fix, bug 123 the quick brown fox',
                'fixed up issue #123 the quick brown fox',
                'FIXED THE THING WITH ISSUE #123 THE QUICK BROWN FOX',
                'fixed the thing with issue #123',
                'fixes issue with the quick brown fox',
                "Lorem ipsum dolor\n   FIX bug 123 the quick brown fox",
                "Lorem ipsum dolor\n - fix BUG 123 the quick brown fox",
                "Lorem ipsum dolor\n * fix bz #123 the quick brown fox",
                "Lorem ipsum dolor\n fix bug #123 the quick brown fox",
            ];
        this.forEachMsg('skipped', msgs);
    },

    '[fix] msgs should be categorized "bug"': function() {
        var msgs = [
                '[fix #123] the quick brown fox',
                '[fix 123] the quick brown fox',
                '[fix bug #123] the quick brown fox',
                '[fix bug #123] the quick brown fox',
                '[FIX BZ #123] the quick brown fox',
                '[fix bz 123] the quick brown fox',
                '[fix issue #123] the quick brown fox',
                '[fix issue 123] the quick brown fox',
                '[FIX ISSUE 123] THE QUICK BROWN FOX',
                '[fixed #123] the quick brown fox',
                '[fixed 123] the quick brown fox',
                '[fixes #123] the quick brown fox',
                '[fixes 123] the quick brown fox',
                "Lorem ipsum dolor [fix 123] the quick brown fox",
                "Lorem ipsum dolor [fix bug #123] the quick brown fox",
                "Lorem ipsum dolor [fix bug #123] the quick brown fox",
                "Lorem ipsum dolor [fix bz #123] the quick brown fox",
                "Lorem ipsum dolor [Fix Bz 123] the quick brown fox",
                "Lorem ipsum dolor [fix issue #123] the quick brown fox",
                "Lorem ipsum dolor [fix issue 123] the quick brown fox",
                "Lorem ipsum dolor [fixed #123] the quick brown fox",
                "Lorem ipsum dolor [fixes #123] the quick brown fox",
                "Lorem ipsum dolor [fixes issue #123] the quick brown fox",
                "Lorem ipsum dolor\n[fix bug #123] the quick brown fox",
                "Lorem ipsum dolor\n[fix bug #123] the quick brown fox",
                "Lorem ipsum dolor\n[fix bz #123] the quick brown fox",
                "Lorem ipsum dolor\n[Fix Bz 123] the quick brown fox",
                "Lorem ipsum dolor\n[fix issue #123] the quick brown fox",
                "Lorem ipsum dolor\n[fix issue 123] the quick brown fox",
            ];
        this.forEachMsg('bugs', msgs);
    },

    '[bug]-like msgs should be "skip"': function() {
        var msgs = [
                '[fix: bug #123] the quick brown fox',
                '[fix: bz #123] the quick brown fox',
                '[fix: issue #123] the quick brown fox',
                '[bug #123] the quick brown fox',
                '[bug #123] the quick brown fox',
                '[bUG 123] the quick brown fox',
                '[bz #123] the quick brown fox',
                '[Bz #123] the quick brown fox',
                '[bZ 123] the quick brown fox',
                '[fix issue#123] the quick brown fox',
                '[fix issue123] the quick brown fox',
                '[issue #123] the quick brown fox',
                '[issue 123] the quick brown fox',
                '[issue-123] the quick brown fox',
                '[issue123] the quick brown fox',
                "Lorem ipsum dolor [bug #123] the quick brown fox",
                "Lorem ipsum dolor [bug 123] the quick brown fox",
                "Lorem ipsum dolor [bug#123] the quick brown fox",
                "Lorem ipsum dolor [bug123] the quick brown fox",
                "Lorem ipsum dolor [bz #123] the quick brown fox",
                "Lorem ipsum dolor\n[bz 123] the quick brown fox",
                "Lorem ipsum dolor\n[bz#123] the quick brown fox",
                "Lorem ipsum dolor\n[bz123] the quick brown fox",
                "Lorem ipsum dolor\n[issue #123] the quick brown fox",
                "Lorem ipsum dolor\n[issue 123] the quick brown fox",
            ];
        this.forEachMsg('skipped', msgs);
    },

    'notes should be categorized "note"': function() {
        var msgs = [
                'break compatability the quick brown fox',
                'breaks the quick brown fox',
                'deprecated: the quick brown fox',
                'deprecates the quick brown fox',
                'important- the quick brown fox',
                'important: the quick brown fox',
                'important! the quick brown fox',
                'note- careful about the quick brown fox',
                'note: careful about the quick brown fox',
                'note! careful about the quick brown fox',
                "Lorem ipsum dolor\nbreak compatability the quick brown fox",
                "Lorem ipsum dolor\nbreaks the quick brown fox",
                "Lorem ipsum dolor\ndeprecated: the quick brown fox",
                "Lorem ipsum dolor\ndeprecates the quick brown fox",
                "Lorem ipsum dolor\nimportant- the quick brown fox",
                "Lorem ipsum dolor\nimportant: the quick brown fox",
                "Lorem ipsum dolor\nimportant! the quick brown fox",
                "Lorem ipsum dolor\nnote- careful about the quick brown fox",
                "Lorem ipsum dolor\nnote: careful about the quick brown fox",
                "Lorem ipsum dolor\nnote! careful about the quick brown fox",
            ];
        this.forEachMsg('notes', msgs);
    },

    'note-like msgs should be "skip"': function() {
        var msgs = [
                ' break compatability the quick brown fox',
                ' breaks the quick brown fox',
                ' compatability breaks the quick brown fox',
                ' compatability maintained the quick brown fox',
                ' deprecated: the quick brown fox',
                ' deprecates the quick brown fox',
                ' important- the quick brown fox',
                ' important: the quick brown fox',
                ' important! the quick brown fox',
                ' note- careful about the quick brown fox',
                ' note: careful about the quick brown fox',
                ' note! careful about the quick brown fox',
                'important things the quick brown fox',
                'important to consider the quick brown fox',
                'note the quick brown fox',
                'notes about the quick brown fox',
                'notes how the quick brown fox',
                "Lorem ipsum dolor\n break compatability the quick brown fox",
                "Lorem ipsum dolor\n breaks the quick brown fox",
                "Lorem ipsum dolor\n deprecated: the quick brown fox",
                "Lorem ipsum dolor\n deprecates the quick brown fox",
                "Lorem ipsum dolor\n important- the quick brown fox",
                "Lorem ipsum dolor\n important: the quick brown fox",
                "Lorem ipsum dolor\n important! the quick brown fox",
                "Lorem ipsum dolor\n note- careful about the quick brown fox",
                "Lorem ipsum dolor\n note: careful about the quick brown fox",
                "Lorem ipsum dolor\n note! careful about the quick brown fox",
            ];
        this.forEachMsg('skipped', msgs);
    },

    'feature msgs should be categorized "feature"': function() {
        var msgs = [
                'new quick brown fox',
                'new- quick brown fox',
                'new: quick brown fox',
                'new! quick brown fox',
                'feature: quick brown fox',
                'feature- quick brown fox',
                'FEATure quick brown fox',
                "Lorem ipsum dolor\nnew quick brown fox",
                "Lorem ipsum dolor\nnew! quick brown fox",
                "Lorem ipsum dolor\nfeature: quick brown fox",
            ];
        this.forEachMsg('features', msgs);
    },

    'feature-ish msgs that are "skip"': function() {
        var msgs = [
                'this is new to the quick brown fox',
                'newly discovered quick brown fox',
                '-new quick brown fox',
                ' new! quick brown fox',
                ' feature: quick brown fox',
                ' feature- quick brown fox',
                ' feature quick brown fox',
                "Lorem ipsum dolor\n new quick brown fox",
                "Lorem ipsum dolor\n - new quick brown fox",
                "Lorem ipsum dolor\n feature: quick brown fox",
            ];
        this.forEachMsg('skipped', msgs);
    },

    'thank you‘s should be categorized "thank"': function() {
        var msgs = [
                'thanks @caridy',
                'thank‘s @fabianfrank',//good sentiment, bad grammar. ok?
                'thank you to kfay@',
                'thanks: @diegof and that quick brown fox',
                'thanks to: @diegof, @fabian, that quick brown fox',
                'Lorem ipsum dolor [thanks @caridy]',
                'Lorem ipsum dolor [thank you to kfay@]',
                'Lorem ipsum dolor [thanks: @diegof and that quick brown fox]',
                'Lorem ipsum dolor [thanks to: @diegof] the quick brown fox',
                'Lorem ipsum dolor [thanks @caridy]',
                "Lorem ipsum dolor\nthanks @caridy",
                "Lorem ipsum dolor\nthank‘s @fabianfrank",
                "Lorem ipsum dolor\nthank you to kfay@",
                "Lorem ipsum dolor\nthanks: @diegof and that quick brown fox",
                "Lorem ipsum dolor\nthanks to: @diegof, @fabian, that quick brown fox",
                "Lorem ipsum dolor\n[thanks @caridy]",
                "Lorem ipsum dolor\n[thank you to kfay@]",
                "Lorem ipsum dolor\n[thanks: @diegof and that quick brown fox]",
                "Lorem ipsum dolor\n[thanks to: @diegof] the quick brown fox",
                "Lorem ipsum dolor\n[thanks @caridy]",
            ];
        this.forEachMsg('thanks', msgs);
    },

    'thank-ish msgs that should be "skip"': function() {
        var msgs = [
                'thankz @fabianfrank',
                'big thanks: @diegof and that quick brown fox',
                'Lorem ipsum dolor [thanksgiving is kfay@]',
                "Lorem ipsum dolor\n- thanks @caridy",
                "Lorem ipsum dolor\n thank‘s @fabianfrank",
            ];
        this.forEachMsg('skipped', msgs);
    },

    'msg text can be on an alternate key': function() {
        this.eem.on('categorized', function(type, obj){
            A.areSame(type, 'bugs');
        });
        cat.match({foo:'fix bug #123 the quick brown fox'}, 'foo');
    }
};

YUITest.TestRunner.add(new YUITest.TestCase(cases));

