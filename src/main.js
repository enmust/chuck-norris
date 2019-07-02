import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import VueIziToast from 'vue-izitoast'
import { vsSwitch, vsIcon } from 'vuesax'

import 'vuesax/dist/vuesax.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'izitoast/dist/css/iziToast.min.css'


Vue.use(BootstrapVue);
Vue.use(VueIziToast);
Vue.use(vsSwitch);
Vue.use(vsIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
