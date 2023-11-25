#!/usr/bin/env node

const fs = require('fs')

var markdownJson = './scripts/readme-compile/markdown.json'
var markdownInclude = require('markdown-include')

markdownInclude.registerPlugin({
	pattern: /::: danger BREAKING/gm,
	replace: '> [!IMPORTANT]'
})
markdownInclude.registerPlugin({
	pattern: /:::/gm,
	replace: ' '
})
markdownInclude.registerPlugin({
	pattern: /^#include\s"\.npmrc"/gm,
	replace: fs.readFileSync('./.npmrc', 'utf8')
})

markdownInclude.compileFiles(markdownJson).then(function () {
  console.info(markdownInclude.options.build + ' have been built successfully')
})
