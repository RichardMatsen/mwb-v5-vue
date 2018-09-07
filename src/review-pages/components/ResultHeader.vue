<template>
  <div class="header row resultHeader">

    <div class="header-title col-md-10">
      <h3 class="title">
        <span class="titleText">{{title}}</span>
        <error-badge :id="'errorbadge'" :item="fileInfo" :units="config.page.badgeUnits"></error-badge>
        <search-indicator class="search-indicator pull-right" v-if="searchCount > 0" :count="searchCount"></search-indicator>
      </h3>
      <h6>
        <span>Last modified: {{ lastModified }}</span>
      </h6>
    </div>

    <div class="header-refresh col-md-2">
      <h2>
        <a v-on:click="refresh" class="refresh-page-button pointable">
          <i class="fa fa-md fa-refresh pull-right" aria-hidden="true"></i>
        </a>
      </h2>
      <h6 class="last-refresh-label pull-right">
        <span v-if="fileInfo.lastRefresh">Refreshed</span>
        <span>{{fileInfo.lastRefresh | am-pm}}</span>
      </h6>
    </div>

  </div>
</template>

<script>
import ErrorBadge from '@/common/ErrorBadge.vue'
import SearchIndicator from '@/search/SearchIndicator.vue'
import DataService from '@/services/data.service'
import { formatDate } from '@/common/date.filter'
import { formatAMPM } from '@/common/ampm.filter'

export default {
  props: {
    page: { type: String, required: true }
  },
  computed: {
    title() {
      return this.fileInfo ? this.fileInfo.name : ''
    },
    fileInfo() {
      return this.$store.getters['pages/fileInfo'](this.page) || {}
    },
    config() {
      return this.$store.state.config[this.page + 'Config'] 
    },
    lastModified() {
      return formatDate(this.fileInfo.lastModified, 'DD MMM YYYY')
    },
    searchCount() {
      return this.$store.state.search.matchCount
    }
  },
  methods: {
    refresh() {
      DataService.refreshFile(this.page, this.fileInfo)
    }
  },
  components: {
    'error-badge': ErrorBadge,
    'search-indicator': SearchIndicator,
  },
  filters: {
    'am-pm'(date) {
      return formatAMPM(date)
    },
  },
}
</script>

<style scoped>
div.resultHeader {
  margin-bottom: 1em;
}

/* Vertically align content of title row */
.title { 
  display: flex; 
  flex-flow: row;
  justify-content: flex-start;
 }
.titleText { margin: auto; margin-right: 0.5em; }
.error-badge { margin: auto; margin-right: 0.5em; }
.search-indicator { margin: auto; margin-right: 0.5em; }

.titleText {
  margin-left: 0
}
.error-badge {
  opacity: 0.7 !important;
  font-size: 0.65em !important;
  margin-left: 0.5em;
}
.search-indicator {
  opacity: 0.7;
  margin-left: 0.5em;
}
.last-refresh-label {
  text-align: right;
}
.pointable {
    cursor: pointer;
}
</style>
