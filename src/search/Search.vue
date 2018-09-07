<template>
  <div class="search">
    <form novalidate v-on:submit.prevent>
      <div class="input-group br">
        <input type="text" name="searchTerm" id="searchTerm" class="form-control"
          v-model="searchTerm"
          @input="updateSearchTerm($event.target.value)"
          autocomplete="off"
          :disabled="searchDisabled" 
          :placeholder="searchDisabled ? 'Search not available' : 'Search for text'" >
        <span class="input-group-btn">
          <button class="btn btn-outline-info" :disabled="searchDisabled" @click="search">
            Search
          </button>
          <button v-if="searchTerm" type="reset" class="btn reset">
            <i class="fa fa-times-circle"
              @click="searchClear"
              aria-hidden="true">
            </i>
          </button>
        </span>
      </div>
    </form>
    <search-modal v-if="showModal" @close="showModal = false"> </search-modal>
  </div>
</template>

<script>
import SearchModal from './SearchModal.vue'
import SearchService from './search.service'

export default {
  props: {
    page: { type: String, required: true },
  },
  data() {
    return {
      showModal: false,
      searchTerm: '',
      searchablePages: ['validations', 'referentials', 'clinics'],
      searchDisabled: true
    }
  },
  created() {
    this.searchDisabled = !this.searchablePages.includes(this.page)
  },
  components: {
    'search-modal': SearchModal,
  },
  methods: {
    searchClear() {
      this.searchTerm = ''
      SearchService.clearResults()
    },
    updateSearchTerm(searchTerm) {
      this.$store.commit('SET_SEARCHTERM', searchTerm)
    },
    search() {
      /* istanbul ignore else */
      if (this.searchTerm) {
        SearchService.getResults(this.searchTerm, this.page)
        this.showModal = true
      }
    }
  }
}
</script>

<style scoped>
div.input-group { 
  width: 250px;
}

div.search { 
  margin: auto;
  margin-right: 15px;   
}

.btn.reset {
  background: none;
  position: absolute;
  top: 1px;
  right: 65px;
  z-index: 9;
  outline: 0;
}
.btn.reset:focus {
  outline: 0;
}
.fa-times-circle {
  color: red;
  opacity: 50%;
  cursor: pointer;
}
</style>
