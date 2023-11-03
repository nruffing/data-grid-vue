import { defineUserConfig, defaultTheme } from 'vuepress'

export default defineUserConfig({
  lang: 'en-US',
  title: 'Date Grid Vue',
  description:
    'Customizable native Vue3 data grid with very limited dependencies. Leverages a flat html structure and CSS grid to allow full layout control.',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  theme: defaultTheme({
    logo: '/favicon.svg',
    repo: 'https://github.com/nruffing/data-grid-vue',
  }),
})
