import { createApp } from 'vue'

import App from './App.vue'

// @ts-expect-error css
import './main.css'
// @ts-expect-error css
import 'virtual:uno.css'

const app = createApp(App)

app.mount('#app')
