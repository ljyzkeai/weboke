import 'highlight.js/styles/atom-one-dark.css'
import 'highlight.js/lib/common'
import "@fancyapps/ui/dist/fancybox.css";
import 'element-plus/dist/index.css'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import router from './router'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import { Fancybox, Carousel, Panzoom } from "@fancyapps/ui";//图片放大
import common from '@/utils/common.js'; //全局按钮防抖事件
import lazy from '@/utils/lazy';
import { createPinia } from 'pinia'
import lzyIcon from '@/components/icon.vue';
import FontAwesomeIcon from '@/assets/IconFont/fortawesome';
import VueMarkdownEditor from '@/utils/markDownCreate';

const pinia = createPinia()
const app = createApp(App)
app.config.globalProperties.$common = common

app.config.globalProperties.$fancyapps = { Fancybox, }
app.directive('lazy', lazy)
app.component('lzyIcon', lzyIcon)
app.component('FontAwesomeIcon', FontAwesomeIcon)
app.use(ElementPlus)
app.use(hljsVuePlugin)
app.use(router)
app.use(pinia)
app.use(VueMarkdownEditor);

//element图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')