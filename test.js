const assert = require('assert')
const zd = require('.')

const s = `
\`inline code\` *strong* _em_ ~strike~

> block
> quote

* u
* l

0. o
0. l

\`\`\`
code
block
\`\`\`
`

const l = `
\`inline code\` *em* _also em_ **strong** __also strong__ ~~strike~~

> block
> quote

* u
* l

0. o
0. l

\`\`\`
code
block
\`\`\`
`

const le = `
<code>inline code</code> <em>em</em> <em>also em</em> <strong>strong</strong> <strong>also strong</strong> <del>strike</del>
<blockquote>block
quote</blockquote>
<ul>
<li>u</li>
<li>l</li>
</ul>
<ol>
<li>o</li>
<li>l</li>
</ol>
<pre><code>code
block</code></pre>
`

const se = `
<code>inline code</code> <strong>strong</strong> <em>em</em> <del>strike</del>
<blockquote>block
quote</blockquote>
<ul>
<li>u</li>
<li>l</li>
</ul>
<ol>
<li>o</li>
<li>l</li>
</ol>
<pre><code>code
block</code></pre>
`

assert(zd(l) === le, 'converts md')
assert(zd(s, true) === se, 'shorthand flag works')
