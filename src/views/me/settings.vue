<template>
  <div class="_full_router component-xxx">
    <div class="_full_inner">
      <top-handle
          :back-text="topModel.backText"
          :cur-text="topModel.curText"
          :decline="decline">
      </top-handle>
      <div class="_cover-content _effect" :class="{'_effect--30': decline}">
        <!--设置电价-->
        <div class="weui-cells">
          <div class="weui-cell weui-cell_access">
            <div class="weui-cell__bd">
              <p>{{ $t('setting.setElePrice') }}</p>
            </div>
          </div>
        </div>
        <!--修改密码-->
        <div class="weui-cells">
          <div class="weui-cell weui-cell_access">
            <div class="weui-cell__bd">
              <p>{{ $t('setting.changePwd') }}</p>
            </div>
          </div>
        </div>
        <!--对话风格-->
        <div class="weui-cells">
          <div class="weui-cell weui-cell_access">
            <div class="weui-cell__bd">
              <p>{{ $t('setting.chatStyle') }}</p>
            </div>
            <div class="weui-cell__ft">
              群英荟萃
            </div>
          </div>
        </div>

        <div class="weui-cells weui-cells_form">
          <!--夜间免打扰-->
          <div class="weui-cell weui-cell_switch">
            <div class="weui-cell__bd">
              <p>{{ $t('setting.nightDisturb') }}</p>
            </div>
            <div class="weui-cell__ft">
              <input class="weui-switch" type="checkbox">
            </div>
          </div>
          <!--退出登录-->
          <div class="weui-cell weui-cell_access" @click="signOut">
            <div class="weui-cell__bd">
              <p>{{ $t('setting.signOut') }}</p>
            </div>
          </div>
        </div>
      </div>
      <dialog-android :dialogProps="dialogProps"></dialog-android>
    </div>
  </div>
</template>

<script>
  import topHandle from 'topHandle'
  import DialogAndroid from 'components/toast/dialog-android.vue'
  import {mapActions} from 'vuex'

  export default{
    name: 'p_settings',
    props: {},
    data () {
      return {
        decline: false,
        dialogProps: {
          showDialog: false,
          content: 'setting.d-content',
          navigation: 'setting.d-navigation',
          navigationEvent: 'signOut',
          positive: 'setting.d-positive',
          positiveEvent: 'cancel'
        },
        topModel: {
          backText: 'back',
          curText: 'me.setting'
        }
      }
    },
    components: {
      topHandle,
      DialogAndroid
    },
    methods: {
      ...mapActions(['clearDevices', 'setShowHeadAndFoot']),
      signOut () {
        this.dialogProps.showDialog = true
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$parent.$emit('route-pipe', true)
      })
    },
    beforeRouteLeave (to, from, next) {
      this.$parent.$emit('route-pipe', false)
      next()
    },
    created () {
      this.$on('signOut', () => {
        this.dialogProps.showDialog = false
        window.localStorage.clear()
        this.setShowHeadAndFoot(false)
        this.$store.dispatch('clearDevices')
        this.$router.push('/login')
      })
      this.$on('cancel', () => {
        this.dialogProps.showDialog = false
      })
    }
  }
</script>

<style scoped>
</style>