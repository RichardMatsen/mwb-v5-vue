<template>
  <transition name="modal">
    <div class="modal-mask" @click="$emit('close')">
      <div class="modal-wrapper">
        <div class="modal-container" @keydown.esc.prevent="$emit('close')">

          <div class="modal-header">
            <slot name="header">
              <h3 class="modal-title pull-left">Results for search term '{{searchTerm}}'</h3>
              <button type="button" class="close pull-right" @click="$emit('close')" aria-label="Close">
                <i class="fa fa-close" aria-hidden="true"></i> 
              </button>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <div class="list-group">
                <a class="list-group-item pointable" v-for="result in searchResults" :key="result.file.name">{{resultDisplay(result)}}</a>
              </div>
              <div v-if="!searchResults.length">No results found</div>
            </slot>
          </div>

        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  methods: {
    resultDisplay(result) {
      return result.file && result.file.name && result.count ? `${result.file.name} has ${result.count} matches`
        : result.file && result.file.name ? result.file.name
        : typeof result === 'string' ? result
        : ''
    }
  },
  computed: {
    searchTerm() {
      return this.$store.state.search.searchTerm
    },
    searchResults() {
      return this.$store.state.search.results
    },
  },
  mounted () {
    document.addEventListener('keydown', (e) => {
      /* istanbul ignore next */
      if (e.keyCode === 27) {
        this.$emit('close')
      }
    });
  }
}
</script>

<style scoped>
  .modal-container {
    width: 800px;
    height: 500px;
    margin: 0px auto;
    padding: 10px 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 1);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  button.close i {
    font-size: x-large;
    color: #F97924;
  }

  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-header h3 {
    margin-top: 0;
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-default-button {
    float: right;
  }

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
