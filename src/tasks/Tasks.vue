<template>
  <div id="mwb-tasks">
    <h1>Tasks</h1>
    <hr/>
    <kanban-board :stages="stages" :blocks="tasks">
      <task v-for="task in tasks" :key="task.id" :slot="task.id" :task="task"></task>
    </kanban-board>
  </div>
</template>

<script>
import Vue from 'vue'
import KanbanBoard from './KanbanBoard.vue'
import Task from './Task.vue'

export default {
  data () {
    return {
      stages: ['Unassigned', 'In Progress', 'Waiting', 'Done'],
      tasks: []
    }
  },
  created() {
    this.getTasks();
  },
  methods: {
    getTasks() {
      Vue.http.get('kanban/kanban.json')
      .then(response => {
        const lists = response.body.lists
        this.tasks = lists
          .map(list => list.cards)
          .reduce((acc, cards) => acc.concat(cards), [])
      })
      .catch(err => console.error('getTasks() failed', err) )
    },
  },
  components: {
    'kanban-board': KanbanBoard,
    'task': Task
  }
}
</script>

<style scoped>
</style>
