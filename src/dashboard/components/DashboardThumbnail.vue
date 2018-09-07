<template>
  <div class="row">
  <div class="well well-sm hoverwell thumbnail">
    <div class="metric row">

      <router-link :to="'/' + measure.link" class="measure">
        <i class="measure-icon fa fa-lg" :class="measure.icon" aria-hidden="true">
          <span class="title">{{measure.title}}</span>
        </i>
      </router-link>

      <div class="filler"></div>

      <sparkline class="sparkline" :id="measure.id" :history="measure.history"></sparkline>
      <div class="error-badge-outer"><error-badge :item="measure"></error-badge></div>
    </div>

    <div class="narrative row" v-if="measure.narrative">
      <transition @enter="heightEnterAnimation" @leave="heightLeaveAnimation" name="slide-fade" type="animation">
        <div :id="narrativeId" class="narrative-text-container" v-show="isExpanded" >
          <hr/>
          <div class="narrative-text">{{ measure.narrative }}</div>
        </div>
      </transition>
    </div>
    <a class="narrative-button" v-if="measure.narrative" 
      @click="isExpanded = !isExpanded">
      <i class="narrative-icon fa" :class="{ 'fa-chevron-down': !isExpanded, 'fa-chevron-up': isExpanded }" aria-hidden="true"></i>
    </a>
  </div>
  </div>
</template>

<script>
import ErrorBadge from '@/common/ErrorBadge.vue'
import Sparkline from './Sparkline.vue'
export default {
  props: {
    measure: { type: Object, required: true }
  },
  data () {
    return {
      isExpanded: false
    }
  },
  methods: {
    heightEnterAnimation (el, done) {
      /* istanbul ignore next */
      this.heightAnimation(el, done, 0, true)
    },
    heightLeaveAnimation (el, done) {
      /* istanbul ignore next */
      this.heightAnimation(el, done, 100, false)
    },
    heightAnimation (el, done, start, expand) {
      /* istanbul ignore next */
      let counter = 0
      /* istanbul ignore next */
      const interval = setInterval(() => {
        const increment = (expand ? 1 : -1) * counter * 5
        el.style.maxHeight = (start + increment) + 'px'
        counter++
        if (counter > 20) {
          clearInterval(interval)
          done()
        }
      }, 20)
    }
  },
  computed: {
    narrativeId: function () { 
      /* istanbul ignore else */
      if (this.measure) {
        return 'narrtext_' + this.measure.id
      }
    }
  },
  components: {
    'error-badge': ErrorBadge,
    sparkline: Sparkline
  }
}
</script>

<style src="./dashboard-thumbnail.css" scoped></style>
<style src="./dashboard-thumbnail-narrative.css" scoped></style>
