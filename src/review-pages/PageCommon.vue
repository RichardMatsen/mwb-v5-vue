<template>
  <div class="container-fluid">

    <div class="row bannertitle-container">
      <div class="row bannertitle">
        <h1 class="pageTitle">{{config.page.pageTitle}}</h1>
        <slot name="buttons"></slot>
        <component :is="searchComponent" :page="page"></component>
      </div>
      <small class="pageDescription">{{config.page.pageDescription}}</small>
      <hr/>
    </div>

    <slot name="graph"></slot>
    
    <div :id="'filecontent'" class="filecontent row">

      <div class="filelistcontainer" :class="'col-md-' + config.page.listWidth">
        <file-list :page="page" :id="'filelist'" :title="config.page.listTitle"
          @fileSelected="handleFileChange($event)" 
          @numDisplayedChanged="handleNumDisplayedChange($event)">
        </file-list>
      </div>
      <div class="result" :class="'col-md-' + (12 - config.page.listWidth)">
        <div class="card">
          <result-header :page="page"></result-header>
          <div class="result-wrapper">
            <result-wrapper :page="page" 
              :content="(fileInfo(page) || {}).content" 
              :zoom="config.page.resultsZoom"></result-wrapper>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import ConfigService from '../services/config.service'
import DataService from '../services/data.service'
import ResultHeader from './components/ResultHeader.vue'
import ResultWrapper from './components/ResultWrapper.vue'
import FileList from './components/FileList.vue'
import Search from '@/search/Search.vue'
import Search2 from '@/search/Search2.vue'

// Helper function to illustrate getter namespace defined at runtime
// Ref: https://stackoverflow.com/questions/49306549/how-should-i-structure-multiple-use-vue-components-to-load-data-from-different-v/
function mapPropsModels (props = [], {namespaceProp} = {}) {
  return props.reduce((obj, prop) => {
    const computedProp = {
      get() {
        return this.$store.getters[this[namespaceProp] + '/' + prop]
      }
    }
    obj[prop] = computedProp
    return obj
  }, {})
}

export default {
  components: {
    'file-list': FileList,
    'result-header': ResultHeader,
    'result-wrapper': ResultWrapper,
    Search,
    Search2,
  },
  props: {
    page: { type: String, required: true },
    namespace: { type: String, required: false }
  },
  computed: {
    ...mapPropsModels(['fileInfo'], { namespaceProp: 'namespace'}),
    config() {
      return this.$store.state.config[this.page + 'Config'] || { page: {} }
    },
    searchComponent() {
      return this.$mq.resize && this.$mq.above('768px')
        ? Search
        : Search2
    },
  },
  created() {
    this.initialize()
  },
  methods: {
    initialize () {
      ConfigService.checkConfig().then(res => {
        DataService.checkFiles(this.page)
      })
    },
  },
}
</script>

<style src='@/common/card/card.css' scoped></style>
<style src='./PageCommon.css' scoped></style>
