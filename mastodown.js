/*
 * Possible better names than Mastodown:
 * Marktoot, Tootdown (suggested by @zaccolley@mastodon.social)
 * Forked from https://gist.github.com/renehamburger/12f14a9bd9297394e5bd#gistcomment-1976476
 * Original Author (PHP Version): Johnny Broadway <johnny@johnnybroadway.com>
 * Website: https://gist.github.com/jbroadway/2836900
 * License: MIT
 *
 * Supports:
 *   Strong (Bold)
 *   Emphasis (Italic)
 *   Deletions (Strikethrough)
 *   Inline code
 *   Blockquotes
 *   Ordered/unordered lists
 *
 * Differences from commonmark:
 *   Strong is a single set of asterisks
 *   Emphasis is a single set of underscores
 *   Strikethrough is a single set of tildes
 * These decisions were made to reduce the toll to character count.
 *
 * // to test (this needs work still!):
 * const md = new Mastodown()
 * const runMd = () => {
 *   [].forEach.call($('.status__content'), (el) => {
 *     $(el).replaceWith(md.render(el.text()))
 *   })
 * }
 * // this could use mutationobserver or something?
 * $(document).bind('DOMSubtreeModified', runMd)
 */

class Mastodown { // eslint-disable-line no-unused-vars
  constructor () {
    const ul = (_, text) =>
      `\n<ul>\n\t<li>${text.trim()}</li>\n</ul>`

    const ol = (_, text) =>
      `\n<ol>\n\t<li>${text.trim()}</li>\n</ol>`

    const blockquote = (a, b, text) =>
      `\n<blockquote>${text.trim()}</blockquote>`

    const codeblock = (a, b, text) =>
      `\n<pre><code>${text.trim()}</code></pre>`

    this.rules = [
      { rx: /\*(.*?)\*/g, rp: '<strong>$1</strong>' } // strong
    , { rx: /_(.*?)_/g, rp: '<em>$1</em>' }           // emphasis
    , { rx: /~(.*?)~/g, rp: '<del>$1</del>' }         // strike
    , { rx: /\n`{3}([\S]+)?\n([\s\S]+)\n`{3}/g, rp: codeblock }
    , { rx: /`(.*?)`/g, rp: '<code>$1</code>' }       // inline code
    , { rx: /\n\*(.*)/g, rp: ul }                     // ul
    , { rx: /\n[0-9]+\.(.*)/g, rp: ol }               // ol
    , { rx: /\n(&gt;|>)(.*)/g, rp: blockquote }       // blockquote
    , { rx: /<\/ul>\s?<ul>/g, rp: '' }                // fix extra ul
    , { rx: /<\/ol>\s?<ol>/g, rp: '' }                // fix extra ol
    , { rx: /<\/blockquote><blockquote>/g, rp: '\n' } // fix extra blockquote
    ]
  }

  collapseNewlines (s) { // maybe? maybe not?
    return s.replace(/\n\s*\n/g, '\n')
  }

  render (text) {
    text = `\n${text}\n`
    this.rules.forEach(({ rx, rp }) => {
      text = text.replace(rx, rp)
    })
    return this.collapseNewlines(text.trim())
  }
}
