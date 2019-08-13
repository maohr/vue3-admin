import Vue from 'vue'
import App from './App.vue'
import {plugin} from "vue-function-api";
import router from './router'
import './plugins/element.ts'
import "@/assets/styles/index.scss";

import VSpacer from "@/components/VSpacer/index.vue";
Vue.component("v-spacer", VSpacer);

Vue.config.productionTip = false;

Vue.use(plugin);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
