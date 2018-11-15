<template>
  <div>
    <page-common :page="PAGE" :namespace="'pages'">
      <button class="referentials-button btn btn-info pull-right" slot="buttons" @click="clickDiagramButton">
        <i class="fa fa-sitemap" aria-hidden="true"></i> {{buttonCaption}}
      </button>
      <transition name="slide" mode="out-in" slot="graph">
        <router-view></router-view>
      </transition>
    </page-common>
  </div>
</template>

<script>
import PageCommon from './PageCommon'

export default {
  name: 'Referentials',
  data () {
    return {
      PAGE: 'referentials',
      showGraph: false
    }
  },
  computed: {
    buttonCaption() {
      return this.showGraph ? 'Close Diagram' : 'Relationship Diagram'
    }
  },
  methods: {
    clickDiagramButton() {
      /* istanbul ignore next */
      this.showGraph = !this.showGraph
      const link = this.showGraph ? '/referentials/referentialsGraph' : '/referentials'
      this.$router.push(link)
    }
  },
  components: {
    'page-common': PageCommon,
  }
}
</script>

<style src="@/app-animation.css"></style>
<style scoped>
  button.referentials-button {
    margin: auto;
  }
  .fa-sitemap {
    margin-right: 0.3em;
  }
</style>
