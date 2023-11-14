import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import NhsukFrontendVue from 'nhsuk-frontend-vue';
import 'nhsuk-frontend-vue/nhsuk-frontend-vue.css';

const app = createApp(App);
app.use(NhsukFrontendVue);

app.use(createPinia())
app.use(router)

app.mount('#app')
