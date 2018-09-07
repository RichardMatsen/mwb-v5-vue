<template>
  <div class="card">
    <div>{{ title }}</div>
    <div>{{ task.assignedTo }}</div>
  </div>
</template>

<script>
import { formatDate } from '@/common/date.filter'

export default {
  props: {
    task: { type: Object, required: true }
  },
  computed: {
    title() {
      return `${this.task.type} ${formatDate(this.task.effectiveDate, 'DD MMM')}`
    }
  }

}
</script>
