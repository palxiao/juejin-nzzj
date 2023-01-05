/*
 * @Author: ShawnPhang
 * @Date: 2022-12-30 22:03:49
 * @Description:
 * @LastEditors: ShawnPhang <site: book.palxp.com>
 * @LastEditTime: 2023-01-05 20:24:54
 */
import { createApp } from 'vue'
import 'normalize.css'
import './assets/styles/index.css'
import App from './App.vue'
import { createPinia } from 'pinia'

const pinia = createPinia()
createApp(App).use(pinia).mount('#app')
