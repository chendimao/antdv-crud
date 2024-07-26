// vite.config.js
import { defineConfig } from "file:///D:/phpStudy/WWW/antdv-crud-vue3/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/phpStudy/WWW/antdv-crud-vue3/node_modules/@vitejs/plugin-vue/dist/index.js";
import vueJsx from "file:///D:/phpStudy/WWW/antdv-crud-vue3/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import { resolve } from "path";
function pathResolve(dir) {
  return resolve(process.cwd(), ".", dir);
}
var vite_config_default = defineConfig({
  plugins: [vue(), vueJsx()],
  esbuild: {
    // drop: process.env.NODE_ENV !=='development' ? ["console", "debugger"] : [],
  },
  build: {
    rollupOptions: {
      // 请确保外部化那些你的库中不需要的依赖
      external: ["vue", "ant-design-vue", "axios", "vxe-table", "dayjs"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "vue"
        }
      }
    },
    lib: {
      entry: "package/index.js",
      name: "antdv-crud",
      fileName: (format) => `antdv-crud.${format}.js`
    }
  },
  resolve: {
    alias: [
      {
        find: "vue-i18n",
        replacement: "vue-i18n/dist/vue-i18n.cjs.js"
      },
      // /@/xxxx => src/xxxx
      {
        find: /\/@\//,
        replacement: pathResolve("package") + "/"
      },
      // /#/xxxx => types/xxxx
      {
        find: /\/#\//,
        replacement: pathResolve("types") + "/"
      }
    ]
  },
  server: {
    // 默认打开的端口和本地
    // host: '0.0.0.0',
    // port: 8080,
    https: false,
    // 不支持https
    proxy: {
      "/api": {
        target: "http://v.juhe.cn",
        // 实际请求地址
        changeOrigin: true,
        // 是否跨域
        rewrite: (path) => path.replace(/^\/api/, "")
        // 对什么类的服务器匹配
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxwaHBTdHVkeVxcXFxXV1dcXFxcYW50ZHYtY3J1ZC12dWUzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxwaHBTdHVkeVxcXFxXV1dcXFxcYW50ZHYtY3J1ZC12dWUzXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9waHBTdHVkeS9XV1cvYW50ZHYtY3J1ZC12dWUzL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCB2dWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCdcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnO1xyXG5cclxuZnVuY3Rpb24gcGF0aFJlc29sdmUoZGlyKSB7XHJcbiAgcmV0dXJuIHJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJy4nLCBkaXIpO1xyXG59XHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW3Z1ZSgpLCB2dWVKc3goKV0sXHJcbiAgZXNidWlsZDoge1xyXG4gICAgLy8gZHJvcDogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09J2RldmVsb3BtZW50JyA/IFtcImNvbnNvbGVcIiwgXCJkZWJ1Z2dlclwiXSA6IFtdLFxyXG4gIH0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgLy8gXHU4QkY3XHU3ODZFXHU0RkREXHU1OTE2XHU5MEU4XHU1MzE2XHU5MEEzXHU0RTlCXHU0RjYwXHU3Njg0XHU1RTkzXHU0RTJEXHU0RTBEXHU5NzAwXHU4OTgxXHU3Njg0XHU0RjlEXHU4RDU2XHJcbiAgICAgIGV4dGVybmFsOiBbJ3Z1ZScsICdhbnQtZGVzaWduLXZ1ZScsICdheGlvcycsICd2eGUtdGFibGUnLCAnZGF5anMnXSxcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgLy8gXHU1NzI4IFVNRCBcdTY3ODRcdTVFRkFcdTZBMjFcdTVGMEZcdTRFMEJcdTRFM0FcdThGRDlcdTRFOUJcdTU5MTZcdTkwRThcdTUzMTZcdTc2ODRcdTRGOURcdThENTZcdTYzRDBcdTRGOUJcdTRFMDBcdTRFMkFcdTUxNjhcdTVDNDBcdTUzRDhcdTkxQ0ZcclxuICAgICAgICBnbG9iYWxzOiB7XHJcbiAgICAgICAgICB2dWU6ICd2dWUnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgbGliOiB7XHJcbiAgICAgIGVudHJ5OiAncGFja2FnZS9pbmRleC5qcycsXHJcbiAgICAgIG5hbWU6ICdhbnRkdi1jcnVkJyxcclxuICAgICAgZmlsZU5hbWU6IChmb3JtYXQpID0+IGBhbnRkdi1jcnVkLiR7Zm9ybWF0fS5qc2AsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IFtcclxuICAgICAge1xyXG4gICAgICAgIGZpbmQ6ICd2dWUtaTE4bicsXHJcbiAgICAgICAgcmVwbGFjZW1lbnQ6ICd2dWUtaTE4bi9kaXN0L3Z1ZS1pMThuLmNqcy5qcycsXHJcbiAgICAgIH0sXHJcbiAgICAgIC8vIC9AL3h4eHggPT4gc3JjL3h4eHhcclxuICAgICAge1xyXG4gICAgICAgIGZpbmQ6IC9cXC9AXFwvLyxcclxuICAgICAgICByZXBsYWNlbWVudDogcGF0aFJlc29sdmUoJ3BhY2thZ2UnKSArICcvJyxcclxuICAgICAgfSxcclxuICAgICAgLy8gLyMveHh4eCA9PiB0eXBlcy94eHh4XHJcbiAgICAgIHtcclxuICAgICAgICBmaW5kOiAvXFwvI1xcLy8sXHJcbiAgICAgICAgcmVwbGFjZW1lbnQ6IHBhdGhSZXNvbHZlKCd0eXBlcycpICsgJy8nLFxyXG4gICAgICB9LFxyXG4gICAgXSxcclxuICB9LFxyXG5cclxuICBzZXJ2ZXI6IHtcclxuICAgIC8vIFx1OUVEOFx1OEJBNFx1NjI1M1x1NUYwMFx1NzY4NFx1N0FFRlx1NTNFM1x1NTQ4Q1x1NjcyQ1x1NTczMFxyXG4gICAgLy8gaG9zdDogJzAuMC4wLjAnLFxyXG4gICAgLy8gcG9ydDogODA4MCxcclxuICAgIGh0dHBzOiBmYWxzZSwgLy8gXHU0RTBEXHU2NTJGXHU2MzAxaHR0cHNcclxuICAgIHByb3h5OiB7XHJcbiAgICAgICcvYXBpJzoge1xyXG4gICAgICAgIHRhcmdldDogJ2h0dHA6Ly92Lmp1aGUuY24nLFx0Ly8gXHU1QjlFXHU5NjQ1XHU4QkY3XHU2QzQyXHU1NzMwXHU1NzQwXHJcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLCAvLyBcdTY2MkZcdTU0MjZcdThERThcdTU3REZcclxuICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgJycpIC8vIFx1NUJGOVx1NEVDMFx1NEU0OFx1N0M3Qlx1NzY4NFx1NjcwRFx1NTJBMVx1NTY2OFx1NTMzOVx1OTE0RFxyXG4gICAgICB9LFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBdVIsU0FBUyxvQkFBb0I7QUFDcFQsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sWUFBWTtBQUNuQixTQUFTLGVBQWU7QUFFeEIsU0FBUyxZQUFZLEtBQUs7QUFDeEIsU0FBTyxRQUFRLFFBQVEsSUFBSSxHQUFHLEtBQUssR0FBRztBQUN4QztBQUVBLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO0FBQUEsRUFDekIsU0FBUztBQUFBO0FBQUEsRUFFVDtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBO0FBQUEsTUFFYixVQUFVLENBQUMsT0FBTyxrQkFBa0IsU0FBUyxhQUFhLE9BQU87QUFBQSxNQUNqRSxRQUFRO0FBQUE7QUFBQSxRQUVOLFNBQVM7QUFBQSxVQUNQLEtBQUs7QUFBQSxRQUNQO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLEtBQUs7QUFBQSxNQUNILE9BQU87QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLFVBQVUsQ0FBQyxXQUFXLGNBQWMsTUFBTTtBQUFBLElBQzVDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0w7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLGFBQWE7QUFBQSxNQUNmO0FBQUE7QUFBQSxNQUVBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixhQUFhLFlBQVksU0FBUyxJQUFJO0FBQUEsTUFDeEM7QUFBQTtBQUFBLE1BRUE7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLGFBQWEsWUFBWSxPQUFPLElBQUk7QUFBQSxNQUN0QztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFFQSxRQUFRO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFJTixPQUFPO0FBQUE7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQSxRQUNOLFFBQVE7QUFBQTtBQUFBLFFBQ1IsY0FBYztBQUFBO0FBQUEsUUFDZCxTQUFTLENBQUMsU0FBUyxLQUFLLFFBQVEsVUFBVSxFQUFFO0FBQUE7QUFBQSxNQUM5QztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRUYsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
