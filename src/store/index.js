/**
 * 可以看做是仓库
 * */
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

// 基本通用
import base from './modules/base'
import device from './modules/device'
import power from './modules/power'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  modules: {base, device, power},
  strict: debug
})
