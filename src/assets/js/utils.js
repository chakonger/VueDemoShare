'use strict'

const CONST_MAXSALTLEN = 128
const anSaltList = [21, 32, 43, 54, 235, 226, 17,
  28, 49, 110, 211, 112, 213, 114, 15, 216, 117, 18,
  219, 120, 221, 222,
  23, 124, 225, 126, 227, 128, 129, 130, 231, 232,
  212, 217, 143, 54, 35,
  26, 117, 128, 149, 10, 21, 132, 243, 141, 151, 213,
  173, 181, 23, 124,
  213, 39, 112, 51, 211, 77, 27, 18, 29, 138, 233,
  23, 2121, 3332, 1243,
  254, 2235, 2261, 1712, 2118, 4129, 1110, 6211,
  1112, 2134, 1114, 1215,
  27716, 12117, 1218, 2119, 1200, 2121, 8222, 823,
  9124, 1225, 11126,
  2227, 3128, 4129, 1530, 4231, 1232, 2212, 7217,
  8143, 5477, 3665, 2886,
  1717, 1288, 1469, 6510, 5521, 1532, 5243, 1341,
  9151, 5213, 1473, 1481,
  2453, 14524, 4213, 44539, 6112, 7451, 3211, 7777,
  3327, 18, 329, 1338,
  2333, 323
]

// 获取五位随机数 01001->65534
const getSeed = function () {
  let max = 65534
  let min = 1001
  if (max == null) {
    max = min
    min = 0
  }
  let num = min + Math.floor(Math.random() * (max - min + 1))
  return num < 10000 ? '0' + num.toString() : num.toString()
}

/**
 * 获取校验码
 *
 * @param cmd
 * @param dateStr
 * @param userId
 * @param bssid
 * @param seed
 * */
const checkSeed = function () {
  if (arguments && arguments.length === 5) {
    var args = [].slice.call(arguments)

    var temp = []
    for (var i = 0; i < 4; i++) {
      if (i === 0) {
        temp[i] = args[i].charAt(1)
      } else if (i === 3) {
        if (args[i].length > 0) {
          temp[i] = args[i].charAt(args[i].length - 1)
        } else {
          temp[i] = args[i + 1].charAt(args[i].length - 1)
        }
      } else {
        temp[i] = args[i].charAt(args[i].length - 1)
      }
    }
    var strOut = encodeWithSeed(temp, args[4])
    return strOut.join('')
  } else {
    return ''
  }
}

// 根据输入的字符串返回另一个经过运算的字符串
const encodeWithSeed = function (strIn, seed) {
  var i, m, nLen
  let j = 0
  let k = 0
  let nSaltLen = CONST_MAXSALTLEN
  var nT1, nAscII, nXorSeed, nSalt
  var strT = []
  var anSeedList = []
  var strOut = []

  anSeedList[0] = (seed >> 8) & 0xFF
  anSeedList[1] = seed & 0xFF

  nLen = strIn.length
  m = seed % nSaltLen
  for (i = 0; i < nLen; i++) {
    nAscII = strIn[i].charCodeAt(0)
    nSalt = anSaltList[m] & 0xFF
    nXorSeed = anSeedList[j] ^ nSalt
    nT1 = nAscII ^ nXorSeed

    // 十进制转16进制
    // strT = sprintf("%02x", nT1);
    strT = parseInt(nT1, 10).toString(16)
    if (strT.length < 2) {
      strT = '0' + strT
    }
    strOut[k] = strT[0]
    strOut[k + 1] = strT[1]
    // strOut[k + 2] = 0;
    k += 2
    j++
    if (j >= 2) {
      j = 0
    }
    m++
    if (m >= nSaltLen) {
      m = 0
    }
  }
  return strOut
}

// 时间格式化方法
const DateFormat = function (date, fmt) {
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'H+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }
  return fmt
}

// 创建请求的公共部分
const makeRequest = function (cmd, sender) {
  var dateTime = DateFormat(new Date(), 'yyyyMMddHHmmss')
  var userID = sender
  var wifiMAC = 'bc:5f:f6:12:0a:bc'
  var seed1 = getSeed()
  var seed2 = checkSeed(cmd, dateTime, userID, wifiMAC, seed1)

  return {
    'userID': userID,
    'seed2': seed2,
    'seed1': seed1,
    'wifiMAC': wifiMAC,
    'DateTime': dateTime,
    'CMD': cmd,
    'sender': userID,
    'IMGroup': ''
  }
}

// 以当前日期为标准，增加指定天数
const addDate = function (days, formatter) {
  let date = new Date()
  date.setDate(date.getDate() + days)
  return DateFormat(date, formatter)
}

const parseStatus = function (status) {
  var result = []
  if (status === 'A002') {
    result[0] = 'off'
    result[1] = 'icon/logo/chazuo_r.png'
  } else if (status === 'A003') {
    result[0] = 'onl'
    result[1] = 'icon/logo/chazuo_b.png'
  } else if (status === 'A004') {
    result[0] = 'act'
    result[1] = 'icon/logo/chazuo_g.png'
  } else {
    result[0] = 'off'
    result[1] = 'icon/logo/chazuo_r.png'
  }
  return result
}

// 获取校验码
exports.checkSeed = checkSeed
// 获取5位随机数
exports.getSeed = getSeed
// 统一组装请求公共部分
exports.makeRequestObj = makeRequest
// addDate(-1, 'yyyyMMdd') -> 按指定格式返回昨天日期
exports.addDate = addDate
// 解析设备状态
exports.parseStatus = parseStatus

