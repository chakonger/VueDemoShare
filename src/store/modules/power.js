/**
 * Created by lvshicheng on 2016/11/24.
 */
import * as types from '../mutation-types'
const state = {
  deviceIds: [], // {return:'', devID:'', devName:''} 用于电量列表请求
  powerList: []
}

const mutations = {
  [types.REFRESH_DEVICE_IDS] (state, deviceIds) {
    state.deviceIds = deviceIds
  },
  [types.REFRESH_POWER_LIST] (state, powerList) {
    state.powerList = powerList
  }
}

export default {
  state,
  mutations
}
