# zeedown

## Tiny markdown renderer for Node and browser, with CLI.

[Demo](http://jsbin.com/lubugop/edit?html,js,output).

## Installation

`npm i -S zeedown` or `yarn add zeedown`

## Usage

`zeedown(text: string, short: ?bool)`

`zeedown` takes two parameters: a required string and an optional truthy value
to use `short` mode. In short mode:

* Strong is a single set of asterisks
* Emphasis is a single set of underscores
* Strikethrough is a single set of tildes
* No headers

This is essentially the same as Slack's basic Markdown.

```javascript
import md from 'zeedown'
// or
const md = require('zeedown')

md('some string', true)
md(process.argv[2])
$('.foo').replaceWith(md($('.bar').text()))
```

## CLI

`zeedown` comes with a small CLI. Usage:

`cat foo.md | zeedown > foo.html`

It takes an optional flag `-s` (or `--short`) to use `short` mode.

## Supported Features

* Strong (Bold)
* Emphasis (Italic)
* Deletions (Strikethrough)
* Inline code
* Fenced code blocks (not indent)
* Blockquotes
* Ordered/unordered lists
* Headers

## Why Not Feature X?

If you want links, images, syntax highlighting, and other fancy stuff,
you're probably better off using a full-featured implementation. Try `marked`,
it's super popular.

## Status

Everything specified works. `ol`, `ul`, and `blockquote` are a little funky
(only work if not indented at all, need an extra pass to strip extra tags).

## Performance

A [quick little benchmark](https://jsperf.com/tootdown) has inconsistent results
but it seems okay, and it's at lease a little better than it was when I started.

## License

[MIT](./LICENSE.md)
