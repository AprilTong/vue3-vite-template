import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// 自动导入vue-api、组件
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// 支持jsx语法
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
            imports: ['vue', 'vue-router', 'vuex', 'vue-i18n'],
            eslintrc: {
                enabled: false, // 默认false, true启用。生成一次就可以，避免每次工程启动都生成
                filepath: '.eslintrc-auto-import.json', // 生成json文件
                globalsPropValue: true,
            },
        }),
        Components({
            include: [/\.vue$/, /\.vue\?vue/, /\.md$/, /\.tsx$/],
            exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
        }),
    ],
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
