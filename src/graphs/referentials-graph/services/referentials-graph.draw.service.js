import Vue from 'vue'
import DrawNodesService from './referentials-graph.drawNodes.service'
import DrawLinksService from './referentials-graph.drawLinks.service'

export default {
  draw(source) {
    return draw(source)
  }
}

const draw = (source) => {
  const nodes = DrawNodesService.drawNodes(source);
  const links = DrawLinksService.drawLinks(source);
  saveOldPositions(nodes);
}

const saveOldPositions = (nodes) => {
  nodes.forEach(function(d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });
}
