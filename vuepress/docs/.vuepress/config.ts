import { defineUserConfig, defaultTheme } from 'vuepress'
import { fs, getDirname, path } from '@vuepress/utils'
import { shikiPlugin } from '@vuepress/plugin-shiki'
import markdownItInclude from 'markdown-it-include'
import postcss from 'postcss'
import constants from './constants'

const __dirname = getDirname(import.meta.url) // @/vuepress/docs/.vuepress
const dgvStyleContents = await fs.readFile(path.resolve(__dirname, '../../node_modules/data-grid-vue/dist/style.css'), 'utf8')
const dgvStyleOverrideContents = await fs.readFile(path.resolve(__dirname, '../dgv-overrides.css'), 'utf8')

const rootNode = postcss.parse(dgvStyleContents)
const variables = [] as string[]
rootNode.walk(node => {
  if (node.type === 'decl' && node.prop?.startsWith('--dgv')) {
    variables.push(`  ${node.prop}: ${node.value};`)
  }
})
const cssVariables = `:root {\n${variables.join('\n')}\n}`

export default defineUserConfig({
  lang: 'en-US',
  title: 'Data Grid Vue',
  description:
    'Customizable native Vue3 data grid with very limited dependencies. Leverages a flat html structure and CSS grid to allow full layout control.',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['style', { type: 'text/css' }, dgvStyleContents + '\n\n' + dgvStyleOverrideContents],
  ],
  async onPrepared(app) {
    await app.writeTemp('dgvCssVariables.css', cssVariables)
  },
  define: constants,
  theme: defaultTheme({
    logo: '/favicon.svg',
    repo: 'https://github.com/nruffing/data-grid-vue',
    docsBranch: 'main',
    editLinkPattern: ':repo/edit/:branch/vuepress/docs/:path',
    colorModeSwitch: false,
    colorMode: 'dark',
    themePlugins: {
      git: true,
      prismjs: false,
    },
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
        text: 'API',
        link: '/generated/',
      },
      {
        text: 'Theme',
        link: '/theme/',
      },
      {
        text: 'NPM',
        link: constants.npmUrl,
      },
      {
        text: 'Yarn',
        link: constants.yarnUrl,
      },
      {
        text: 'Changelog',
        link: '/changelog/',
      },
      {
        text: 'Help',
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
    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          children: ['/guide/README.md', '/guide/columns.md'],
        },
      ],
      '/generated/': [
        {
          text: 'API',
        },
      ],
    },
    sidebarDepth: 2,
  }),
  extendsMarkdown(md) {
    md.use(markdownItInclude, {
      root: path.resolve(__dirname, '../shared'),
    })
  },
  markdown: {
    code: {
      lineNumbers: true,
    },
    importCode: {
      handleImportPath: str => str.replace(/^@temp/, path.resolve(__dirname, '.temp')),
    },
  },
  plugins: [
    shikiPlugin({
      theme: 'css-variables',
      langs: ['vue', 'css', 'sh'],
    }),
  ],
})
