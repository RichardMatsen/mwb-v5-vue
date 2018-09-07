<template>
  <div class="sparkline" :id="id" :style="{'height': height}">
    <svg :width="width" :height="height" style="margin-top: 8">
      <defs>
        <linearGradient :id="gradientId" x1="0" x2="0" y1="1" y2="0">
          <stop offset="10%" stop-color="#c6e48b"></stop>
          <stop offset="33%" stop-color="#7bc96f"></stop>
          <stop offset="66%" stop-color="#239a3b"></stop>
          <stop offset="90%" stop-color="#196127"></stop>
        </linearGradient>
        <mask :id="sparklineId" x="0" y="0" :width="width" :height="height">
          <polyline :transform="'translate(0, ' + height + ') scale(1,-1)'" 
            :points="points"
            fill="transparent" 
            stroke="#8cc665" 
            stroke-width="2">
          </polyline>
        </mask>
      </defs>
      
      <g transform="translate(0, 1.0)">
        <rect x="0" y="-2" :width="width" :height="height" 
          style="stroke: none;"
          v-bind:style="{fill: fill, mask: mask}"
          >
        </rect>
      </g>
    </svg>
  </div>
</template>

<script>
  export default {
    props: {
      id: String,
      history: { type: Array, required: true }
    },
    data () {
      return {
        width: 100,
        height: 30,
        margin: 3
      }
    },
    methods: {
      draw () {
        let points = ''
        if (this.history) {
          const xSpacing = this.history.length > 1 ? this.width / (this.history.length - 1) : 0
          points = this.normalizeData(this.history)
            .map((d) => (d * (this.height - (2 * this.margin))) + this.margin)  // scale y values
            .map((d, i) => { return {x: i * xSpacing, y: d} })        // apply x spacing
            .map((d) => `${d.x},${d.y}`).join(' ')                        // convert to string containing coords
        }
        return points
      },
      normalizeData (data) {
        const max = Math.max(...data)
        const min = Math.min(...data)
        return data.map((d) => ((d - min) / (max - min)))
      }
    },
    computed: {
      points: function () { return this.draw() },
      gradientId: function () { return 'gradient_' + this.id },
      sparklineId: function () { return 'sparkline_' + this.id },
      fill: function () { return 'url(#gradient_' + this.id + ')' },
      mask: function () { return 'url(#sparkline_' + this.id + ')' },
    },
  }
</script>
