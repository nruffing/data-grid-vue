#!/usr/bin/env node

var markdownJson = './markdown.json'
var markdownInclude = require('./node_modules/markdown-include/markdown-include.js')

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
