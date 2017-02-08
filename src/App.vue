<template>
  <div id="app">
    <!-- 头部 -->
    <header class="app-header" v-show="showHeadAndFoot">
      <div class="_effect" :class="{'_effect--50':decline}">
        <index-header style="overflow:visible;"></index-header>
      </div>
    </header>
    <!-- 内容 -->
    <section class="app-content " v-show="'!welcome'">
      <!-- index router -->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </section>
    <!-- 底部导航 -->
    <footer class="app-footer _line-fine" v-show="showHeadAndFoot">
      <div class="_effect" :class="{'_effect--50':decline}">
        <index-nav></index-nav>
      </div>
    </footer>
    <!--欢迎页-->
    <section v-if="welcome" class="welcome" transition="welcome"></section>
  </div>
</template>

<script>
  import {I18N, querySingle, insertData} from 'assets/js/dbUtils'
  import {mapActions, mapGetters} from 'vuex'
  import indexNav from 'components/index-nav.vue'
  import indexHeader from 'components/index-header.vue'

  require('assets/css/common.scss')
  require('assets/css/base.scss')

  let config = require('../config')
  let env = process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
  console.log(env)

  export default {
    name: 'app',
    data () {
      return {
        welcome: true,
        decline: false // router animation
      }
    },
    computed: {
      ...mapGetters(['showHeadAndFoot'])
    },
    methods: {
      ...mapActions(['setShowHeadAndFoot']),
      loadLangEnd: function (data) {
        window.Vue.locale(data.lang, data)
        window.Vue.config.lang = data.lang
        this.welcome = false
      }
    },
    components: {
      indexNav,
      indexHeader
    },
    created () {
      this.setShowHeadAndFoot(false)
      const appVue = this
      this.$on('route-pipe', _decline => {
        console.log('>>>> route-pipe: ' + _decline)
        this.decline = _decline
      })
      // 检查语言包
      const lang = 'chn.json'
      window.$.ajax({
        type: 'get',
        url: env + 'static/i18n/version.json',
        success: function (version) {
          // 获取版本信息
          querySingle(I18N, lang, function (dataLocal) {
            if (dataLocal && dataLocal.version === version[lang]) {
              appVue.loadLangEnd(dataLocal)
            } else {
              window.$.ajax({
                type: 'get',
                url: env + 'static/i18n/' + lang,
                success: function (data) {
                  console.log(data)
                  appVue.loadLangEnd(data)
                  // 缓存语言包
                  data.lang = lang
                  insertData(I18N, data)
                }
              })
            }
          })
        }
      })
    }
  }
</script>

<style scoped>
  .welcome {
    width: 100%;
    height: 100%;
    z-index: 1000;
    position: fixed;
    left: 0;
    top: 0;
    transition: 2.25s all linear;
    background: url(./assets/images/loading.jpg) no-repeat center center;
    background-size: cover;
  }

  .welcome-leave {
    opacity: 0;
  }
</style>
