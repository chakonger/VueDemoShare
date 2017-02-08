/**
 * Created by lvshicheng on 2016/11/22.
 *
 * 修改指定状态
 */
import devicesApi from '../apis/DeviceApi'
import * as types from './mutation-types'
// 设备列表页
export const getDevices = ({commit}) => {
  devicesApi.getDevices(devices => {
    commit(types.REFRESH_DEVICES, devices)
    // 同步设备ID列表
    let list = []
    devices.forEach(function (dev) {
      list.push({
        'return': 'historyPower',
        'devID': dev.devID,
        'devName': dev.devName
      })
    })
    commit(types.REFRESH_DEVICE_IDS, list)
  })
}

export const getPowerList = ({commit}, deviceIds) => {
  devicesApi.getPowerList(deviceIds, powerList => {
    commit(types.REFRESH_POWER_LIST, powerList)
  })
}

export const getWeather = ({commit}, devID) => {
  devicesApi.getWeather(devID, weather => {
  })
}

export const getControlPanel = ({commit}, {devID, infraTypeID, infraName}) => {
  devicesApi.getControlPanel(devID, infraTypeID, infraName, panelConfig => {
  })
}

export const getPanelStatus = ({commit}, devID) => {
  devicesApi.getPanelStatus(devID, panelStatus => {
  })
}
