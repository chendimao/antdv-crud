import { defineConfig } from 'vitepress'
import type MarkdownIt from 'markdown-it'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Antdv-Crud",
  description: "基于 Ant Design Vue 的 CRUD 组件库",
  markdown: {
    lineNumbers: true,
    // 配置 markdown-it 选项
    config: (md: MarkdownIt) => {
      // 使用更严格的 HTML 标签规则
      md.set({
        html: false,
        linkify: true,
        typographer: true,
        breaks: true,
        highlight: function (str, lang) {
          return str
        }
      })

      // 添加自定义渲染器来处理代码块
      const defaultRender = md.renderer.rules.fence
      if (defaultRender) {
        md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
          const token = tokens[idx]
          if (token && token.content) {
            // 转义特殊字符
            const escapedCode = token.content
              .replace(/[<>]/g, (c) => c === '<' ? '&lt;' : '&gt;')
              .replace(/(\d+):/g, '"$1":') // 将数字键转换为字符串键
              .replace(/(\w+):/g, '"$1":') // 将所有键转换为字符串键
            token.content = escapedCode
          }
          return defaultRender(tokens, idx, options, env, slf)
        }
      }
    }
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
            { text: '快速开始', link: '/v2/getting-started' },
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
