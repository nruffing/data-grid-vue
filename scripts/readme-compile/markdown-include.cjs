#!/usr/bin/env node

const fs = require('fs')


function escapeForRegExp(string) {
	return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

var markdownJson = './scripts/readme-compile/markdown.json'
var markdownInclude = require('markdown-include')


/**
 * Change custom container syntax from the vuepress default theme to the syntax expected by github.
 * https://v2.vuepress.vuejs.org/reference/default-theme/markdown.html#custom-containers
 * https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts
 */
const customContainerPatternFormat = '^ *::: +{container-name}(\\w| )+$'
const customContainerReplaceFormat = '> [!{container-name}]'
const containerNameMap = [
	['danger', 'CAUTION'],
	['tip', 'TIP'],
	['details', undefined],
	['warning', 'WARNING'],
]

for (const [containerName, newContainerName] of containerNameMap) {
	const pattern = new RegExp(customContainerPatternFormat.replace('{container-name}', containerName), 'gm')
	const replace = newContainerName
		? customContainerReplaceFormat.replace('{container-name}', newContainerName)
		: ' '
	markdownInclude.registerPlugin({ pattern, replace })
	console.log(`${pattern} -> ${replace}`)
}

markdownInclude.registerPlugin({
	pattern: /:::/gm,
	replace: ' '
})


/**
 * Manually include files that are not markdown
 */
const filesToInclude = [
	'.npmrc',
]
const filePatternFormat = '^ *#include +"{file-name}" *$'
for (const file of filesToInclude) {
	const pattern = new RegExp(filePatternFormat.replace('{file-name}', escapeForRegExp(file)), 'gm')
	const replace = fs.readFileSync(file, 'utf8')
	markdownInclude.registerPlugin({
		pattern,
		replace
	})
	console.log(`${pattern} -> FILE CONTENTS`)
}


/**
 * Run the markdown-include compiler
 */
markdownInclude.compileFiles(markdownJson).then(function () {
  console.info(markdownInclude.options.build + ' have been built successfully')
})
