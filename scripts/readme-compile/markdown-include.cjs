#!/usr/bin/env node

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

markdownInclude.compileFiles(markdownJson).then(function () {
  console.info(markdownInclude.options.build + ' have been built successfully')
})
