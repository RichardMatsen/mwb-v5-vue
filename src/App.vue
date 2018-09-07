<template>
  <div id="app">
    <splitter :config="splitterConfig" @resize="onResize" :showLeft="docsPanelIsOpen">
      <template slot="left-pane">
        <div class="docs" :style="docsPanelStyle">
          <mwb-about></mwb-about>
        </div>
      </template>
      <template slot="right-pane">
        <div class="content container-fluid">
          <mwb-navigation></mwb-navigation>
          <transition name="slide" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
      </template>
    </splitter>
  </div>
</template>

<script>
import Nav from "./nav/Nav";
import About from "./about/About";
import router from "./router/routes";
import splitter from "./common/splitter/Splitter";
import debounce from "debounce";

export default {
  name: "app",
  components: {
    "mwb-navigation": Nav,
    "mwb-about": About,
    splitter
  },
  data() {
    return {
      docsPanelStyle: { zoom: `${33 + 50}%`, height: "100vh" },
      splitterConfig: {
        minPanelLeft: 20,
        minPanelRight: 50,
        startPanelLeft: 50
      }
    };
  },
  computed: {
    docsPanelIsOpen() {
      return this.$store.state.ui.docsPanelIsOpen;
    }
  },
  methods: {
    onResize: debounce(function(x) {
      this.docsPanelStyle = { zoom: `${x + 50}%` };
    }, 300)
  }
};
</script>
<style src="./app-animation.css"></style>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
}
.vue-splitter {
  width: 100%; /* For RH pane correct resize */
  height: 99vh; /* maintain height when zoom is adjusted */
}
.vue-splitter .splitter:hover {
  background-color: burlywood;
}
.vue-splitter .splitter.active {
  background-color: rosybrown;
}
</style>
