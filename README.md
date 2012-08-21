README
======

A command line utility to format `git log` into something like a release announcement if commit log messages follow a particular convention.

Usage
-----

    % relnote range
    
...where `range` are a `git log` range like `0.4.0..0.4.1`. The output is not particularly useful unless the commit log messages in the given range follow a convention.

Commit log conventions
----------------------

See also ./test/test-cat.js

Log messages are categorized as one or more of the following, or "skipped", with some examples below:

* bugs (starts a line, or inline with brackets)
  * fix issue #123 the quick brown fox
  * fix bug 123 the quick brown fox
  * fix bz 123 the quick brown fox
  * the quick brown [fix issue #123] fox jumped
* features (starts a line)
  * feature: the quick brown fox
  * new: the quick brown fox
* notes (starts a line)
  * note! the quick brown fox
  * important: the quick brown fox
  * breaks: the quick brown fox
  * deprecates: the quick brown fox
* thanks (starts a line)
  * thanks quick brown fox
  * thank you quick brown fox

Note that "starts a line" includes text preceded by a newline.

Customization
-------------
Edit ./templates/plain.md to change the template. Add [handlebars](See http://handlebarsjs.com/) helpers in ./templates/helpers.js and reference them in the template.

And index.js should be hacked to parameterize these and other things.


Note
----
[GitHub Flavored Markdown](GitHub Flavored Markdown) will autolink lots of stuff. GFM patterns are compatible with the ones above, and should be used where possible for commit messages viewed on github.com.

Short sha hashes aren't recognized by the GFM lib, apparently. I've commented out html rendering (uncommenting/adding a listener will re-enable it). Figure we'll just pipe to $EDITOR and paste onto the gh wiki.

See also `man git-notes` as a way to add notes seperate from the a commit.
