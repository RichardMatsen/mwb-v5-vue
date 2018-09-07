<template>
  <li>
    <span class="moreChevron" :class="{'disabled' : !isMore}">
      <a @click=showMore() data-toggle="tooltip" :title="tooltip">
        <i class="fa fa-angle-double-down fa-2x" aria-hidden="true"></i>
      </a>
    </span>
  </li>
</template>

<script>
export default {
  props: {
    page: { type: String, required: true },
    displayIncrement: { type: Number, default: 4 },
    tooltip: { type: String, default: 'Show more' }
  },
  methods: {
    showMore() {
      this.$store.dispatch('pages/updateNumVisible', { 
        page: this.page,
        tag: this.page,
        numVisible: this.numToDisplay + this.displayIncrement
      })
    }
  },
  computed: {
    listCount() {
      return this.$store.state.pages.files[this.page].length
    },
    numToDisplay() {
      return this.$store.state.pages.numVisible[this.page]
    },
    isMore() {
      return this.numToDisplay < this.listCount;
    }
  }
}
</script>

<style scoped>
li {
  padding-top: 1em;
  margin-right: 0.3em;
  border-bottom: none;
}

span a {
  background-color: inherit;
  color: inherit;
  cursor: pointer;
}

span.moreChevron {
  border-bottom: none;
}

span.moreChevron.disabled, span.moreChevron.disabled i {
  pointer-events:none;
  opacity:0.6;
}

span.moreChevron i.fa-angle-double-down {
  width: 100%;
  text-align: center;
}
</style>
