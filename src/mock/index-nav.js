/**
 * Created by lvshicheng on 2016/11/22.
 *
 * 底部导航配置数据
 */
// index-nav
module.exports = [{
  index: 0,
  path: {
    path: '/chat'
  },
  hint: {type: 'count', count: 2}, // count,dot
  iconClass: 'icon-wechat',
  text: 'homepage.chat'
}, {
  index: 1,
  path: {
    path: '/devices'
  },
  hint: {type: 'count', count: 0},
  iconClass: 'icon-list',
  text: 'homepage.list'
}, {
  index: 2,
  path: {
    path: '/power'
  },
  hint: {type: 'dot', count: 0},
  iconClass: 'icon-power',
  text: 'homepage.power'
}, {
  index: 3,
  path: {
    path: '/me'
  },
  hint: {type: null, count: 0},
  iconClass: 'icon-me',
  text: 'homepage.me'
}]

