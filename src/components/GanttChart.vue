<script setup lang="ts">
const props = defineProps({
  data: String
})

const allData = JSON.parse(props.data)
</script>

<template>
  <h2>EOL Date Visualization</h2>
  <div>
    <canvas ref="ganttChart"></canvas>
  </div>
</template>

<script lang="ts">
import { Chart } from 'chart.js/auto'
import 'chartjs-adapter-date-fns' // For handling time scales

export default {
  name: 'GanttChart',
  props: {
    tasks: {
      type: Array,
      required: true
      // Array format: [{ label: "Task Name", startDate: "YYYY-MM-DD", endDate: "YYYY-MM-DD" }, ...]
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.renderChart()
  },
  methods: {
    renderChart() {
      const ctx = this.$refs.ganttChart.getContext('2d')

      const labels = this.tasks.map((task) => task.label)
      const startDates = this.tasks.map((task) => new Date(task.startDate).getTime())
      const endDates = this.tasks.map((task) => new Date(task.endDate).getTime())

      const durations = endDates.map((endDate, index) => endDate - startDates[index])

      const dataset = {
        labels,
        datasets: [
          {
            label: 'Tasks',
            data: startDates.map((startDate, index) => ({
              x: startDate,
              y: index,
              x2: endDates[index]
            })),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      }

      this.chart = new Chart(ctx, {
        type: 'bar',
        data: dataset,
        options: {
          responsive: true,
          indexAxis: 'y',
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day'
              },
              title: {
                display: true,
                text: 'Date'
              }
            },
            y: {
              type: 'category',
              title: {
                display: true,
                text: 'Tasks'
              },
              labels: labels
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => {
                  const startDate = new Date(context.raw.x).toLocaleDateString()
                  const endDate = new Date(context.raw.x2).toLocaleDateString()
                  return `${context.label}: ${startDate} - ${endDate}`
                }
              }
            }
          }
        }
      })
    }
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.destroy()
    }
  }
}
</script>

<style scoped>
canvas {
  max-width: 100%;
  height: 400px;
}
</style>
