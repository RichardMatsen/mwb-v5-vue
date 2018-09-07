<template>
  <div class="card referentials-graph">
    <div id="graphContainer">
      <div id="content" class="row">
        <div class="col-md-7">
          <div class="d3-graph" id="graph"></div>
        </div>
        <div class="col-md-3 col-md-offset-1">
            <div id="footer" class="row pull-right" style="margin-top: 530px">

              <div class="row">
                <h2>Extract Referential Integrity</h2>
                <div class="hint">
                  <p class="pull-right">Green: ok, Red: errors, Orange: child has errors</p>
                </div>
                <br/>
                <hr/>
              </div>

              <div class="relation row">
                <h4 class="relation-title">Relationship</h4>
                <h6 class="relation-text"></h6>
              </div>

            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { d3 } from './d3-required-modules'
import DataService from './services/referentials-graph.data.service'
import DrawService from './services/referentials-graph.draw.service'
import ToggleService from './services/referentials-graph.toggle.service'
import { referentialsGraphModel as graph } from './model/referentials-graph.model';

export default {
  data () {
    return {
      graph: graph
    }
  },
  methods: {
    initialize () {
      this.initGraphModel();
      graph.links.showPathText = false;
      DataService.loadData()
        .then(data => {
          graph.treeData = data;
          graph.show
          this.nodifyData(data);
          this.positionNodes();
          DrawService.draw(graph.rootNode);
        })
    },
    initGraphModel() {
      graph.innerWidth = graph.width - graph.margins.right - graph.margins.left;
      graph.innerHeight = graph.height - graph.margins.top - graph.margins.bottom;
      graph.nodeClick = ToggleService.nodeClick;
      graph.duration = d3.event && d3.event.altKey ? 5000 : 500;
      graph.diagonal = this.diagonal;
      this.initSvgInTemplate();
      this.initTreeMap();
    },
    initSvgInTemplate() {
      const graphElement = d3.select('.d3-graph')
      graph.svg = graphElement
        .append('svg')
        .attr('width', graph.width)
        .attr('height', graph.height)
        .append('g')
        .attr('transform', 'translate(' + graph.margins.left + ',' + graph.margins.top + ')')
    },
    initTreeMap() {
      graph.treeMap = d3.tree()
        .size([graph.innerHeight, graph.innerWidth]);
    },
    nodifyData(data) {
      graph.rootNode = d3.hierarchy(data);
      graph.rootNode.x0 = (graph.innerHeight / 2) + graph.margins.bottom;
      graph.rootNode.y0 = graph.yOffset;
    },
    positionNodes() {
      graph.treeMap(graph.rootNode);
      graph.rootNode.x0 = graph.innerHeight / 2;
      graph.rootNode.y0 = 0;
    },
    diagonal(source, target) {
      // Creates a curved (diagonal) path from parent to the child nodes
      const path = `M ${source.y} ${source.x}
              C ${(source.y + target.y) / 2} ${source.x},
                ${(source.y + target.y) / 2} ${target.x},
                ${target.y} ${target.x}`;
      return path;
    }
  },
  mounted () {
    this.initialize()
  }
}
</script>

<style scoped src="./referentials-graph.css">
</style>
<style scoped>

  div.card {
    zoom: 1.0;
    margin-top: 1em;
    background-color: rgba(176,	226, 255, 0.2); /* lightskyblue */
    background-blend-mode: lighten;
  }
  @media (max-width: 996px) {
    div.card {
      zoom: 0.8;
    }
  }
</styles>
