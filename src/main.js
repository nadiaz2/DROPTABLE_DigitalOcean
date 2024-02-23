import { createApp } from 'vue';
import App from './App.vue';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';  // Ensure to import Vuetify styles
import router from "./router";
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import { registerSW } from 'virtual:pwa-register';

console.log('1')
const app = createApp(App);

const updateSW = registerSW({
    onNeedRefresh() {},
    onOfflineReady() {},
  });

const vuetify = createVuetify(); // Initialize Vuetify
console.log('2')
app.use(vuetify);
app.use(router)
console.log('3')
app.mount('#app');
console.log('4')
