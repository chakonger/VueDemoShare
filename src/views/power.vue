<template>
  <div class="_full_inner _effect component-find">
    <div class="_full component-find-content">
      <div id="charts">
        <div class="chart_item" v-for="item in powerList">
          <line-chart :height="250" :chartData="item.chartData" :options="item.options"></line-chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import lineChart from '../components/charts/line-chart'

  export default{
    name: 'p_power', // 电量统计
    props: {},
    data () {
      return {}
    },
    components: {
      lineChart
    },
    computed: {
      ...mapGetters(['deviceIds', 'powerList'])
    },
    methods: {
      ...mapActions(['setMenuActive'])
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.setMenuActive(2)
      })
    },
    created () {
      this.$watch('deviceIds', function (newVal, oldVal) {
        console.log('>>>>> power newVal: ' + newVal)
        this.$store.dispatch('getPowerList', this.deviceIds)
      })
      if (this.deviceIds) {
        this.$store.dispatch('getPowerList', this.deviceIds)
      }
    }
  }
</script>

<style scoped>
  .chart_item {
    background-color: #fff;
    margin-top: 10px;
  }
</style>