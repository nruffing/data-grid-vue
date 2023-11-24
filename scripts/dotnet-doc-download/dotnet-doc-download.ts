import AdmZip from 'adm-zip'

import * as fs from 'fs'
import * as path from 'path'

const getMarkdownUrl = 'https://example-api.datagridvue.com/Documentation/GetMarkdown'
const destination = './vuepress/dotnet-generated'

/**
 * clear destination directory
 */
fs.rmSync(destination, { recursive: true, force: true })

/**
 * download markdown zip
 */
const zipBlob = await fetch(getMarkdownUrl, {
  method: 'GET',
}).then(response => {
  if (response.status !== 200) {
    throw new Error('Failed to get markdown')
  }
  return response.blob()
})

/**
 * extract zip to destination directory
 */
const zipArrayBuffer = await zipBlob.arrayBuffer()
const zipBuffer = Buffer.from(zipArrayBuffer)
const zip = new AdmZip(zipBuffer)
zip.extractAllTo(destination, true)

/**
 * clean up README.md
 */
const readmePath = path.join(destination, 'README.md')
let readmeText = fs.readFileSync(readmePath, { encoding: 'utf-8' })

readmeText = readmeText.replace(':books:', '')
readmeText = readmeText.replace(/\[(?<text>.+)\]\(https:\/\/datagridvue\.com\)/gm, (match: string) => {
  return /\[(?<text>.+)\]/.exec(match)?.groups?.text || ''
})
readmeText = readmeText.replace(/https:\/\/datagridvue\.com/gm, '')
readmeText = readmeText.replace('> [!NOTE]', '')

fs.writeFileSync(readmePath, readmeText, { encoding: 'utf-8' })
