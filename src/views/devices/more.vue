<template>
  <div class="_full_router component-xxx">
    <div class="_full_inner">
      <top-handle
          :back-text="topModel.backText"
          :cur-text="topModel.curText"
          :decline="decline">
      </top-handle>
      <div class="_cover-content _effect" :class="{'_effect--30': decline}">
        <div>{{ this.$route.path }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import topHandle from 'topHandle'
  export default{
    name: 'p_more',
    props: {},
    data () {
      return {
        decline: false,
        topModel: {
          backText: 'back',
          curText: 'more'
        }
      }
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
    }
  }
</script>

<style scoped>
</style>