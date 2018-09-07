<template>
  <page-common :page="PAGE" :namespace="'pages'"></page-common>
</template>

<script>
import PageCommon from './PageCommon'
export default {
  name: 'Clinics',
  data () {
    return {
      PAGE: 'clinics',
    }
  },
  components: {
    'page-common': PageCommon
  }
}
</script>
