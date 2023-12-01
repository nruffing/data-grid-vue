import { EnvironmentCredential } from '@azure/identity'
import { SecretClient } from '@azure/keyvault-secrets'
import { google } from 'googleapis'

import 'dotenv/config'

interface GoogleServiceAccount {
  client_email: string
  private_key: string
}

const credential = new EnvironmentCredential()
const client = new SecretClient('https://data-grid-vue.vault.azure.net/', credential)
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
if (!googleCredential.access_token) {
  throw new Error('Failed to get Google access token to request indexing')
}
console.log(googleCredential.access_token)

const indexing = google.indexing({ version: 'v3', auth: googleCredential.access_token })
const response = await indexing.urlNotifications.publish({
  requestBody: {
    url: 'https://datagridvue.com',
    type: 'URL_UPDATED',
  },
})

console.log(JSON.stringify(response.data, null, 2))
