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

## Why Not Feature X?

If you want links, images, syntax highlighting, and other fancy stuff,
you're probably better off using a full-featured implementation. Try `marked`,
it's super popular.

## Status

Everything specified works. `ol`, `ul`, and `blockquote` are a little funky
(only work if not indented at all, need an extra pass to strip extra tags).

## Performance

A [quick little benchmark](https://jsperf.com/tootdown) has inconsistent results
but it seems okay. This was originally implemented as a class with a render
method, but the benchmark usually shows the function performing significantly
better. Which makes me happy, because I'm not overly fond of ES classes.

## Notes on using with Mastodon

This was originally written as an experiment for Mastodon.

To test in Mastodon, modify `components/components/status_content`:

```diff
-    const content = { __html: emojify(status.get('content')) };
+    const content = { __html: emojify(md(status.get('content'), true)) };
```

(Where `md` is `import md from 'zeedown'`.)

You'll also need to override CSS to get `em` and `strong` to actually work.

There's a full working diff
[here](https://github.com/tootsuite/mastodon/compare/master...zacanger:feature/md).

To test on Mastodon without changing any code (this needs work still):

```javascript
const runMd = () => {
 [].forEach.call($('.status__content'), (el) => {
   $(el).replaceWith(zeedown(el.text()))
 })
}

// this could use mutationobserver or something?
$(document).bind('DOMSubtreeModified', runMd)
```

This test function isn't working quite right. It's using jQuery just because
Mastodon already has jQuery loaded, but should be totally doable without as
well. It also updates all statuses every time there's a change, which is a mess.

Why this instead of just using marked/commonmark/showdown/whatever? Two reasons:

* It seems like a bad idea to allow some of the features that a full Markdown
  implementation allows. Links, images, etc., especially could be problematic,
  and Mastodon already has its own ways of handling those.

* It seems like a _good_ idea to have a shortened syntax in some cases, to
  save on character count.

I'm excited about making this work as a browser extension, but it's only until
[this issue](https://github.com/tootsuite/mastodon/issues/853) has a response.

Also worth noting, I think integrating this into Mastodon _could_ be as simple
as modifying
[this line](https://github.com/tootsuite/mastodon/blob/master/app/assets/javascripts/components/components/status_content.jsx#L94),
possibly conditionally based on some bit of metadata (assuming Markdown is
optional).

Changes were made recently around collapsing whitespace in statuses. I'm not
sure how this would affect that, or what the goal is there.

## License

[WTFPL](./LICENSE.md)
