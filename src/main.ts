import { createApp } from 'vue'
import './assets/styles/index.css'
import App from './App.vue'
import { createPinia } from 'pinia'

const pinia = createPinia()
createApp(App).use(pinia).mount('#app')
