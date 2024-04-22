import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path';

function pathResolve(dir) {
  return resolve(process.cwd(), '.', dir);
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  esbuild: {
    drop: process.env.NODE_ENV !=='development' ? ["console", "debugger"] : [],
  },
  build: {
    rollupOptions: {
      // 请确保外部化那些你的库中不需要的依赖
      external: ['vue', 'ant-design-vue', 'axios', 'vxe-table'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'vue',
        },
      },
    },
    lib: {
      entry: 'package/index.js',
      name: 'antdv-crud',
      fileName: (format) => `antdv-crud.${format}.js`,
    },
  },
  resolve: {
    alias: [
      {
        find: 'vue-i18n',
        replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
      },
      // /@/xxxx => src/xxxx
      {
        find: /\/@\//,
        replacement: pathResolve('package') + '/',
      },
      // /#/xxxx => types/xxxx
      {
        find: /\/#\//,
        replacement: pathResolve('types') + '/',
      },
    ],
  },

  server: {
    // 默认打开的端口和本地
    // host: '0.0.0.0',
    // port: 8080,
    https: false, // 不支持https
    proxy: {
      '/api': {
        target: 'http://v.juhe.cn',	// 实际请求地址
        changeOrigin: true, // 是否跨域
        rewrite: (path) => path.replace(/^\/api/, '') // 对什么类的服务器匹配
      },
    }
  }

})
