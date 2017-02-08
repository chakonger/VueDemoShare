import {TOKEN} from 'assets/js/constants'

const routes = [
  {
    path: '/', redirect: '/devices'
  },
  {
    path: '/login',
    component: resolve => {
      require(['./views/login.vue'], resolve)
    }
  },
  {
    path: '/devices',
    component: resolve => {
      require(['./views/devices.vue'], resolve)
    },
    children: [{
      path: 'control',
      component: resolve => {
        require(['./views/devices/deviceControl.vue'], resolve)
      },
      children: [{
        path: 'more',
        component: resolve => {
          require(['./views/devices/more.vue'], resolve)
        }
      }]
    }]
  },
  {
    path: '/chat',
    component: resolve => {
      require(['./views/chat.vue'], resolve)
    }
  },
  {
    path: '/power',
    component: resolve => {
      require(['./views/power.vue'], resolve)
    }
  },
  {
    path: '/me',
    component: resolve => {
      require(['./views/me.vue'], resolve)
    },
    children: [
      {
        path: 'settings',
        component: resolve => {
          require(['./views/me/settings.vue'], resolve)
        }
      },
      {
        path: 'shopping/:showTitle',
        component: resolve => {
          require(['./components/iframe.vue'], resolve)
        }
      }
    ]
  },
  {
    path: '*',
    name: '404',
    component: resolve => {
      require(['./views/404.vue'], resolve)
    }
  }
]
const configRouter = function (VueRouter) {
  let router = new VueRouter({
    base: '/ckr/',
    mode: 'history',
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return {x: 0, y: 0}
      }
    },
    routes
  })
  router.beforeEach((to, from, next) => {
    // console.log('--------------------')
    // console.log(to)
    // console.log(from)
    // console.log(next)
    // console.log('--------------------')
    // TODO 这里还可以添加当前路径是否可跳转到下一个路径

    if (!window.localStorage.getItem(TOKEN) && to.path !== '/login') {
      next('/login')
    } else {
      next()
    }
  })
  return router
}
exports.configRouter = configRouter

