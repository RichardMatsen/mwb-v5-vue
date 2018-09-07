<template>
  <div id="mwb-tasks">
    <h1>Tasks</h1>
    <hr/>
    <kanban :stages="stages" :blocks="tasks">
      <task v-for="task in tasks" :key="task.id" :slot="task.id" :task="task"></task>
    </kanban>
  </div>
</template>

<script>
import Kanban from './Kanban.vue'
import Task from './Task.vue'

export default {
  data () {
    return {
      stages: ['Unassigned', 'In Progress', 'Waiting', 'Done'],
      tasks: [
        {
          id: 1,
          status: 'Unassigned',
          type: 'validations',
          effectiveDate: '2017-06-07',
        },
        {
          id: 2,
          status: 'In Progress',
          type: 'validations',
          icon: 'fa-check-square-o',
          effectiveDate: '2017-06-06',
          assignedTo: 'Sam'
        },
      ],
    }
  },
  components: {
    'kanban': Kanban,
    'task': Task
  }
}
</script>

<style scoped>
</style>
