<template>
  <div class="_full_router component-xxx">
    <div class="_full_inner">
      <top-handle
          :back-text="topModel.backText"
          :cur-text="topModel.curText"
          :decline="decline">
      </top-handle>
      <div class="_cover-content _effect" :class="{'_effect--30': decline}">
        <router-link :to="{path: '/devices'}">返回首页
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import TopHandle from 'topHandle'

  export default{
    name: 'p_404',
    data () {
      return {
        decline: false,
        topModel: {
          backText: '返回',
          curText: '404',
          nextPath: {path: ''},
          nextIcon: ''
        }
      }
    },
    components: {
      TopHandle
    }
  }
</script>

<style scoped>
</style>
