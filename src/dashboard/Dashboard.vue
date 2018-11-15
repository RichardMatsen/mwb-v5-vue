<template>
  <div ref="dashboard" class="dashboard">
    <div class="card">
      <h1 class="page-title">{{title}} </h1>
      <span class="subtitle">Summary of errors, load failures, clinic matching, team tasks</span>
      <hr class="titles-rule" />
      <div class="thumbnails">
        <div class="dashboard-thumbnail-outer" v-for="measure of measures" :key="measure.id" >
          <dashboard-thumbnail :measure="measure"></dashboard-thumbnail>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardThumbnail from './components/DashboardThumbnail.vue'

export default {
  name: 'Dashboard',
  dependencies : ['dataService', 'configService', 'measureService'],
  data () {
    return {
      title: 'Dashboard',
    }
  },
  computed: {
    measures() {
      return this.$store.state.measures.measures
    } 
  },
  methods: {
    initialize: function() {
      this.configService.checkConfig().then(_ => {
        this.measureService.checkMeasures().then(_ => {
          this.dataService.checkAllFiles().then(_ =>  {
            this.measureService.updateMeasures()
          })
        })
      })
    },
  },
  created () {
    this.initialize()
  },
  components: {
    'dashboard-thumbnail': DashboardThumbnail,
  }
}
</script>

<style src='@/common/card/card.css' scoped></style>
<style scoped>
.dashbaord {
  height: 60em;
}
div.thumbnails {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0 2em;
}
.row > [class*="col-"] {
  box-sizing: border-box;
}

.dashboard-thumbnail-outer {
  margin: auto;
  width: 600px;
}

@media (max-device-width: 480px) {
  div.thumbnails {
    padding: 0 1em;
  }
}

@media screen and (max-device-width: 768px) {
  .dashboard-thumbnail-outer {
    width: 100%;
  }
}
@media screen and (orientation: portrait) {
  .dashboard-thumbnail-outer {
    width: 100%;
  }
}
</style>
