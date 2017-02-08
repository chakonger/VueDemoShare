<template>
  <div class="_full_router component-iframe">
    <div class="_full_inner">
      <top-handle
          :back-text="topModel.backText"
          :cur-text="topModel.curText"
          :decline="decline"
          v-show="showTitle">
      </top-handle>
      <div class="_cover-content _effect" :class="{'_effect--30': decline}">
        <div class="_full" style="overflow:hidden;">
          <iframe class="iframe-wrap _full" style="overflow:hidden;" :src='iframeUrl' frameborder="0"></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import topHandle from 'topHandle'
  import {mapGetters} from 'vuex'
  export default{
    name: 'PageDeviceControl',
    props: {},
    data () {
      return {
        decline: false,
        showTitle: true,
        topModel: {
          backText: '返回',
          curText: '标题'
        }
      }
    },
    computed: {
      ...mapGetters(['iframeUrl', 'irameTitle'])
    },
    components: {
      topHandle
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
      this.$on('route-pipe', _decline => {
        this.decline = _decline
        this.$parent.$emit('route-pipe', _decline)
      })
      this.showTitle = this.$route.params.showTitle === 1
    }
  }
</script>

<style scoped>
</style>