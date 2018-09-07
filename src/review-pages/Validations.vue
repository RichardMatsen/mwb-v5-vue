<template>
  <page-common :page="PAGE" :namespace="'pages'"></page-common>
</template>

<script>
import PageCommon from './PageCommon'
export default {
  name: 'Validations',  
  data () {
    return {
      PAGE: 'validations'
    }
  },
  components: {
    'page-common': PageCommon
  }
}
</script>
