import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
    plugins: [vue()],
    css: {
        preprocessorOptions: {
            less: {
                modifyVars: {
                    hack: `true; @import (reference) "${resolve('src/assets/css/lessVar.less')}"`,
                },
                javascriptEnabled: true,
            },
        },
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'), // 设置@指向src目录
        },
    },
    base: './',
    server: {
        port: 3000, // 设置服务启动端口
        open: true, // 服务启动时是否自动打开浏览器
        cors: true, // 允许跨域
        // 设置代理，根据我们项目实际情况配置
        // proxy: {
        //   '/api': {
        //     target: 'http://xxx.xxx.xxx.xxx:8000',
        //     changeOrigin: true,
        //     secure: false,
        //     rewrite: (path) => path.replace('/api/', '/')
        //   }
        // }
    },
})
