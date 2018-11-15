<template>
  <div id="dataContainer" class="resultWrapper"></div>
</template>

<script>
import Mark from 'mark.js'

export default {
  props: {
    page: { type: String, required: true },
    content: { type: String, default: '' },
    zoom: { type: String, default: '100%' }
  },
  watch: {
    content: function() {
      this.setPageContent()
    }
  },
  methods: {
    setPageContent() {
      if (!this.$el || !this.content) {
        return;
      }
      const outerDiv = this.$el 
      outerDiv.innerHTML = this.content;
      outerDiv.style.zoom = this.zoom;
      this.markSearchTerm(this.$store.state.search.searchTerm)
    },
    markSearchTerm(newTerm) {
      const instance = new Mark(this.$el);
      instance.unmark();
      if (newTerm) {
        instance.mark(newTerm, {
          className: 'markSearch',
          done: (matchCount) => this.$store.commit('SET_MATCHCOUNT', matchCount) 
        });
      }
    }
  },
  mounted() {
    this.setPageContent()
    this.$store.watch(
      (state) => state.search.searchTerm, 
      (newTerm, oldTerm) => this.markSearchTerm(newTerm, oldTerm)
    )
  }
}
</script>

<style>
/* This should not be scoped, as the mark tag and markSearch class are added dynamically */
mark.markSearch {
  color: #000;
  background: #ff0;
  padding: 0
}
</style>
