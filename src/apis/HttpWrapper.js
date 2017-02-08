/**
 * Created by lvshicheng on 2016/11/24.
 *<p>
 * http request wrapper
 */
import {USER_ID, DEFAULT_SERVER} from 'assets/js/constants'
import {makeRequestObj} from 'utils'
export default {
  $post: function (params, successCallback, errorCallback) {
    const cmd = params.cmd
    const userid = window.localStorage.getItem(USER_ID)
    const body = makeRequestObj(cmd, userid)
    window.$.extend(body, params) // 复制所有的属性
    window.$.ajax({
      type: 'post',
      url: DEFAULT_SERVER + 'pyapp',
      dataType: 'json',
      data: JSON.stringify(body),
      success: function (data) {
        console.log(data.RTN)
        if (data && data.RTN.lastIndexOf('B0') > 0) {
          successCallback(data)
        } else {
          errorCallback()
        }
      },
      error: function (xhr, type) {
        errorCallback()
      }
    })
  }
}
