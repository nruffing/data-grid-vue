import { defineUserConfig, defaultTheme, App } from 'vuepress'
import { fs, getDirname, path } from '@vuepress/utils'
import { shikiPlugin } from '@vuepress/plugin-shiki'
import markdownItInclude from 'markdown-it-include'
import postcss from 'postcss'
import constants from './constants'
import { SitemapStream, streamToPromise } from 'sitemap'
import { Readable } from 'stream'
import { pwaPlugin } from '@vuepress/plugin-pwa'
import { pwaPopupPlugin } from '@vuepress/plugin-pwa-popup'

const __dirname = getDirname(import.meta.url) // @/vuepress/docs/.vuepress
const dgvStyleContents = await fs.readFile(path.resolve(__dirname, '../node_modules/data-grid-vue/dist/style.css'), 'utf8')
const dgvStyleOverrideContents = await fs.readFile(path.resolve(__dirname, '../dgv-overrides.css'), 'utf8')

const rootNode = postcss.parse(dgvStyleContents)
const variables = [] as string[]
rootNode.walk(node => {
  if (node.type === 'decl' && node.prop?.startsWith('--dgv')) {
    variables.push(`  ${node.prop}: ${node.value};`)
  }
})
const cssVariables = `:root {\n${variables.join('\n')}\n}`

const cacheDir = path.resolve(__dirname, '../vuepress-cache')
const tempDir = path.resolve(__dirname, '../vuepress-temp')
const publicDir = path.resolve(__dirname, 'public')

export default defineUserConfig({
  lang: 'en-US',
  title: 'Data Grid Vue',
  description:
    'Customizable native Vue3 data grid with very limited dependencies. Leverages a flat html structure and CSS grid to allow full layout control.',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],
    ['style', { type: 'text/css' }, dgvStyleContents + '\n\n' + dgvStyleOverrideContents],
  ],
  cache: cacheDir,
  temp: tempDir,
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
        text: '.NET',
        link: '/dotnet-generated/',
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
      '/dotnet-generated/': [
        {
          text: '.NET',
        },
      ],
    },
    sidebarDepth: 2,
  }),
  async extendsMarkdown(md, app) {
    md.use(markdownItInclude, {
      root: path.resolve(__dirname, '../shared'),
    })
    await app.writeTemp('dgvCssVariables.css', cssVariables)
  },
  markdown: {
    code: {
      lineNumbers: true,
    },
    importCode: {
      handleImportPath: str => str.replace(/^@temp/, tempDir),
    },
  },
  plugins: [
    shikiPlugin({
      theme: 'css-variables',
      langs: ['vue', 'css', 'sh', 'csharp'],
    }),
    pwaPlugin(),
    pwaPopupPlugin(),
  ],
  async onInitialized(app) {
    generateSitemap(app)
  },
})

async function generateSitemap(app: App) {
  const sitemap = new SitemapStream({ hostname: 'https://datagridvue.com' })
  const pages = app.pages.map(p => p.path)
  const sitemapString = await streamToPromise(Readable.from(pages).pipe(sitemap)).then(data => data.toString())
  fs.writeFile(path.resolve(publicDir, 'sitemap.xml'), sitemapString)
}
