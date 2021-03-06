// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
// import axios from 'axios'
import store from './store/'
// import ElementUI from 'element-ui'
import './assets/css/common.css'
import 'element-ui/lib/theme-chalk/index.css'
// import upperFirst from 'lodash/upperFirst'
// import camelCase from 'lodash/camelCase'
import '@/admin/ant_design_components'
import '@/admin/element_ui_components'
import 'ant-design-vue/dist/antd.css'
import {postRequest, postKeyValueRequest, putRequest, deleteRequest, getRequest} from './utils/http'

// const Vue = require('vue')

Vue.prototype.postRequest = postRequest
Vue.prototype.postKeyValueRequest = postKeyValueRequest
Vue.prototype.putRequest = putRequest
Vue.prototype.deleteRequest = deleteRequest
Vue.prototype.getRequest = getRequest

// const requireComponent = require.context(
//   // 其组件目录的相对路径
//   './components',
//   // 是否查询其子目录
//   false,
//   // 匹配基础组件文件名的正则表达式
//   /Common[A-Z]\w+\.(vue|js)$/
// )
// requireComponent.keys().forEach(fileName => {
//   // 获取组件配置
//   const componentConfig = requireComponent(fileName)
//
//   // 获取组件的 PascalCase 命名
//   const componentName = upperFirst(
//     camelCase(
//       // 获取和目录深度无关的文件名
//       fileName
//         .split('/')
//         .pop()
//         .replace(/\.\w+$/, '')
//     )
//   )
//   // 全局注册组件
//   Vue.component(
//     componentName,
//     // 如果这个组件选项是通过 `export default` 导出的，
//     // 那么就会优先使用 `.default`，
//     // 否则回退到使用模块的根。
//     componentConfig.default || componentConfig
//   )
// })
Vue.config.productionTip = false
// Vue.use(ElementUI)

// Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  router,
  store,
  components: {App},
  template: '<App/>'
}).$mount('#app')
