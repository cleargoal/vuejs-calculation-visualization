import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()
import './assets/main.css'

app.use(pinia)
app.mount('#app')
