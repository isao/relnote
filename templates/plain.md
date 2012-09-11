Mojito Release {{range2version range}}
======================

[Mojito {{range2version range}}]({{compareView range}}) is now [tagged](/yahoo/mojito/tags) and available on [npm](https://npmjs.org/package/mojito).

Notes
-----
{{#notes}}* {{commitLink sha}} {{body}}
{{/notes}}

Please see [DEPRECATIONS.md](/yahoo/mojito/blob/DEPRECATIONS.md).

Features
--------
{{#features}}* {{commitLink sha}} {{body}}
{{/features}}

Fixes
-----
{{#bugs}}* {{commitLink sha}} {{unwrap body}}
{{/bugs}}

Acknowlegements
---------------
Special thanks to the following for their contributions to this release:
{{#thanks}}* {{unwrap body}}
{{/thanks}}

skipped please edit or delete
-----------------------------
{{#skipped}}* {{commitLink sha}} {{unwrap body}}
{{/skipped}}
