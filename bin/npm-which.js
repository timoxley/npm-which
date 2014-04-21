#!/usr/bin/env node

"use strict"

var program = require('commander');
var pkg = require('../package.json')

var npmWhich = require('../')

program
  .version(pkg.version)
  .option('-a, --all')
  .option('-c', 'No output, just return 0 if any of the executables are found, or 1 if none are found.')
  .usage('<command>')
  .parse(process.argv)

if (!program.args.length) return program.help()

var cmd = program.args[0]

try {
  console.log(npmWhich.sync(cmd))
} catch (e) {
  if (!e.message.match('not found:')) throw e
  console.error('%s not found', cmd)
}
