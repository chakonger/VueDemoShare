<template>
  <div class="js_dialog" id="androidDialog2" :class="{'default': !dialogProps.showDialog}">
    <div class="weui-mask"></div>
    <div class="weui-dialog weui-skin_android">
      <div class="weui-dialog__bd">
        {{ $t(dialogProps.content) }}
      </div>
      <div class="weui-dialog__ft">
        <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" @click="navigationTap">
          {{ $t(dialogProps.navigation) }}
        </a>
        <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" @click="positiveTap">
          {{ $t(dialogProps.positive) }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    props: {
      dialogProps: {
        type: Object,
        default: () => {
          return {
            showDialog: {
              type: Boolean,
              default: false
            },
            content: {
              type: String,
              default: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内'
            },
            navigation: {
              type: String,
              default: '辅助操作'
            },
            positive: {
              type: String,
              default: '主操作'
            },
            navigationEvent: { // 辅助事件名称
              type: String,
              default: 'navigationEvent'
            },
            positiveEvent: { // 主操作事件名称
              type: String,
              default: 'navigationEvent'
            }
          }
        }
      }
    },
    data () {
      return {}
    },
    methods: {
      navigationTap () { // navigation button clicked!
        this.$parent.$emit(this.dialogProps.navigationEvent)
      },
      positiveTap () { // positive button clicked!
        this.$parent.$emit(this.dialogProps.positiveEvent)
      }
    },
    created () {
    }
  }
</script>

<style scoped>
  .default {
    opacity: 0;
    display: none;
  }
</style>