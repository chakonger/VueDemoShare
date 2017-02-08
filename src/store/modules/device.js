import * as types from '../mutation-types'
import {querySingle, DEVICE} from 'assets/js/dbUtils'

const state = {
  devices: [], // 设备列表
  devicesRefreshTime: null,  // 设备列表更新的时间
  currentDevice: null // 当前访问的设备
}

const actions = {
  clearDevices: ({commit}) => {
    commit(types.REFRESH_DEVICES, [])
  },
  queryCurrentDevice: ({commit}, {devID, cb}) => {
    querySingle(DEVICE, devID, device => {
      commit(types.CURRENT_DEVICE, device)
      !!cb && cb(device)
    })
  }
}

const getters = {
  currentDevice: state => state.currentDevice
}

const mutations = {
  [types.REFRESH_DEVICES] (state, devices) {
    state.devices = devices
    state.devicesRefreshTime = new Date().valueOf()
  },
  [types.CURRENT_DEVICE] (state, currentDevice) {
    state.currentDevice = currentDevice
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
