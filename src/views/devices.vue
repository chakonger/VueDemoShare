<!--设备列表页-->
<template>
  <div class="_full">
    <div class="_full_inner _effect component-contact" :class="{'_effect--30':decline}">
      <!--顶部列表-->
      <div class="weui_cells_contact-head weui-cells">
        <router-link class="weui-cell weui-cell_access" :to="{path:'/devices/group-chat'}">
          <div class="weui-cell__hd">
            <img class="img-obj-cover" src="../assets/images/contact_top-addgroup.png">
          </div>
          <div class="weui-cell__bd">
            <p v-text="$t('homepage.group-chat')"></p>
          </div>
        </router-link>
        <router-link class="weui-cell weui-cell_access" :to="{path:'/devices/new-friends'}">
          <div class="weui-cell__hd">
            <img class="img-obj-cover" src="../assets/images/contact_top-friend-notify.png">
          </div>
          <div class="weui-cell__bd">
            <p>{{ $t('homepage.new-family') }}</p>
          </div>
        </router-link>
      </div>
      <!-- 具体的设备列表 -->
      <div class="contact-friends">
        <p class="weui-cells__title" v-text="$t('device.devAlpha')"></p>
        <div class="weui-cells">
          <div class="weui-cell weui-cell_access" @click="goDeviceControl(dev.devID)"
               v-for="dev in devices">
            <div class="weui-cell__hd">
              <img :src="getImgUrl(dev)">
            </div>
            <div class="weui-cell__bd">
              <p v-text="dev.devName"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="cover">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import {parseStatus} from 'utils'
  import {mapActions, mapGetters} from 'vuex'
  import {DEFAULT_SERVER} from 'assets/js/constants'

  export default {
    name: 'p_devices', // 列表
    data () {
      return {
        decline: false
      }
    },
    computed: {
      ...mapGetters(['devices'])
    },
    methods: {
      ...mapActions(['setShowHeadAndFoot', 'setMenuActive', 'queryCurrentDevice']),
      showDevice (item) {
        console.log(JSON.stringify(item))
      },
      getImgUrl (dev) {
        let status = parseStatus(dev.devStatus)
        var icon
        (icon = dev.uniteDevices) && (icon = icon[0].logoSet) && (icon = icon[status[0]]) && (icon = DEFAULT_SERVER + icon)
        // 默认就用插座的图标
        icon || (icon = DEFAULT_SERVER + status[1])
        return icon
      },
      goDeviceControl (devID) {
        let devicesVue = this
        // query device from local storage every time entry the control view.
        this.queryCurrentDevice({
          devID: devID,
          cb: device => {
            devicesVue.$router.push({path: '/devices/control'})
          }
        })
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.setMenuActive(1)
      })
    },
    created () {
      this.$on('route-pipe', _decline => {
        this.decline = _decline
        this.$parent.$emit('route-pipe', _decline)
      })
      this.setShowHeadAndFoot(true)
      this.$store.dispatch('getDevices')
    }
  }
</script>

<style scoped>
  img {
    width: 40px;
    margin-right: 5px;
    display: block;
  }
</style>