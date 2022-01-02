import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import './assets/css/common.css'
import 'element-ui/lib/theme-chalk/index.css'
import '@/components/element/element_ui_components'
import {postRequest, putRequest, deleteRequest, getRequest} from './utils/http'

Vue.prototype.postRequest = postRequest
Vue.prototype.putRequest = putRequest
Vue.prototype.deleteRequest = deleteRequest
Vue.prototype.getRequest = getRequest

Vue.config.productionTip = false

new Vue({
  router,
  store,
  components: {App},
  template: '<App/>'
}).$mount('#app')
