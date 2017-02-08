<template>
  <div class="_cover-top">
    <!--left-->
    <div class="top-back">
      <div class="_ellipsis iconfont icon-return-arrow" @click="goBack" v-text="$t(backText)">
      </div>
    </div>
    <!-- right -->
    <div class="top-other">
      <slot name="right">
        <router-link class="_align-right" tag="div" :to="nextPath">
          <span class="iconfont" :class="nextIcon"></span>
        </router-link>
      </slot>
    </div>
    <!-- center -->
    <div class="top-title _effect" :class="{'_effect--50':decline}">
      <slot name="center">
        <p>
          <span v-text='$t(curText)'></span>
        </p>
      </slot>
    </div>
  </div>
</template>

<script>
  export default{
    methods: {
      goBack () {
        this.$router.go(-1)
      }
    },
    props: {
      'backText': {
        type: String,
        default: '返回'
      },
      'decline': {
        default: false
      },
      'curText': {},
      'nextPath': {
        default: () => {
          return {path: '/404'}
        }
      },
      'nextIcon': {
        type: String
      }
    },
    data () {
      return {}
    },
    created () {
    }
  }
</script>

<style scoped>
</style>