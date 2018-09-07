<template>
  <form id="app" action="#" class="search" v-on:submit.prevent>
    <label :data-state="state" for="searchTerm">
      
      <input type="text" class="form-control"
        name="searchTerm" id="searchTerm"
        v-model.trim="searchTerm"
        :disabled="searchDisabled"
        @keydown.enter.prevent="search"
        @keydown.tab.prevent="search"
        :placeholder="searchDisabled ? 'Search not available' : 'Search'"
        />
      
      <i class="fa fa-search"
        v-if="state === 'closed'" 
        :disabled="searchDisabled"
        @click="state = 'open'"
        aria-hidden="true"></i>

      <i class="fa fa-check fa-lg" 
        v-if="state === 'open'" 
        :disabled="searchDisabled"
        @click="search"
        aria-hidden="true"></i>

      <i class="fa fa-times fa-lg" 
        v-if="state === 'open'" 
        :disabled="searchDisabled"
        @click="searchClear"
        aria-hidden="true"></i>

      <search-modal v-if="showModal" @close="showModal = false"></search-modal>
    </label>
  </form>
</template>

<script>
// https://codepen.io/jreyesgs/pen/EWgBGM
import SearchModal from './SearchModal.vue'
import SearchService from './search.service'

export default {
  props: {
    page: { type: String, required: true }
  },
  data() {
    return {
      state: 'closed',
      showModal: false,
      searchTerm: '',
      searchablePages: ['validations', 'referentials', 'clinics'],
      searchDisabled: false
    }
  },
  created() {
    this.searchDisabled = !this.searchablePages.includes(this.page)
  },
  methods: {
    searchClear() {
      this.state = 'closed'
      SearchService.clearResults()
    },
    search() {
      /* istanbul ignore else */
      if (this.searchTerm) {
        SearchService.getResults(this.searchTerm, this.page)
        this.showModal = true
      }
    }
  },
  components: {
    'search-modal': SearchModal,
  },
}
</script>

<style scoped>
form.search { 
  margin: auto;
  margin-right: 20px;
}

label {
  position: relative;
  display: inline-block;
  background-color: #F97924;
  padding: 5px 12px;
  transition: all 1s ease;
  border-radius: 0;
  box-shadow: 1px 1px 5px rgba(0,0,0,0.5);
}

label::after {
  content: '';
  display: block;
  height: 2px;
  width: 80%;
  transition: all 1s ease 0.5s;
}

label input {
  transition: width 1s ease, opacity 0.5s ease 0.5s;
  width: 180px;
  height: 25px;
  opacity: 1;
  border: 0;
  outline: none;
}

label i.fa-search {
  position: absolute;
  top: 11px;
  right: 11px;
  color: #333;
  cursor: pointer;
}
label i.fa-check {
  position: absolute;
  top: 11px;
  right: 25px;
  color: yellowgreen;
  cursor: pointer;
}
label i.fa-times {
  position: absolute;
  top: 11px;
  right: 5px;
  color: red;
  cursor: pointer;
}

label[data-state="open"] {
  background-color: #fff;
}

label[data-state="closed"] {
  border-radius: 30px;
  padding: 5px 5px;
  transition: all 1s ease;
}
label[data-state="closed"]::after {
  width: 0%;
  transition: all 0.3s ease;
}
label[data-state="closed"] input {
  width: 20px;
  height: 25px;
  opacity:0;
  cursor: pointer;
  transition: width 1s ease, opacity 0.5s ease;
  -webkit-appearance:none
} 
</style>
