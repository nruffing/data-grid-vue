import { EmailClient, EmailMessage, EmailSendResponse } from '@azure/communication-email'
import { EnvironmentCredential } from '@azure/identity'
import { SecretClient } from '@azure/keyvault-secrets'
import { parse } from 'ansicolor'

interface AzureEmailConfig {
  connectionString: string
  senderAddress: string
  toEmail: string
}

const credential = new EnvironmentCredential()
const client = new SecretClient('https://data-grid-vue.vault.azure.net/', credential)

const secret = await client.getSecret('EmailService')
const config = JSON.parse(secret.value ?? '{}') as AzureEmailConfig

const emailClient = new EmailClient(config.connectionString)

export async function sendEmail(subject: string, ansiTexts: string[]): Promise<EmailSendResponse> {
  const parsed = parse(ansiTexts.join('\r\n'))
  const html = parsed.spans.map(s => s.text).join('<br />')

  const message: EmailMessage = {
    senderAddress: config.senderAddress,
    recipients: {
      to: [
        {
          address: config.toEmail,
        },
      ],
    },
    content: {
      subject,
      html,
    },
  }

  const poller = await emailClient.beginSend(message)
  const response = await poller.pollUntilDone()

  console.log('EMAIL RESPONSE', response)

  return response
}
