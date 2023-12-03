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
import { docsearchPlugin } from '@vuepress/plugin-docsearch'
import anchor from 'markdown-it-anchor'
import googleAnalyticsPlugin from '@vuepress/plugin-google-analytics'

const domain = 'datagridvue.com'
const hostname = `https://${domain}`
const title = 'Data Grid Vue'
const description =
  'Customizable and accessible native Vue3 data grid with limited dependencies. Leverages a flat html structure and CSS grid to allow full layout control. MIT Licensed.'

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

const sitemapFilename = 'sitemap.xml'
const sitemapUrl = `https://${path.join(domain, sitemapFilename)}`
const skipIndexPaths = ['/404.html', '/shared/', '/generated/', '/dotnet-generated/']
function skipIndex(path: string | undefined) {
  if (!path) {
    return false
  }
  return skipIndexPaths.some(p => path.startsWith(p))
}

async function generateSitemap(app: App) {
  const sitemap = new SitemapStream({ hostname })
  const pages = app.pages.map(p => p.path).filter(p => !skipIndex(p))
  const sitemapString = await streamToPromise(Readable.from(pages).pipe(sitemap)).then(data => data.toString())
  fs.writeFile(path.resolve(publicDir, sitemapFilename), sitemapString, { encoding: 'utf8' })
  fs.writeFile(path.resolve(publicDir, 'urls.txt'), pages.map(p => `https://${path.join(domain, p)}`).join('\n'), { encoding: 'utf8' })
}

async function generateRobotsTxt() {
  const robotsTxt = `User-agent: *
Allow: /

SiteMap: ${sitemapUrl}`
  fs.writeFile(path.resolve(publicDir, 'robots.txt'), robotsTxt, { encoding: 'utf8' })
}

const descriptions = {
  '/theme/':
    'Data Grid Vue is designed with a fairly flat HTML structure and leverages CSS grid to arrange the HTML into a data grid. This architecture allows for endless layout possibilities both in the data grid and where the data grid is placed on the page.',
  '/guide/': 'Data Grid Vue is available via both npm and yarn. The data grid component is recommended to be setup via the included Vue.js plugin.',
  '/guide/columns.html':
    'Column definitions must be supplied via the columns prop on the dgv-data-grid component. The column definitions describe the desired display behavior and functionality of each column.',
}

export default defineUserConfig({
  lang: 'en-US',
  title,
  description,
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],
    ['style', { type: 'text/css' }, dgvStyleContents + '\n\n' + dgvStyleOverrideContents],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:image', content: `https://${path.join(domain, 'android-chrome-512x512.png')}` }],
    ['meta', { name: 'og:url', content: hostname }],
  ],
  extendsPage: (page, app) => {
    if (!page.frontmatter.head) {
      page.frontmatter.head = []
    }
    if (skipIndex(page.path)) {
      page.frontmatter.head.push(['meta', { name: 'robots', content: 'noindex' }])
    }
    const descriptionContent = descriptions[page.path] ?? description
    if (descriptionContent) {
      const descriptionMeta = page.frontmatter.head.find(h => h[0] === 'meta' && h[1].name === 'description')
      if (descriptionMeta) {
        descriptionMeta[1].content = descriptionContent
      } else {
        page.frontmatter.head.push(['meta', { name: 'description', content: descriptionContent }])
      }
      page.frontmatter.head.push(['meta', { name: 'og:description', content: descriptionContent }])
    }
    page.frontmatter.head.push(['meta', { name: 'og:title', content: `${page.title} | ${title}` }])
  },
  cache: cacheDir,
  temp: tempDir,
  define: constants,
  theme: defaultTheme({
    logo: '/favicon.svg',
    repo: 'https://github.com/nruffing/data-grid-vue',
    docsBranch: 'main',
    editLinkPattern: ':repo/edit/:branch/vuepress/:path',
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
          children: [
            '/guide/README.md',
            '/guide/columns.md',
            '/guide/sorting.md',
            '/guide/filtering.md',
            '/guide/paging.md',
            '/guide/more-coming-soon.md',
          ],
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
    anchor: {
      permalink: anchor.permalink.headerLink({}),
    },
  },
  plugins: [
    shikiPlugin({
      theme: 'css-variables',
      langs: ['vue', 'css', 'sh', 'csharp'],
    }),
    pwaPlugin(),
    pwaPopupPlugin(),
    docsearchPlugin({
      appId: 'TDK3X6HP00',
      apiKey: '3d9194a8aad4d39ac138eb89e55153ea',
      indexName: 'datagridvue',
    }),
    googleAnalyticsPlugin({
      id: 'G-SEY66XPMSS',
    }),
  ],
  async onInitialized(app) {
    await generateSitemap(app)
    await generateRobotsTxt()
  },
})
