import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from "element-plus";
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

let app = createApp(App);

// document.body.style.setProperty('')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app
    .use(store)
    .use(router)
    .use(ElementPlus)
    .mount('#app')
