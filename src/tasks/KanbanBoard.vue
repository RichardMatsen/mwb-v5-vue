<template>
    <div class="drag-container">
      <ul class="drag-list">
        <li class="mwb-kanban-list drag-column" 
          v-for="(stage, index) in stages" :key="index" 
          :class="{['drag-column-' + index]: true}">
          <span class="drag-column-header">
            <h2 class="list_title">{{ stage }}</h2>
          </span>
          <div class="drag-options"></div>
          <ul class="drag-inner-list" ref="list" :data-status="stage">
            <li class="mwb-kanban-card drag-item" 
              v-for="block in getBlocks(stage)" :data-block-id="block.id" :key="block.id">
              <slot :name="block.id">
                  <strong>{{ block.status }}</strong>
                  <div>{{ block.id }}</div>
              </slot>
            </li>
          </ul>
        </li>
      </ul>
    </div>
</template>

<script>
  import dragula from 'dragula';
  import './KanbanBoard.scss'

  export default {
    name: 'KanbanBoard',
    props: {
      stages: {},
      blocks: {},
    },
    computed: {
      localBlocks() {
        return this.blocks;
      },
    },
    methods: {
      getBlocks(stage) {
        return this.localBlocks.filter(block => block.status === stage);
      },
    },
    mounted() {
      /* istanbul ignore next */
      dragula(this.$refs.list)
        .on('drag', (el) => {
          el.classList.add('is-moving');
        })
        .on('drop', (block, list) => {
          this.$emit('update-block', block.dataset.blockId, list.dataset.status);
        })
        .on('dragend', (el) => {
          el.classList.remove('is-moving');

          window.setTimeout(() => {
            el.classList.add('is-moved');
            window.setTimeout(() => {
              el.classList.remove('is-moved');
            }, 600);
          }, 100);
        });
    }
  };
</script>

<style scoped>
h2 {
  font-family: 'Shadows Into Light Two', cursive;
  font-size:20px;
  font-weight: bolder;
}
</style>
