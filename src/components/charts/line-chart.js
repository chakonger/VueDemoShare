import Line from './BaseCharts/Line'

export default Line.extend({
  props: ['chartData', 'options'],
  mounted () {
    console.log(this.chartData)
    // console.log(this.chartData.datasets[0].data)
    // console.log(this.chartData.datasets[0].label)
    // console.log(this.chartData.datasets[0].backgroundColor)
    // console.log(this.chartData.labels)
    // FIXME vue.js?3de6:897 Uncaught RangeError: Maximum call stack size exceeded(…)
    const temp = {}
    temp.labels = this.chartData.labels
    temp.datasets = []
    temp.datasets[0] = {}
    temp.datasets[0].data = this.chartData.datasets[0].data
    temp.datasets[0].label = this.chartData.datasets[0].label
    temp.datasets[0].backgroundColor = this.chartData.datasets[0].backgroundColor
    this.renderChart(temp, this.options)
  }
})

