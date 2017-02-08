<!--数据加载时候的loading-->
<template>
    <div id="loadingToast" v-show="showLoading">
        <div class="weui-mask_transparent"></div>
        <div class="weui-toast">
            <i class="weui-loading weui-icon_toast"></i>
            <p class="weui-toast__content">{{ content }}</p>
        </div>
    </div>
</template>

<script>
  export default{
    props: {
      content: {
        default: '数据加载中'
      },
      showLoading: {
        default: false
      }
    }
  }
</script>

<style scoped>

</style>