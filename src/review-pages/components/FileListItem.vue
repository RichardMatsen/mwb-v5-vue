<template>
  <div>
    <a class="file-list-item">
      <search-indicator class="search-indicator" v-if="searchFound"></search-indicator>
      <span class="display-name">{{item.displayName}}</span>
      <span class="effective-time pull-right">{{item.effectiveTime | am-pm}}</span>
      <error-badge class="pull-right" :item="item"></error-badge>
    </a>
  </div>
</template>

<script>
import ErrorBadge from '@/common/ErrorBadge.vue'
import SearchIndicator from '@/search/SearchIndicator.vue'
import { formatDate } from '@/common/date.filter'
import { formatAMPM, getCurrentHour } from '@/common/ampm.filter'

export default {
  props: {
    item: { type: Object, required: true }
  },
  methods: {
  },
  computed: {
    searchFound() {
      return this.$store.state.search.results.map(r => r.file.name)
        .includes(this.item.name)
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
  }
}
</script>

<style scoped>
  .file-list-item {
    display: flex;
    width: auto;
  }
  a:hover {
    background-color: #2586d7;
  }
  .search-indicator {
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 0.3em;
  }
  .display-name {
    margin-top: auto;
    margin-bottom: auto;
    margin-right: auto;
  }
  .effective-time {
    /* margin-right: 0.5em; */
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 0.3em;
  }
  .file-list-item >>> .error-badge { /* use deep selector to style child */
    /* margin: 0; */
    margin-top: auto;
    margin-bottom: auto;
  }
</style>
