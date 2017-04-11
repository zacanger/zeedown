/*
 * Possible better names than Tootdown:
 * Marktoot (suggested by @zaccolley@mastodon.social), Mastodown
 * Author: zacanger (http://zacanger.com)
 * License: WTFPL
 *
 * Supports:
 *   Strong (Bold)
 *   Emphasis (Italic)
 *   Deletions (Strikethrough)
 *   Inline code
 *   Fenced code blocks (not indent)
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
 * const runMd = () => {
 *   [].forEach.call($('.status__content'), (el) => {
 *     $(el).replaceWith(tootdown(el.text()))
 *   })
 * }
 * // this could use mutationobserver or something?
 * $(document).bind('DOMSubtreeModified', runMd)
 */

const tootdown = (post) =>
  post
    .replace(/\*(.*?)\*/g, '<strong>$1</strong>') // strong
    .replace(/_(.*?)_/g, '<em>$1</em>') // em
    .replace(/~(.*?)~/g, '<del>$1</del>') // strike
    .replace(/\n`{3}([\S]+)?\n([\s\S]+)\n`{3}/g, (a, b, text) => `\n<pre><code>${text.trim()}</code></pre>`) // code block
    .replace(/`(.*?)`/g, '<code>$1</code>') // inline code
    .replace(/\n\*(.*)/g, (_, text) => `\n<ul>\n\t<li>${text.trim()}</li>\n</ul>`) // ul
    .replace(/\n[0-9]+\.(.*)/g, (_, text) => `\n<ol>\n\t<li>${text.trim()}</li>\n</ol>`) // ol
    .replace(/\n(&gt;|>)(.*)/g, (a, b, text) => `\n<blockquote>${text.trim()}</blockquote>`) // block quote
    .replace(/<\/ul>\s?<ul>/g, '') // clean up extra ul
    .replace(/<\/ol>\s?<ol>/g, '') // clean up extra ol
    .replace(/<\/blockquote>\s?<blockquote>/g, '\n') // clean up extra blockquote
    .replace(/\n\s*\n/g, '\n') // collapse consecutive newlines
