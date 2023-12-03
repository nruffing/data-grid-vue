import { getUrlsAsync } from '../shared/urls.js'
import { exec } from 'node:child_process'

const urls = await getUrlsAsync()

for (const url of urls) {
  console.log(`Processing ${url}...`)
  exec(`./node_modules/.bin/axe "${url}"`, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error on ${url} | ${err}`)
      return
    }

    if (stderr) {
      console.error(`Error on ${url} | ${err}`)
      return
    }

    console.log(`${url} | ${stdout}`)
  })
}
