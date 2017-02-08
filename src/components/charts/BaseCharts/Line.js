/**
 * Created by lvshicheng on 2016/11/25.
 */
import Chart from 'chart.js'

export default window.Vue.extend({
  template: `
    <div>
      <canvas :id="chartId" :width="width" :height="height" ref="canvas"></canvas>
    </div>
  `,
  props: {
    chartId: {
      default: 'line-chart',
      type: String
    },
    width: {
      default: 400,
      type: Number
    },
    height: {
      default: 400,
      type: Number
    }
  },
  data () {
    return {
      defaultOptions: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: false
            }
          }],
          xAxes: [{
            gridLines: {
              display: false
            }
          }]
        }
      }
    }
  },
  methods: {
    renderChart (data, options) {
      let chartOptions = window.$.extend(this.defaultOptions, options)
      this._chart = new Chart(
        this.$refs.canvas.getContext('2d'), {
          type: 'line',
          data: data,
          options: chartOptions
        }
      )
      this._chart.generateLegend()
    }
  },
  beforeDestroy () {
    this._chart.destroy()
  }
})
