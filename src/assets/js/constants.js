/**
 * Created by lvshicheng on 2016/11/22.
 *
 * - All the constant are defined there.
 */
/***************************
 * CONSTANT FIELDS
 ***************************/
export const TOKEN = 'token'
export const USER_ID = 'uid'
export let DEFAULT_SERVER = 'http://ss2.chakonger.net.cn/'
/***************************
 * METHODS
 ***************************/
// 修改服务器
const changeServer = function (newServer) {
  DEFAULT_SERVER = newServer
}
exports.changeServer = changeServer
