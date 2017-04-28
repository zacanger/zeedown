const zeedown = (str = '', shrt = false) => {
  const emReg = shrt
    ? /_(.*?)_/g
    : /(\*|_)(.*?)\1/g

  const emRep = shrt
    ? '<em>$1</em>'
    : '<em>$2</em>'

  const strongReg = shrt
    ? /\*(.*?)\*/g
    : /(\*\*|__)(.*?)\1/g

  const strongRep = shrt
    ? '<strong>$1</strong>'
    : '<strong>$2</strong>'

  const delReg = shrt
    ? /~(.*?)~/g
    : /\~\~(.*?)\~\~/g

  const hedReg = shrt
    ? /\b\B/g
    : /(#+)(.*)/g

  const hedRep = shrt
    ? ''
    : (_, chs, text) => `<h${chs.length}>${text.trim()}</h${chs.length}>`

  return str
    .replace(hedReg, hedRep) // headers
    .replace(strongReg, strongRep) // strong
    .replace(emReg, emRep) // em
    .replace(delReg, '<del>$1</del>') // strike
    .replace(/\n`{3}([\S]+)?\n([\s\S]+)\n`{3}/g, (a, b, text) => `\n<pre><code>${text.trim()}</code></pre>`) // code block
    .replace(/`(.*?)`/g, '<code>$1</code>') // inline code
    .replace(/\n\*(.*)/g, (_, text) => `\n<ul>\n<li>${text.trim()}</li>\n</ul>`) // ul
    .replace(/\n[0-9]+\.(.*)/g, (_, text) => `\n<ol>\n<li>${text.trim()}</li>\n</ol>`) // ol
    .replace(/\n(&gt;|>)(.*)/g, (a, b, text) => `\n<blockquote>${text.trim()}</blockquote>`) // block quote
    .replace(/<\/ul>\s?<ul>/g, '') // clean up extra ul
    .replace(/<\/ol>\s?<ol>/g, '') // clean up extra ol
    .replace(/<\/blockquote>\s?<blockquote>/g, '\n') // clean up extra blockquote
    .replace(/\n\s*\n/g, '\n') // collapse consecutive newlines
}

module.exports = zeedown
