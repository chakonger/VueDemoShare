/**
 * Created by lvshicheng on 2016/11/28.
 */
(function () {
  const isEmptyObject = function (e) {
    let t
    for (t in e) {
      return !1
    }
    return !0
  }

  if (window.$) {
    window.$.isEmptyObject = isEmptyObject
  }
})()
