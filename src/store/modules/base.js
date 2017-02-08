/**
 * Created by lvshicheng on 2016/11/22.
 *
 * 子仓库模块
 */
import * as types from '../mutation-types'
// 定义状态值
const state = {
  backPath: '',
  index_nav: [],
  menu_active: {text: '', index: 0, hint: {count: 0}}, // 记录首页被激活的底部导航
  showHeadAndFoot: false, // 显示顶部和底部导航
  iframe_url: '',
  iframe_title: ''
}

const getters = {
  showHeadAndFoot: state => state.showHeadAndFoot,
  indexNav: state => state.index_nav,
  menuActive: state => state.menu_active,
  iframeUrl: state => state.iframe_url,
  irameTitle: state => state.iframe_title
}

const actions = {
  setShowHeadAndFoot: function ({commit}, show) {
    commit(types.SHOW_HEAD_AND_FOOT, show)
  },
  getIndexNav: function ({commit}) {
    let nav = require('mock/index-nav')
    commit(types.SET_MENU, nav)
  },
  setMenuActive: function ({commit}, index) {
    commit(types.SET_MENU_ACTIVE, index)
  },
  setIframeUrl: ({commit}, {url, title, fn}) => {
    commit(types.SET_IFRAME_URL, {url, title})
    !!fn && fn()
  },
  setIframeTitle: ({commit}, title) => {
    commit(types.SET_IFRAME_TITLE, title)
  }
}

// 定义变更动作
let mutations = {
  [types.SET_MENU] (state, indexNav) {
    state.index_nav = indexNav
  },
  [types.SET_MENU_ACTIVE] (state, _index) {
    // 底部导航激活
    state.menu_active = state.index_nav[_index]
  },
  [types.BACK_PATH] (state, _path) {
    // 设置返回按钮跳转路径,router.afterEach设置
    state.backPath = {path: _path}
  },
  [types.SET_CHAT_COUNT] (state, count) {
    state.index_nav[0].hint.count = count
  },
  [types.SHOW_HEAD_AND_FOOT] (state, show) {
    state.showHeadAndFoot = show
  },
  [types.SET_IFRAME_URL] (state, {url, title}) {
    state.iframe_url = url
    state.iframe_title = title
  },
  [types.SET_IFRAME_TITLE] (state, title) {
    state.iframe_title = title
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
