
Task:
  Migrating from Angular with Bootstrap 3 js + jQuery.
  Target div has collapse class and button has...
    data-toggle="collapse" [attr.data-target]="'#narrtext_'+measure.id"
    ...which relies on Bootstrap js.

Emulating the Angular setup:
  In Vue, Bootstrap 3 js complains about not seeing jQuery even if it is imported.

Trying packaged modules:
  Vue-strap doesn't have a component for collapse
  BootstrapVue is for Bootstrap 4

First attempt mixing Vue transition directive and Bootstrap collapse/in classes:
  Use :class="{in: isExpanded}" to add/remove the in class from the target div (otherwise remains collapsed).
  Use: v-show="isExpanded" as hook for animation.
  Note, no animation on the height of the well.
  Works ok, but can be simplified by removing bootstrap collapse.

Final solution:
  Remove collapse from target div (narrative text + hr).
  Use <transition name="slide-fade" type="animation" @enter="heightEnterAnimation" @leave="heightLeaveAnimation"> wrapper around target div.
  Use: v-show="isExpanded" as hook for animation.
  Use the following animation css:

    .slide-fade-enter {
      /* transform: translateY(20px); */ 
      opacity: 0;
    }
    .slide-fade-enter-active {
      animation: slide-in 1s ease-out forwards;
      transition: opacity 0.5s;
    }
    .slide-fade-leave {
    }
    .slide-fade-leave-active {
      animation: slide-out 0.2s ease-out forwards;
      transition: opacity 0.2s;
      opacity: 0;
    }
    @keyframes slide-in {
      from {
        transform: translateY(20px)
      }
      to {
        transform: translateY(0)
      }
    }
    @keyframes slide-out {
      from {
        transform: translateY(0)
      }
      to {
        transform: translateY(20px)
      }
    }
  
  To animate the height, use javascript animation hooks (@enter="heightEnterAnimation" @leave="heightLeaveAnimation") with the following code:

    methods: {
      heightEnterAnimation (el, done) {
        this.heightAnimation(el, done, 0, true)
      },
      heightLeaveAnimation (el, done) {
        this.heightAnimation(el, done, 100, false)
      },
      heightAnimation (el, done, start, expand) {
        let counter = 0
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
  