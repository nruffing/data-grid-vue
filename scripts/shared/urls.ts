import { fs } from '@vuepress/utils'

export async function getUrlsAsync() {
  const urls = await fs.readFile('./vuepress/.vuepress/dist/urls.txt', { encoding: 'utf8' })
  return urls
    .split('\n')
    .map(u => u?.trim())
    .filter(u => !!u)
}
