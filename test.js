const assert = require('assert')
const zd = require('.')

const s = `
# one
## two

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

const se = `
# one
## two
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

assert(zd(s) === se, 'works')
