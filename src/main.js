import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import { ElMessage } from 'element-plus'
import 'element-plus/dist/index.css'
import 'animate.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

import './styles/main.css'
import './styles/reset.css'

import './assets/fonts/iconfont.css'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPersist) // 相当于vuex持久化存储

app.use(ElementPlus)
app.use(pinia)

app.config.globalProperties.$message = ElMessage

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

app.mount('#app') 
