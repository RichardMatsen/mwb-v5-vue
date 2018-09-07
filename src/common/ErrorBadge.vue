<template>
  <span class="error-badge badge pull-right" v-if="item.metric != null" 
    :class="item.badgeColor || item.color" >
    {{item.metric}} {{units}}
  </span>
</template>

<script>
export default {
  props: {
    item: { type: Object, required: true },
    units: { type: String, default: '' }
  },
  data () {
    return {
      isExpanded: false
    }
  },
}
</script>

<style scoped>
  span.badge {
    opacity: 0.8;
    font-size: 0.8em;
    min-width: 4em;
  }
  span.badge.green { color: black; background-color: springgreen; }
  span.badge.orange { color: black; background-color: darkorange; }
  span.badge.red { color: white; background-color: indianred; }
  span.badge.blue { color: white; background-color: blue; }
  span.badge.grey { color: white; background-color: lightslategray; }
  span.x {
    min-width: 35px;
    font-size: x-large;
    font-family: "Courier New", Courier, monospace;
    margin: auto;
    margin-left: 10px;
    margin-right: 10px;
  }
</style>
