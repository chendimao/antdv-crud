// vite.config.js
import { defineConfig } from "file:///D:/phpStudy/WWW/antdv-form-design/node_modules/.pnpm/vite@5.4.11_less@4.2.1/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/phpStudy/WWW/antdv-form-design/node_modules/.pnpm/@vitejs+plugin-vue@5.2.1_vite@5.4.11_less@4.2.1__vue@3.5.13_typescript@5.7.2_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///D:/phpStudy/WWW/antdv-form-design/node_modules/.pnpm/@vitejs+plugin-vue-jsx@4.1.1_vite@5.4.11_less@4.2.1__vue@3.5.13_typescript@5.7.2_/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import { resolve } from "path";
function pathResolve(dir) {
  return resolve(process.cwd(), ".", dir);
}
var vite_config_default = defineConfig({
  plugins: [vue(), vueJsx()],
  esbuild: {
    drop: process.env.NODE_ENV !== "development" ? ["console", "debugger"] : []
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
    },
    sourcemap: true
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxwaHBTdHVkeVxcXFxXV1dcXFxcYW50ZHYtZm9ybS1kZXNpZ25cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHBocFN0dWR5XFxcXFdXV1xcXFxhbnRkdi1mb3JtLWRlc2lnblxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovcGhwU3R1ZHkvV1dXL2FudGR2LWZvcm0tZGVzaWduL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCB2dWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCdcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnO1xyXG5cclxuZnVuY3Rpb24gcGF0aFJlc29sdmUoZGlyKSB7XHJcbiAgcmV0dXJuIHJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJy4nLCBkaXIpO1xyXG59XHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW3Z1ZSgpLCB2dWVKc3goKV0sXHJcbiAgZXNidWlsZDoge1xyXG4gICAgIGRyb3A6IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSdkZXZlbG9wbWVudCcgPyBbXCJjb25zb2xlXCIsIFwiZGVidWdnZXJcIl0gOiBbXSxcclxuICB9LFxyXG4gIGJ1aWxkOiB7XHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIC8vIFx1OEJGN1x1Nzg2RVx1NEZERFx1NTkxNlx1OTBFOFx1NTMxNlx1OTBBM1x1NEU5Qlx1NEY2MFx1NzY4NFx1NUU5M1x1NEUyRFx1NEUwRFx1OTcwMFx1ODk4MVx1NzY4NFx1NEY5RFx1OEQ1NlxyXG4gICAgICBleHRlcm5hbDogWyd2dWUnLCAnYW50LWRlc2lnbi12dWUnLCAnYXhpb3MnLCAndnhlLXRhYmxlJywgJ2RheWpzJ10sXHJcbiAgICAgIG91dHB1dDoge1xyXG4gICAgICAgIC8vIFx1NTcyOCBVTUQgXHU2Nzg0XHU1RUZBXHU2QTIxXHU1RjBGXHU0RTBCXHU0RTNBXHU4RkQ5XHU0RTlCXHU1OTE2XHU5MEU4XHU1MzE2XHU3Njg0XHU0RjlEXHU4RDU2XHU2M0QwXHU0RjlCXHU0RTAwXHU0RTJBXHU1MTY4XHU1QzQwXHU1M0Q4XHU5MUNGXHJcbiAgICAgICAgZ2xvYmFsczoge1xyXG4gICAgICAgICAgdnVlOiAndnVlJyxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIGxpYjoge1xyXG4gICAgICBlbnRyeTogJ3BhY2thZ2UvaW5kZXguanMnLFxyXG4gICAgICBuYW1lOiAnYW50ZHYtY3J1ZCcsXHJcbiAgICAgIGZpbGVOYW1lOiAoZm9ybWF0KSA9PiBgYW50ZHYtY3J1ZC4ke2Zvcm1hdH0uanNgLFxyXG4gICAgfSxcclxuICAgIHNvdXJjZW1hcDogdHJ1ZSxcclxuICB9LFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiBbXHJcbiAgICAgIHtcclxuICAgICAgICBmaW5kOiAndnVlLWkxOG4nLFxyXG4gICAgICAgIHJlcGxhY2VtZW50OiAndnVlLWkxOG4vZGlzdC92dWUtaTE4bi5janMuanMnLFxyXG4gICAgICB9LFxyXG4gICAgICAvLyAvQC94eHh4ID0+IHNyYy94eHh4XHJcbiAgICAgIHtcclxuICAgICAgICBmaW5kOiAvXFwvQFxcLy8sXHJcbiAgICAgICAgcmVwbGFjZW1lbnQ6IHBhdGhSZXNvbHZlKCdwYWNrYWdlJykgKyAnLycsXHJcbiAgICAgIH0sXHJcbiAgICAgIC8vIC8jL3h4eHggPT4gdHlwZXMveHh4eFxyXG4gICAgICB7XHJcbiAgICAgICAgZmluZDogL1xcLyNcXC8vLFxyXG4gICAgICAgIHJlcGxhY2VtZW50OiBwYXRoUmVzb2x2ZSgndHlwZXMnKSArICcvJyxcclxuICAgICAgfSxcclxuICAgIF0sXHJcbiAgfSxcclxuXHJcbiAgc2VydmVyOiB7XHJcbiAgICAvLyBcdTlFRDhcdThCQTRcdTYyNTNcdTVGMDBcdTc2ODRcdTdBRUZcdTUzRTNcdTU0OENcdTY3MkNcdTU3MzBcclxuICAgIC8vIGhvc3Q6ICcwLjAuMC4wJyxcclxuICAgIC8vIHBvcnQ6IDgwODAsXHJcbiAgICBodHRwczogZmFsc2UsIC8vIFx1NEUwRFx1NjUyRlx1NjMwMWh0dHBzXHJcbiAgICBwcm94eToge1xyXG4gICAgICAnL2FwaSc6IHtcclxuICAgICAgICB0YXJnZXQ6ICdodHRwOi8vdi5qdWhlLmNuJyxcdC8vIFx1NUI5RVx1OTY0NVx1OEJGN1x1NkM0Mlx1NTczMFx1NTc0MFxyXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSwgLy8gXHU2NjJGXHU1NDI2XHU4REU4XHU1N0RGXHJcbiAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sICcnKSAvLyBcdTVCRjlcdTRFQzBcdTRFNDhcdTdDN0JcdTc2ODRcdTY3MERcdTUyQTFcdTU2NjhcdTUzMzlcdTkxNERcclxuICAgICAgfSxcclxuICAgIH1cclxuICB9XHJcblxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTZSLFNBQVMsb0JBQW9CO0FBQzFULE9BQU8sU0FBUztBQUNoQixPQUFPLFlBQVk7QUFDbkIsU0FBUyxlQUFlO0FBRXhCLFNBQVMsWUFBWSxLQUFLO0FBQ3hCLFNBQU8sUUFBUSxRQUFRLElBQUksR0FBRyxLQUFLLEdBQUc7QUFDeEM7QUFFQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztBQUFBLEVBQ3pCLFNBQVM7QUFBQSxJQUNOLE1BQU0sUUFBUSxJQUFJLGFBQVksZ0JBQWdCLENBQUMsV0FBVyxVQUFVLElBQUksQ0FBQztBQUFBLEVBQzVFO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxlQUFlO0FBQUE7QUFBQSxNQUViLFVBQVUsQ0FBQyxPQUFPLGtCQUFrQixTQUFTLGFBQWEsT0FBTztBQUFBLE1BQ2pFLFFBQVE7QUFBQTtBQUFBLFFBRU4sU0FBUztBQUFBLFVBQ1AsS0FBSztBQUFBLFFBQ1A7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsS0FBSztBQUFBLE1BQ0gsT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sVUFBVSxDQUFDLFdBQVcsY0FBYyxNQUFNO0FBQUEsSUFDNUM7QUFBQSxJQUNBLFdBQVc7QUFBQSxFQUNiO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sYUFBYTtBQUFBLE1BQ2Y7QUFBQTtBQUFBLE1BRUE7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLGFBQWEsWUFBWSxTQUFTLElBQUk7QUFBQSxNQUN4QztBQUFBO0FBQUEsTUFFQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sYUFBYSxZQUFZLE9BQU8sSUFBSTtBQUFBLE1BQ3RDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUVBLFFBQVE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUlOLE9BQU87QUFBQTtBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLFFBQ04sUUFBUTtBQUFBO0FBQUEsUUFDUixjQUFjO0FBQUE7QUFBQSxRQUNkLFNBQVMsQ0FBQyxTQUFTLEtBQUssUUFBUSxVQUFVLEVBQUU7QUFBQTtBQUFBLE1BQzlDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFFRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
