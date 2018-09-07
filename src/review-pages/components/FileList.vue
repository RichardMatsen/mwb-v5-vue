<template>
  <div :id="'borderwrapper'" class="file-list borderwrapper">
    <h4 class="title">{{title}}</h4>
    <div :id="'scrollwrapper'" class="scrollwrapper" v-scrollbarPaddingAdjust>
      <div :id="'listwrapper'" class="listwrapper">
        <ul v-scrollToBottom>
          <li v-for="(item, index) of visibleFiles" :key="index" v-on:click=selectFile(index)>
            <file-list-item :item="item"></file-list-item>
          </li>
          <list-limiter id="limiter" :page="page" :tooltip="'Show older dates'" ></list-limiter>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import ErrorBadge from '@/common/ErrorBadge.vue'
import ListLimiter from './ListLimiter.vue'
import FileListItem from './FileListItem.vue'
import scrollbarPaddingAdjust from './scrollbar-padding-adjust.directive'
import scrollToBottom from './scroll-to-bottom.directive'

export default {
  props: {
    page: { type: String, required: false },
    title: { type: String, default: 'Select a file to view' }
  },
  methods: {
    selectFile(index) {
      this.$store.commit('pages/UPDATE_SELECTED', { 
        page: this.page,
        index
      })
    },
  },
  computed: {
    visibleFiles() {
      return this.$store.getters['pages/visibleFiles'](this.page)
    },
  },
  components: {
    'list-limiter': ListLimiter,
    'file-list-item': FileListItem,
  },
  directives: {
    scrollbarPaddingAdjust,
    scrollToBottom
  }
}
</script>

<style scoped src="./FileList.css"></style>
<style scoped src="./thin-scrollbar.css"></style>
