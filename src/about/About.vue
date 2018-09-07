<template>
  <div id="docs">
    <header>
      <span>
        <i class="fa fa-lg fa-info-circle" aria-hidden="true"></i>
        <h1 class="title"> Documentation</h1>
      </span>
      <hr />
    </header>
    <section class="doclist">
      <div v-for="(doc, index) in docs" :key="index" v-if="!currentDoc">
        <foldable :minHeight="50" async @toggle="selectDoc(index, $event)">
          <div class="doc" v-html="doc.html" :id="'doc'+index"
            :style="{ 'background-color': doc.isCollapsed ? 'lightgrey' : 'ghostwhite' }"></div>
        </foldable>
        <hr />
      </div>
      <div class="currentDoc" v-if="currentDoc">
        <button type="button" class="close pull-right" @click="closeDoc()" aria-label="Close">
          <i class="fa fa-close" aria-hidden="true"></i> 
        </button>
        <div v-html="currentDoc.html"></div>
      </div>
    </section>
  </div>
</template>

<style src="highlight.js/styles/default.css">
</style>
<style scoped>
#docs {
  padding: 0.5em;
  padding-right: 0.1em;
  top: 0;
  width: 100%;
  height: inherit;
  background-color: ghostwhite;
}
h1.title {
  margin-top: 0;
}
header span {
  display: flex;
  align-items: center;
  margin-top: 0.5em;
  padding-left: 0.5em;
}
header span {
  font-size: xx-large;
}
header h1.title {
  margin-left: 0.5em;
  margin-bottom: 0;
}
header hr {
  height: 10px;
  border: 0;
  box-shadow: 0 10px 10px -10px #8c8b8b inset;
  margin-bottom: 0;
}
section.doclist {
  background-color: ghostwhite;
  padding: 0.5em;
}
section hr {
  height: 5px;
  border: 0;
  box-shadow: 0 5px 5px -5px #8c8b8b inset;
  margin-bottom: 0;
}
div.doc {
  height: 800px;
  overflow: auto;
}
div.currentDoc {
  background-color: ghostwhite;
}
div.currentDoc >>> img {
  width: 90%;
}
button.close {
  color: red;
}
</style>

<style>
.vue-foldable-container {
  transition: max-height 0.5s;
}
.vue-foldable-mask {
  transition: opacity 3s;
}
</style>

<script>
import Vue from "vue";

export default {
  name: "about",
  data() {
    return {
      docs: [
        "Overview.html",
        "code-coverage.html",
        "cypress-e2e-tests.html",
        "measure-calculation.html",
        "dashboard-thumbnail.html",
        "narrative-dropdown-panel.html",
        "scrollbar-css-adjustments.html",
        "Bootstrap collapse in Vue.html",
        "search.component-tests.html",
        "issues.html",
        "npm-audit.html"
      ],
      currentDoc: null
    };
  },
  created() {
    this.structureDocs();
    this.docs.forEach(this.loadDoc);
  },
  methods: {
    structureDocs() {
      this.docs = this.docs.map(name => {
        return { name, html: "", isCollapsed: true };
      });
    },
    loadDoc(doc) {
      const url = `../docs/${doc.name}`;
      return Vue.http
        .get(url)
        .then(response => {
          doc.html = response.body;
        })
        .catch(err => console.error("getFile() failed", err));
    },
    selectDoc(index, event) {
      this.docs[index].isCollapsed = event.isCollapsed;
      this.scrollToTopWhenCollapsing(event.isCollapsed, index);
      this.setCurrentDoc(event.isCollapsed, index);
    },
    scrollToTopWhenCollapsing(isCollapsed, index) {
      if (isCollapsed) {
        const docDiv = this.$el.querySelector("#doc" + index);
        docDiv.scrollTop = 0;
      }
    },
    setCurrentDoc(isCollapsed, index) {
      if (!isCollapsed) {
        this.currentDoc = this.docs[index];
      }
    },
    closeDoc() {
      this.currentDoc.isCollapsed = true;
      this.currentDoc = null;
    }
  },
  computed: {
    allCollapsed() {
      return !this.docs.some(d => d.isCollapsed);
    }
  }
};
</script>
