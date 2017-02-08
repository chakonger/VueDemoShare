/**
 * Created by lvshicheng on 2016/11/23.
 */
import Http from './HttpWrapper'
import {addDate} from 'utils'
import {USER_ID} from 'assets/js/constants'
import {insertData, clearAll, queryAllObject, DEVICE, LastInfraRecode} from 'assets/js/dbUtils'

export default {
  /**
   * request device list.
   * */
  getDevices (cb) {
    const params = {cmd: 'A0A0'}
    Http.$post(params,
      function (data) {
        let devices
        if (data.familyInfo && (devices = data.familyInfo[0].device)) {
          // save devices to local storage.
          let result = remakeDevices(devices)
          clearAll(DEVICE)
          insertData(DEVICE, result)
          // save device infra record.
          remakeLastInfra(result)
          // callback
          cb(result)
        } else {
          cb([])
        }
      }, function () {

      })
  },
  /**
   * request power info of 7 days for specified device.
   * */
  getPowerList (deviceIds, cb) {
    const params = {}
    params.cmd = 'D8A0'
    params.start = addDate(-7, 'yyyyMMdd')
    params.end = addDate(-1, 'yyyyMMdd')
    params.list = deviceIds
    Http.$post(params,
      function (response) {
        let devCurrInfo = response.devCurrInfo
        if (devCurrInfo && devCurrInfo.length !== 0) {
          cb(remakePowerData(devCurrInfo))
        } else {
          cb([])
        }
      }, function () {
      }
    )
  },
  /**
   * request weather of today by location.
   * */
  getWeather (devID) {
    const params = {}
    params.cmd = 'A9A0'
    params.get = 'weather'
    params.area = ''
    params.city = ''
    params.devID = devID
    params.wifiMac = ''
    Http.$post(params, response => {
      console.log('>>>>> getWeather response <<<<<')
      console.log(response)
    })
  },
  /**
   * request control panel for the specified device.
   * */
  getControlPanel (devID, infraTypeID, infraName, cb) {
    const params = {}
    params.cmd = 'A9A0'
    params.get = 'infraTypeConfig'
    params.area = ''
    params.city = ''
    params.devID = devID
    params.wifiMac = ''
    params.infraName = infraName
    params.infraTypeID = infraTypeID
    Http.$post(params, response => {
      console.log('>>>>> getControlPanel response <<<<<')
      console.log(response)
      let newPanelConfig = {}
      const panelConfig = response.infraTypeConfig
      if (panelConfig) {
        const keySet = panelConfig.keysSet
        const keyRow = panelConfig.keyRow
        const keyCol = panelConfig.keyCol

        let newKeySet = []
        for (let i = 0; i < keyRow; i++) {
          for (let j = 0; j < keyCol; j++) {
            const key = keySet[(i + 1) + '' + (j + 1)]
            if (key) {
              newKeySet.push(key)
            } else {
              newKeySet.push({})
            }
          }
        }
        newPanelConfig.keySet = newKeySet
        newPanelConfig.infraTypeID = newPanelConfig._id
        newPanelConfig.logoSet = panelConfig.logSet
        newPanelConfig.dirURL = panelConfig.dirURL
        newPanelConfig.panelType = panelConfig.panelType
      }
      !!cb && cb(newPanelConfig)
    })
  },
  /**
   * request all panels status for the specified device.
   * */
  getPanelStatus (devID) {
    const params = {}
    params.cmd = 'D8A0'
    params.return = 'DevStatus'
    params.devID = devID
    Http.$post(params, response => {
      console.log('>>>>> getPanelStatus response <<<<<')
      console.log(response)
    })
  }
}

/**
 * 重组电量信息
 * */
const remakePowerData = function (devCurrInfo) {
  // 转化为图标能够解析的结构
  let chartDataList = []
  // 计算显示的日期
  const dates = []
  for (let i = 0; i < 7; i++) {
    dates[i] = addDate(i - 7, 'MM/dd')
  }
  window.$.each(devCurrInfo, (index, item) => {
    const temp = {
      chartData: {
        labels: dates,
        datasets: [{
          label: '',
          backgroundColor: '#f87979',
          data: item.historyPower
        }]
      },
      options: {
        title: {
          display: true,
          text: item.devID,
          position: 'top'
        },
        legend: {
          display: false
        },
        maintainAspectRatio: false
      }
    }
    chartDataList.push(temp)
  })
  return chartDataList
}

/**
 * Remake device info. Because some of them are unuseful.
 * */
const remakeDevices = function (devices) {
  let devContainer = []
  // 保存设备信息到据库,不过需要重新筛选一遍，太乱了
  window.$.each(devices, (index, device) => {
    const temp = {
      uniteDevices: device.uniteDevices,
      devStatus: device.DevStatus,
      devName: device.devName,
      devID: device.devID,
      devTypeID: device.devTypeID,
      uid: window.localStorage.getItem(USER_ID)
    }
    devContainer.push(temp)
  })
  return devContainer
}

/**
 * remake last infra record and save.
 * */
const remakeLastInfra = function (devices) {
  // save last used infra recode.
  // devID, devTypeID, infraTypeID
  // 如果一个设备下面同一种类型有多个，就需要比较红外类型
  queryAllObject(LastInfraRecode, 'uidIndex', window.localStorage.getItem(USER_ID), recordsFromDB => {
    let records = []
    window.$.each(devices, (index, device) => {
      let recordResult
      if (!window.$.isEmptyObject(recordsFromDB)) {
        recordResult = recordsFromDB[device.devID]
      }
      // if record is null, remake the record.
      if (window.$.isEmptyObject(recordResult)) {
        let uniteDevice = (device.uniteDevices)[0]
        recordResult = {
          uid: window.localStorage.getItem(USER_ID),
          devID: device.devID,
          devTypeID: uniteDevice.devTypeID,
          infraTypeID: uniteDevice.infraTypeID
        }
      }
      records.push(recordResult)
      // save
      clearAll(LastInfraRecode)
      insertData(LastInfraRecode, records)
    })
  })
}
