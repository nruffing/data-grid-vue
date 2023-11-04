import { defineUserConfig, defaultTheme } from 'vuepress'
import { fs, getDirname, path } from '@vuepress/utils'
import { shikiPlugin } from '@vuepress/plugin-shiki'
import markdownItInclude from 'markdown-it-include'

const __dirname = getDirname(import.meta.url) // @/vuepress/docs/.vuepress
const dgvStyleContents = await fs.readFile(path.resolve(__dirname, '../../node_modules/data-grid-vue/dist/style.css'), 'utf8')
const dgvStyleOverrideContents = await fs.readFile(path.resolve(__dirname, '../dgv-overrides.css'), 'utf8')

export default defineUserConfig({
  lang: 'en-US',
  title: 'Date Grid Vue',
  description:
    'Customizable native Vue3 data grid with very limited dependencies. Leverages a flat html structure and CSS grid to allow full layout control.',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['style', { type: 'text/css' }, dgvStyleContents + '\n\n' + dgvStyleOverrideContents],
  ],
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
        text: 'Documentation',
        link: '/generated/',
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
      {
        text: 'Support',
        children: [
          {
            text: 'Report bug',
            link: 'https://github.com/nruffing/data-grid-vue/issues/new?assignees=nruffing&labels=bug&projects=&template=bug_report.md&title=%5Bbug%5D',
          },
          {
            text: 'Feature request',
            link: 'https://github.com/nruffing/data-grid-vue/issues/new?assignees=nruffing&labels=enhancement&projects=&template=feature_request.md&title=%5Bfeature%5D',
          },
          {
            text: 'Other questions',
            link: 'https://github.com/nruffing/data-grid-vue/issues/new?assignees=nruffing&labels=support&projects=&template=support-request.md&title=%5Bsupport%5D',
          },
        ],
      },
    ],
    sidebar: 'auto',
  }),
  extendsMarkdown(md) {
    md.use(markdownItInclude, {
      root: path.resolve(__dirname, '../shared'),
    })
  },
  plugins: [
    shikiPlugin({
      theme: 'css-variables',
      langs: ['vue'],
    }),
  ],
})
