import Vue from 'vue'
// 路由
import VueRouter from 'vue-router'
import {configRouter} from './route-config.js'
// 状态
import store from './store'
// 同步库
import {sync} from 'vuex-router-sync'
// 网络请求
import zepto from 'webpack-zepto'
// 国际化
import VueI18n from 'vue-i18n'
// 手势插件
import VueTouch from 'vue-touch'
// 处理点击事件
import fastclick from 'fastclick'
// 首页
import App from './App.vue'

Vue.config.devtools = true
window.$ = zepto
window.Vue = Vue
// plugins
Vue.use(VueI18n)
Vue.use(VueRouter)
Vue.use(VueTouch)
// 路由设置
let router = configRouter(VueRouter)
// 状态和路由绑定
sync(store, router)
// 点击事件处理
fastclick.attach(document.body)
// 启动路由
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: {App},
  router
}).$mount('#app')
