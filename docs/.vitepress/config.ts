import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "antdv-crud-vue3-doc",
  description: "该插件是基于Vue 3和VXETable的通用增删改查（CRUD）功能插件。它旨在简化开发过程，为开发人员提供一个快速构建管理界面的解决方案，无需从头开始编写 CRUD 功能。",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '介绍', link: '/guide/introduce' },
      { text: 'API示例', link: '/api-examples' }
    ],

    sidebar: [
      {
        text: '介绍',
        items: [
          { text: '入门指南', link: '/guide/introduce' },
          { text: 'API示例', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/chendimao/antdv-crud' }
    ]
  }
})
