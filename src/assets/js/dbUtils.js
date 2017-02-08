/**
 * Created by lvshicheng on 2016/11/3.
 */
// ======================= 数据库相关操作 Indexed Database
/**
 * nosql 数据库
 *
 * 1. 数据会自动覆盖
 *
 * */

// indexdb name
export const DEVICE = 'devices'
export const I18N = 'i18n'
// Record the last used infrared.
export const LastInfraRecode = 'infra_recode'

const openDB = function (storeName, callback) {
  let version = 1
  let dbName = 'ckr'
  // 保存数据库
  let indexdb = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
  window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction
  window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange
  if (indexdb) {
    // 1. open 数据库
    let openRequest = indexdb.open(dbName, version)
    openRequest.onupgradeneeded = function (e) {
      let thisDB = e.target.result
      // 2. 创建表
      if (!thisDB.objectStoreNames.contains(DEVICE)) {
        // 创建用户设备相关的表
        let objectStore = thisDB.createObjectStore(DEVICE, {keyPath: 'devID'})
        // param1- 索引名称
        // param2- 索引属性字段名
        // param3- 索引属性值是否唯一
        objectStore.createIndex('uidIndex', 'uid', {unique: false})
        objectStore.createIndex('devStatusIndex', 'devStatus', {unique: false})
      }
      if (!thisDB.objectStoreNames.contains(I18N)) {
        let keyPath = {keyPath: 'lang'} // 创建国家化相关的表
        thisDB.createObjectStore(I18N, keyPath)
      }
      if (!thisDB.objectStoreNames.contains(LastInfraRecode)) {
        let objectStore = thisDB.createObjectStore(LastInfraRecode, {keyPath: 'devID'})
        objectStore.createIndex('uidIndex', 'uid', {unique: false})
      }
    }
    openRequest.onsuccess = function (e) {
      // console.log('open success!')
      let db = e.target.result
      callback(db)
    }
    openRequest.onerror = function (e) {
      console.log('open error!')
      console.dir(e)
    }
  }
}

// const closeDB = function (db) {
//   db.close()
// }
//
// const deleteDB = function (db, name) {
//   window.indexedDB.deleteDatabase(name)
// }

/**
 * 插入数据
 * @param data maybe obj or array
 * */
const insertData = function (storeName, data) {
  openDB(storeName, function (db) {
    let transaction = db.transaction(storeName, 'readwrite')
    let store = transaction.objectStore(storeName)
    if (window.$.isPlainObject(data)) {
      // console.log('insert Object')
      store.put(data)
    } else if (window.$.isArray(data)) {
      window.$.each(data, (index, single) => {
        // console.log('insert Array')
        store.put(single)
      })
    }
  })
}

/**
 * 查询单个数据
 * */
const querySingle = function (storeName, value, callback) {
  openDB(storeName, function (db) {
    let transaction = db.transaction(storeName, 'readwrite')
    let store = transaction.objectStore(storeName)
    // console.log('querySingle')
    // console.log(storeName)
    // console.log(value)
    let request = store.get(value)
    request.onsuccess = function (e) {
      let single = e.target.result
      callback(single)
    }
  })
}

/**
 * 根据KeyGenerator获取数据，且key不唯一
 *
 * @param storeName 表名
 * @param value 指定检索的key值
 * @param callback 回调
 * */
const queryAll = function (storeName, indexName, value, callback) {
  openDB(storeName, function (db) {
    let result = []
    let transaction = db.transaction(storeName, 'readwrite')
    let objectStore = transaction.objectStore(storeName)
    let index = objectStore.index(indexName)
    let singleKeyRange = window.IDBKeyRange.only(value) // 指定游标范围
    index.openCursor(singleKeyRange).onsuccess = function (event) {
      let cursor = event.target.result
      if (cursor) {
        result.push(cursor.value)
        cursor.continue()
      } else {
        callback(result)
      }
    }
  })
}

/**
 *
 * */
const queryAllObject = function (storeName, indexName, value, callback) {
  openDB(storeName, function (db) {
    let result = {}
    let transaction = db.transaction(storeName, 'readwrite')
    let objectStore = transaction.objectStore(storeName)
    let index = objectStore.index(indexName)
    let singleKeyRange = window.IDBKeyRange.only(value) // 指定游标范围
    index.openCursor(singleKeyRange).onsuccess = function (event) {
      let cursor = event.target.result
      if (cursor) {
        result[cursor.primaryKey] = cursor.value
        cursor.continue()
      } else {
        callback(result)
      }
    }
  })
}

/**
 * clear all data of the store you point.
 * */
const clearAll = function (storeName, callback) {
  openDB(storeName, db => {
    let mIDBRequest = db.transaction(storeName, 'readwrite')
      .objectStore(storeName)
      .openCursor()
    mIDBRequest.onsuccess = event => {
      let cursor = event.target.result
      if (cursor) {
        cursor.delete()
      }
    }
  })
}

exports.insertData = insertData
exports.querySingle = querySingle
exports.queryAll = queryAll
exports.queryAllObject = queryAllObject
exports.clearAll = clearAll
// exports.deleteDB = deleteDB
// exports.closeDB = closeDB
