/* eslint-disable no-useless-escape */

const zeedown = (str = '') =>
  str
    .replace(/\*(.*?)\*/g, '<strong>$1</strong>') // strong
    .replace(/_(.*?)_/g, '<em>$1</em>') // em
    .replace(/~(.*?)~/g, '<del>$1</del>') // strike
    .replace(
      /\n`{3}(\S+)?\n([\S\s]+)\n`{3}/g,
      (a, b, text) => `\n<pre><code>${text.trim()}</code></pre>`
    ) // code block
    .replace(/`(.*?)`/g, '<code>$1</code>') // inline code
    .replace(/\n\*(.*)/g, (_, text) => `\n<ul>\n<li>${text.trim()}</li>\n</ul>`) // ul
    .replace(
      /\n\d+\.(.*)/g,
      (_, text) => `\n<ol>\n<li>${text.trim()}</li>\n</ol>`
    ) // ol
    .replace(
      /\n(&gt;|>)(.*)/g,
      (a, b, text) => `\n<blockquote>${text.trim()}</blockquote>`
    ) // block quote
    .replace(/<\/ul>\s?<ul>/g, '') // clean up extra ul
    .replace(/<\/ol>\s?<ol>/g, '') // clean up extra ol
    .replace(/<\/blockquote>\s?<blockquote>/g, '\n') // clean up extra blockquote
    .replace(/\n\s*\n/g, '\n') // collapse consecutive newlines

module.exports = zeedown
