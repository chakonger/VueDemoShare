<template>
  <div class="_full_router component-xxx">
    <div class="_full_inner">
      <top-handle
          :back-text="topModel.backText"
          :cur-text="topModel.curText"
          :decline="decline"
          :next-path="topModel.nextPath"
          :next-icon="topModel.nextIcon">
      </top-handle>
      <div class="_cover-content _effect" :class="{'_effect--30': decline}">
        <div class="weather">
          top weather
        </div>
        <div class="device-type-select">
          Button Device Select
        </div>
        <div class="weui-grids">
          <div class="weui-grid" v-for="i in [2,3,4,5,6,7]" @click="gridClicked">
            <div class="weui-grid__icon">
              <img src="assets/images/icon_taobao">
            </div>
            <p class="weui-grid__label">Grid</p>
          </div>
        </div>
        <div class="chat-input">
          聊天输入口
        </div>
      </div>
    </div>
    <transition name="cover">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import topHandle from 'topHandle'
  import {mapGetters} from 'vuex'

  export default{
    name: 'p_deviceControl',
    props: {},
    data () {
      return {
        decline: false,
        topModel: {
          backText: 'back',
          curText: '',
          nextPath: {path: '/devices/control/more', append: true},
          nextIcon: 'icon-more'
        }
      }
    },
    components: {
      topHandle
    },
    computed: {
      ...mapGetters(['currentDevice'])
    },
    methods: {
      gridClicked () {

      }
    },
    beforeRouteEnter (to, from, next) {
      console.log('deviceControl beforeRouteEnter')
      next(vm => {
        vm.$parent.$emit('route-pipe', true)
      })
    },
    beforeRouteLeave (to, from, next) {
      console.log('deviceControl beforeRouteEnter')
      this.$parent.$emit('route-pipe', false)
      next()
    },
    created () {
      this.$on('route-pipe', _decline => {
        this.decline = _decline
      })
      this.topModel.curText = this.currentDevice.devName
      // TODO query weather info from server every time view created.
      this.$store.dispatch('getWeather', this.currentDevice.devID)
      // TODO query panel info once view will have been created.
      this.$store.dispatch('getControlPanel', {
        devID: this.currentDevice.devID,
        infraTypeID: 'T31020',
        infraName: '其宝加湿器'
      })
      // TODO query panel status once view will have been created.
      this.$store.dispatch('getPanelStatus', this.currentDevice.devID)
    }
  }
</script>

<style scoped>
  .weui-grid {
    width: 25%;
    padding: 10px;
  }

  .weui-grids {
    bottom: 40px;
    left: 0px;
    position: absolute;
    width: 100%;
  }

  .weather {
    height: 40px;
    background-color: #10aeff;
    text-align: center;
    color: white;
  }

  .device-type-select {
    position: absolute;
    width: 100%;
    height: 40px;
    bottom: 190px;
    background-color: #3cc51f;
    text-align: center;
    color: white;
  }

  .chat-input {
    position: absolute;
    width: 100%;
    height: 40px;
    bottom: 0px;
    left: 0px;
    background-color: #10aeff;
    text-align: center;
    color: white;
  }
</style>