module.exports = {
  base: '/',
  themeConfig: {
    repo: 'phphe/vue-colrow',
    docsDir: 'docs',
    editLinks: true,
    sidebarDepth: 2,
    locales: {
      '/': {
        label: 'English',
        sidebar: [
          '/guide',
          '/api',
        ],
        nav: [
          {text: 'Guide',link: '/guide'},
          {text: 'API',link: '/api'},
          {text: 'Blog',link: 'https://phphe.com'},
        ],
      },
      '/zh/': {
        selectText: '选择语言',
        label: '简体中文',
        editLinkText: '在 GitHub 上编辑此页',
        sidebar: [
          '/zh/guide',
          '/zh/api',
        ],
        nav: [
          {text: '指南',link: '/zh/guide'},
          {text: 'API',link: '/zh/api'},
          {text: '博客',link: 'https://phphe.com'},
        ],
      },
    },
  },
  locales: {
    '/': {
      lang: 'en-US',
      title: 'vue-colrow',
      description: 'Vue smarter layout components. Based on css flexbox. Support responsive design, server side render.'
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'vue-colrow',
      description: '更智能的布局组件. 基于css flexbox. 支持响应式布局, 服务端渲染.'
    }
  },
  plugins: [
    [
      '@vuepress/google-analytics',
      {
        'ga': 'UA-155723570-3' // UA-00000000-0
      }
    ]
  ],
}