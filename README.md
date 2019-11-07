# zeedown

## Tiny Slack-style markdown renderer for Node and browser, with CLI.

[![Support with PayPal](https://img.shields.io/badge/paypal-donate-yellow.png)](https://paypal.me/zacanger) [![Patreon](https://img.shields.io/badge/patreon-donate-yellow.svg)](https://www.patreon.com/zacanger) [![ko-fi](https://img.shields.io/badge/donate-KoFi-yellow.svg)](https://ko-fi.com/U7U2110VB)

## Installation

`npm i -S zeedown` or `yarn add zeedown`

## Usage

`zeedown(text: string): string`

`zeedown` takes one parameters: a required string.

Difference from standard MD:

* Strong is a single set of asterisks
* Emphasis is a single set of underscores
* Strikethrough is a single set of tildes
* No headers

This is essentially the same as Slack's basic Markdown.

```javascript
import md from 'zeedown'
// or
const md = require('zeedown')

md('some string')
md(process.argv[2])
$('.foo').replaceWith(md($('.bar').text()))
```

## CLI

`zeedown` comes with a small CLI. Usage:

`cat foo.md | zeedown > foo.html`

## Supported Features

* Strong (Bold)
* Emphasis (Italic)
* Deletions (Strikethrough)
* Inline code
* Fenced code blocks (not indent)
* Blockquotes
* Ordered/unordered lists

## Why Not Feature X?

If you want links, images, syntax highlighting, and other fancy stuff,
you're probably better off using a full-featured implementation. Try `marked`,
it's super popular.

## Status

Everything specified works. `ol`, `ul`, and `blockquote` are a little funky
(only work if not indented at all, need an extra pass to strip extra tags).

[LICENSE](./LICENSE.md)
