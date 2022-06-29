#!/usr/bin/env node

if (module.parent) {
  console.log('Please import zeedown, not zeedown/cli!')
  process.exit(1)
}

const zd = require('.')
const arg = process.argv[2]
const sendHelp = !!(arg && ['-h', '--help'].includes(arg))

if (sendHelp) {
  console.log(`
    zeedown
    --------
    usage: cat foo.md | zeedown > foo.html
    options: -s --short use short mode
  `)
  process.exit(0)
}

let text = ''
process.stdin.resume()
process.stdin.setEncoding('utf8')
process.stdin.on('data', (chunk) => {
  text += chunk
})
process.stdin.on('end', () => {
  console.log(zd(text))
})
