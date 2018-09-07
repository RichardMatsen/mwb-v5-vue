<template>
  <div :style="{ cursor, userSelect, flexDirection }" class="vue-splitter" 
      @mouseup="onUp" @mousemove="onMouseMove" @touchmove="onMove" @touchend="onUp">

    <div :style="leftPaneStyle" class="left-pane splitter-pane" v-if="showLeft">
      <slot name="left-pane"></slot>
    </div>

    <div class="splitter" :class="{active}" :style ="splitterStyle" 
      @mousedown="onDown" @click="onClick" @touchstart.prevent="onDown"
      v-if="showLeft && showRight">
    </div>

    <div :style="rightPaneStyle" class="right-pane splitter-pane" v-if="showRight">
      <slot name="right-pane"></slot>
    </div>

  </div>
</template>

<style lang="scss">
.vue-splitter {
  display: flex;
  .splitter-pane {
    height: 99vh;
    overflow-y: auto;
  }
  .splitter {
    background-color: #9e9e9e;
  }
}
</style>
<script>
// Ref: https://github.com/rmp135/vue-splitter
export default {
  props: {
    config: {
      startPanelLeft: {
        type: Number,
        default: 50
      },
      minPanelLeft: {
        type: Number,
        default: 10
      },
      minPanelRight: {
        type: Number,
        default: 10
      },
      horizontal: {
        type: Boolean,
        default: false
      }
    },
    showLeft: {
      type: Boolean,
      default: true
    },
    showRight: {
      type: Boolean,
      default: true
    }
  },
  created() {
    this.percent = this.config.startPanelLeft;
  },
  data() {
    return {
      active: false,
      percent: this.startPanelLeft,
      hasMoved: false
    };
  },
  computed: {
    flexDirection() {
      return this.config.horizontal ? "column" : "row";
    },
    splitterStyle() {
      return this.config.horizontal
        ? { height: "5px", cursor: "ns-resize" }
        : { width: "5px", cursor: "ew-resize" };
    },
    leftPaneStyle() {
      const percent = this.showRight ? this.percent : 100;
      return this.config.horizontal
        ? { height: "100%" }
        : { width: percent + "%" };
    },
    rightPaneStyle() {
      const percent = this.showLeft ? this.percent : 0;
      return this.config.horizontal
        ? { height: 100 - percent + "%" }
        : { width: 100 - percent + "%" };
    },
    userSelect() {
      return this.active ? "none" : "";
    },
    cursor() {
      return this.active
        ? this.config.horizontal ? "ns-resize" : "ew-resize"
        : "";
    }
  },
  methods: {
    onClick() {
      if (!this.hasMoved) {
        this.percent = this.config.startPanelLeft;
        this.$emit("resize", this.percent);
      }
    },
    onDown(e) {
      this.active = true;
      this.hasMoved = false;
    },
    onUp() {
      this.active = false;
    },
    onMove(e) {
      let offset = 0;
      let target = e.currentTarget;
      let percent = 0;
      if (this.active) {
        if (this.config.horizontal) {
          while (target) {
            offset += target.offsetTop;
            target = target.offsetParent;
          }
          percent =
            Math.floor(
              (e.pageY - offset) / e.currentTarget.offsetHeight * 10000
            ) / 100;
        } else {
          while (target) {
            offset += target.offsetLeft;
            target = target.offsetParent;
          }
          percent =
            Math.floor(
              (e.pageX - offset) / e.currentTarget.offsetWidth * 10000
            ) / 100;
        }
        if (
          percent > this.config.minPanelLeft &&
          percent < 100 - this.config.minPanelRight
        ) {
          this.percent = percent;
        }
        this.$emit("resize", this.percent);
        this.hasMoved = true;
      }
    },
    onMouseMove(e) {
      if (e.buttons === 0 || e.which === 0) {
        this.active = false;
      }
      this.onMove(e);
    }
  }
};
</script>
