import { getUrlsAsync } from '../shared/urls.js'
import { sendEmail } from '../shared/email.js'
import { ExecException, exec } from 'node:child_process'

const urls = await getUrlsAsync()

const output = [] as string[]

function appendLog(url: string, stdout: string) {
  const txt = `${url} | ${stdout}`
  output.push(txt)
  console.log(txt)
}

function appendError(url: string, err: ExecException | string) {
  const txt = `${url} | ${err}`
  output.push(txt)
  console.error(txt)
}

const promises = [] as Promise<void>[]

for (const url of urls) {
  promises.push(
    new Promise((resolve, reject) => {
      const process = exec(`./node_modules/.bin/axe "${url}"`, (err: ExecException | null, stdout: string, stderr: string) => {
        if (err) {
          appendError(url, err)
          return
        }

        if (stderr) {
          appendError(url, stderr)
          return
        }

        appendLog(url, stdout)
      })

      process.on('close', resolve)
    }),
  )
}

await Promise.all(promises)
await sendEmail('Axe Results - data-grid-vue', output)
