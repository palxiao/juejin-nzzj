/*
 * @Author: ShawnPhang
 * @Date: 2022-12-30 22:03:49
 * @Description:
 * @LastEditors: ShawnPhang <site: book.palxp.com>
 * @LastEditTime: 2023-01-05 20:32:34
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
const resolve = (...data: string[]) => path.resolve(__dirname, ...data)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve('src'),
    },
  },
  define: {
    'process.env': process.env,
  },
})
