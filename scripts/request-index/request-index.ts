import { EnvironmentCredential } from '@azure/identity'
import { SecretClient } from '@azure/keyvault-secrets'
import { google } from 'googleapis'
import { getUrlsAsync } from '../shared/urls.js'
import * as https from 'https'

import 'dotenv/config'

const urls = await getUrlsAsync()

interface GoogleServiceAccount {
  type: string
  project_id: string
  private_key_id: string
  private_key: string
  client_email: string
  client_id: string
  auth_uri: string
  token_uri: string
  auth_provider_x509_cert_url: string
  client_x509_cert_url: string
  universe_domain: string
}

const credential = new EnvironmentCredential()
const client = new SecretClient('https://data-grid-vue.vault.azure.net/', credential)

/**
 * SUBMIT URLS TO GOOGLE
 */

const secret = await client.getSecret('GoogleApiServiceAccount')
const googleServiceAccount = JSON.parse(secret.value ?? '{}') as GoogleServiceAccount

const jwtClient = new google.auth.JWT(
  googleServiceAccount.client_email,
  undefined,
  googleServiceAccount.private_key,
  ['https://www.googleapis.com/auth/indexing'],
  undefined,
)
const googleCredential = await jwtClient.authorize()

const oauth2client = new google.auth.OAuth2({ credentials: googleCredential })
const indexing = google.indexing({ version: 'v3', auth: oauth2client })

for (const url of urls) {
  const response = await indexing.urlNotifications.publish({
    requestBody: {
      url,
      type: 'URL_UPDATED',
    },
  })

  console.log(JSON.stringify(response.data, null, 2))
}

/**
 * SUBMIT URLS TO BING
 */

const bingApiKey = (await client.getSecret('BingWebmasterApiKey')).value ?? ''
const postUrl = `https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlbatch?apikey=${bingApiKey}`

await new Promise((resolve, reject) => {
  const postData = JSON.stringify({
    siteUrl: 'https://www.datagridvue.com',
    urlList: urls,
  })

  process.stdout.write(`postData: ${postData}`)

  const req = https.request(
    postUrl,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Host: 'ssl.bing.com',
      },
    },
    res => {
      console.log('statusCode:', res.statusCode)
      console.log('headers:', res.headers)

      res.on('data', d => {
        process.stdout.write(d)
        resolve(d)
      })
    },
  )

  req.on('error', e => {
    console.error(e)
    reject(e)
  })

  req.write(postData)
  req.end()
})
