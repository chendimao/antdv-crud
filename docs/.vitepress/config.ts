import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Antdv-Crud",
  description: "基于 Ant Design Vue 的 CRUD 组件库",
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'V2 文档', link: '/v2/' },
      { text: 'V1 文档', link: '/v1/' }
    ],

    sidebar: {
      '/v2/': [
        {
          text: 'V2 文档',
          items: [
            { text: '介绍', link: '/v2/' }, 
            { text: '完整使用指南', link: '/v2/comprehensive-guide' },
            { text: '核心组件', link: '/v2/components' },
            { text: '表单项类型', link: '/v2/form-items' },
            { text: '特殊功能', link: '/v2/features' },
            { text: '组件初始化', link: '/v2/initialization' },
            { text: '事件处理', link: '/v2/events' },
            { text: '注意事项', link: '/v2/notes' }
          ]
        }
      ],
      '/v1/': [
        {
          text: 'V1 文档',
          items: [
            { text: '介绍', link: '/v1/' },
            { text: '配置说明', link: '/v1/config' },
            { text: '内置方法', link: '/v1/function' },
            { text: '代码示例', link: '/v1/code-examples' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/chendimao/antdv-crud' }
    ]
  }
})
