import { defineUserConfig, defaultTheme } from 'vuepress'
import { fs, getDirname, path } from '@vuepress/utils'
import { shikiPlugin } from '@vuepress/plugin-shiki'

const __dirname = getDirname(import.meta.url)
console.log(__dirname)

export default defineUserConfig({
  lang: 'en-US',
  title: 'Date Grid Vue',
  description:
    'Customizable native Vue3 data grid with very limited dependencies. Leverages a flat html structure and CSS grid to allow full layout control.',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  theme: defaultTheme({
    logo: '/favicon.svg',
    repo: 'https://github.com/nruffing/data-grid-vue',
    colorModeSwitch: false,
    colorMode: 'dark',
    navbar: [
      {
        text: 'Home',
        link: '/',
      },
      {
        text: 'Guide',
        link: '/guide/',
      },
      {
        text: 'NPM',
        link: 'https://www.npmjs.com/package/data-grid-vue',
      },
      {
        text: 'Yarn',
        link: 'https://yarnpkg.com/package?name=data-grid-vue',
      },
      {
        text: 'Changelog',
        link: 'https://github.com/nruffing/data-grid-vue/releases',
      },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          children: ['/guide/README.md', '/guide/sorting.md'],
        },
      ],
    },
  }),
  async onPrepared(app) {
    const contents = await fs.readFile(path.resolve(__dirname, '../../node_modules/data-grid-vue/dist/style.css'), 'utf8')
    await app.writeTemp('data-grid-vue-style.css', contents)
  },
  plugins: [
    shikiPlugin({
      theme: 'css-variables',
      langs: ['vue'],
    }),
  ],
})
