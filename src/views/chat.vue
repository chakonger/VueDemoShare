<template>
  <div class="_full_inner"><span>chat</span></div>
</template>

<script>
  import {mapActions} from 'vuex'
  export default{
    name: 'p_chat', // 对话
    props: {},
    data () {
      return {}
    },
    methods: {
      ...mapActions(['setShowHeadAndFoot', 'setMenuActive'])
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.setMenuActive(0)
      })
    },
    created () {
      this.setShowHeadAndFoot(true)
    }
  }
</script>

<style scoped>
  div {
    position: absolute;
    top: 50%;
    left: 45%;
    color: red;
  }
</style>