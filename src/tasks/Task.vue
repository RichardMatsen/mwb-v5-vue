<template>
  <div class="card">
    <div>{{ title }}</div>
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
      const assignee = this.task.assignedTo ? `[${this.task.assignedTo}]` : ''
      return `${this.task.description} ${formatDate(this.task.effectiveDate, 'DD MMM')} ${assignee}`.trim()
    }
  }

}
</script>
