README
======

A command line script to format `git log` into something like a release announcement if commit log messages follow a particular convention.

Usage
-----

    % relnote range
    
...where `range` is a `git log` range like `0.4.0..0.4.1`. Note the output is not particularly useful unless the commit log messages in the given range follow a convention.

### install

-- this is broken on git.corp, pls clone --

    % npm i https://git.corp.yahoo.com/isao/relnote.git


Commit log conventions
----------------------

Log messages are categorized as one or more of the following, or "skipped", with some examples below:

### bugfix
patterns: anywhere in the message like [fix issue #123] or starting any line like "fix issue #123"

examples:

  * fix issue #123 the quick brown fox
  * fix bug 123 the quick brown fox
  * fix bz 123 the quick brown fox
  * fix #123 the quick brown fox
  * the quick brown [fix issue #123] fox jumped

### features

patterns: starting any line like "feature:" or "new:"

examples:

  * feature: the quick brown fox
  * feature - the quick brown fox
  * new: the quick brown fox

### notes

patterns: starting any line like "note!", "important:", or "breaks:" etc

  * note! the quick brown fox
  * important: the quick brown fox
  * breaks: the quick brown fox
  * deprecates: the quick brown fox


### thank yous

patterns: starting any line like "thanks"

examples:

  * thanks to the quick brown fox
  * thank you @quick @brown @fox

The rationale is to be compatible with [GitHub Flavored Markdown](GitHub Flavored Markdown) autolinking, and encourage a style that is scanable and readable like hand-edited release notes.

The phrase "starting any line" means for a commit log message like this:

        Merge my big branch
        
        new feature: fox even quicker, jumpier, browner
        fixed issue #123 brown fox was slow
        note: breaks compatibility with blue foxes
        thanks @meganfox

...where "new", "fixed", "note", and "thanks" are preceeded by newlines, the example commit will be referenced in each category.

See also the [source](/isao/relnote/blob/master/lib/categorize.js), and the [tests](/isao/relnote/blob/master/test/test-cat.js).

Customization
-------------
Edit ./templates/plain.md to change the template or reference your own. Add [handlebars](See http://handlebarsjs.com/) helpers in ./templates/helpers.js or somewhere else, and reference them in the template.

Todo: index.js should be hacked to parameterize these and other things as cli options in user space.


Note
----
[GitHub Flavored Markdown](GitHub Flavored Markdown) will autolink lots of stuff. GFM patterns are compatible with the ones above, and should be used where possible for wiki pages and commit messages viewed on github.com.

Using the full sha hashes because the GFM lib expects them.

Regardless, I've commented out html rendering (uncommenting/adding a listener will re-enable it). Figure we'll just pipe to $EDITOR and paste onto the gh wiki.

See also `man git-notes` as a way to add notes seperate from the a commit.
