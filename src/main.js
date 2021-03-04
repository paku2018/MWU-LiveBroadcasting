import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'
import router from './router'
import adapter from "webrtc-adapter";
import store from './store/store'
import Notifications from 'vue-notification'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './assets/css/style.css';
import './assets/css/fonts.css';
import './assets/css/global.css';
import './assets/lib/fontawesome/css/all.css';

Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(Notifications)
Vue.use(VueSweetalert2);
Vue.use(adapter);
export default new Vue({
  router: router,
  store,
  render: h => h(App),
}).$mount('#app')
