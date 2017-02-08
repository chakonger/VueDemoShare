<template>
  <div class="_full">
    <div class="_full_inner _effect component-me" :class="{'_effect--30':decline}">
      <div class="weui-cells">
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <img src="http://img5.imgtn.bdimg.com/it/u=1095558601,2831676718&fm=21&gp=0.jpg"
                 alt="" style="width:60px;margin-right:5px;display:block">
          </div>
          <div class="weui-cell__bd">
            <p>13500000112</p>
          </div>
          <div class="weui-cell__ft">
            <img class="_align-middle" src="../assets/images/chat-info-qr.png">
          </div>
        </div>
      </div>
      <!--系统消息-->
      <div class="weui-cells">
        <div class="weui-cell weui-cell_access">
          <div class="weui-cell__hd">
            <img src="../assets/images/icon_message.png" alt="" style="width:20px;margin-right:5px;display:block">
          </div>
          <div class="weui-cell__bd">
            <p>{{ $t('me.system-msg') }}</p>
          </div>
          <div class="weui-cell__ft"></div>
        </div>
      </div>
      <!--在线购买-->
      <div class="weui-cells">
        <div class="weui-cell weui-cell_access" @click="hrefShopping">
          <div class="weui-cell__hd">
            <img src="../assets/images/icon_taobao.png" alt="" style="width:20px;margin-right:5px;display:block">
          </div>
          <div class="weui-cell__bd">
            <p>{{ $t('me.online-shopping') }}</p>
          </div>
          <div class="weui-cell__ft"></div>
        </div>
      </div>
      <!--检查版本、关于-->
      <div class="weui-cells">
        <div class="weui-cell weui-cell_access">
          <div class="weui-cell__hd">
            <img src="../assets/images/icon_versopm_check.png" alt="" style="width:20px;margin-right:5px;display:block">
          </div>
          <div class="weui-cell__bd">
            <p>{{ $t('me.version-check') }}</p>
          </div>
        </div>
        <div class="weui-cell weui-cell_access">
          <div class="weui-cell__hd">
            <img src="../assets/images/icon_homepage.png" alt="" style="width:20px;margin-right:5px;display:block">
          </div>
          <div class="weui-cell__bd">
            <p>{{ $t('me.about') }}</p>
          </div>
          <div class="weui-cell__ft"></div>
        </div>
      </div>
      <!--设置-->
      <div class="weui-cells">
        <router-link class="weui-cell weui-cell_access" tag="div" :to="{path: '/me/settings'}">
          <div class="weui-cell__hd">
            <img src="../assets/images/me_more-setting.png" alt="" style="width:20px;margin-right:5px;display:block">
          </div>
          <div class="weui-cell__bd">
            <p>{{ $t('me.setting') }}</p>
          </div>
          <div class="weui-cell__ft"></div>
        </router-link>
      </div>
    </div>
    <transition name="cover">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  export default{
    name: 'p_me', // 我
    props: {},
    data () {
      return {
        decline: false
      }
    },
    methods: {
      ...mapActions(['setShowHeadAndFoot', 'setMenuActive', 'setIframeUrl']),
      hrefShopping () {
        let meVue = this
        this.setIframeUrl(
          {
            'title': '淘宝店',
            'url': '//shop143961322.m.taobao.com/?qq-pf-to=pcqq.c2c',
            'fn': () => {
              meVue.$router.push({path: '/me/shopping/0'})
            }
          },
        )
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.setMenuActive(3)
      })
    },
    created () {
      this.setShowHeadAndFoot(true)
      this.$on('route-pipe', _decline => {
        this.decline = _decline
        this.$parent.$emit('route-pipe', _decline)
      })
    }
  }
</script>

<style scoped>
  .component-me {
    padding-top: 1px;
    background-color: #efeff4;
  }
</style>