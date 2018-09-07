// import * as d3 from 'd3';
import { d3 } from '../d3-required-modules'
import { referentialsGraphModel as graph } from '../model/referentials-graph.model';

export default {
  drawNodes(source) {
    return drawNodes(source)
  }
}

const drawNodes = (source) => {
  const nodes = positionNodes();
  const nodeSelect = graph.svg.selectAll('g.node')
    .data(nodes, getId );
  refreshNodes(nodeSelect, source);
  return nodes;
}

const positionNodes = () => {
  graph.treeMap(graph.rootNode);
  const nodes = graph.rootNode.descendants().reverse();
  nodes.forEach( (node) => {
    setYAxisFromLevelDepths(node);
  });
  return nodes;
}

const setYAxisFromLevelDepths = (node) => {
  node.y = graph.levelDepths.slice(0, node.depth + 1)
    .reduce((a, b) => { return a + b; }, graph.yOffset);
}

const getId = (d) => {
  return d.data.id || (d.data.id = ++graph.nodeId);
}

const refreshNodes = (nodeSelect, source) => {
  addNewNodes(nodeSelect, source);
  updateNodes(nodeSelect);
  removeNodes(nodeSelect, source);
}

const addNewNodes = (nodeSelect, source) => {
  const nodeEnter = nodeSelect.enter().append('svg:g')
    .attr('class', 'node')
    .on('click', (d) => { graph.nodeClick(d); });

  addTransition(nodeEnter, source);
  addCircles(nodeEnter);
  addText(nodeEnter);
  addTooltips(nodeEnter);
}

const addTransition = (nodeEnter, source) => {
  // Transition from clicked node (or root at start) to final position
  nodeEnter
    .attr('transform', function(d) { return 'translate(' + source.y + ',' + source.x + ')'; })
    .transition()
    .duration(graph.duration)
    .attr('transform', function(d) { return 'translate(' + d.y + ',' + d.x + ')'; });
}

const addCircles = (nodeEnter) => {
  nodeEnter.append('svg:circle')
    .attr('r', graph.circle.radius)
    .attr('cursor', showPointer)
    .attr('stroke', graph.circle.stroke)
    .attr('stroke-width', graph.circle.strokeWidth)
    .style('fill', (d) => { return d.data.color || graph.circle.fill; });
}

const showPointer = (node) => {
  return node.depth < 2 ? 'pointer' : 'default';
}

const addText = (nodeEnter) => {
  nodeEnter.append('svg:text')
    .attr('dx', function(d) { return d.children ? '0em' : '1em'; })
    .attr('dy', function(d) { return d.children ? '-1.35em' : '0.35em'; })
    .style('text-anchor', (d) => { return d.children ? 'end' : 'start'; })
    .text((d) => { return d.data.name; })
    .style('color', 'black')
    .style('font-size', graph.text.fontsize)
    .style('font-family', graph.text.fontfamily)
}

const addTooltips = (nodeEnter) => {
  const divRelation = d3.select('div.relation');
  const divRelationText = d3.select('div.relation .relation-text');
  nodeEnter.selectAll('circle')
    .on('mouseover', (d) => {
      if (!d.data.relation) { 
        return; 
      }
      divRelation.transition()
        .duration(200)
        .style('opacity', 0.7);
      divRelationText.html( d.data.relation );
    })
    .on('mouseout', (d) => {
      divRelation.transition()
        .duration(500)
        .style('opacity', 0);
    });
}

const updateNodes = (nodeSelect) => {
  const nodeUpdate = nodeSelect.transition()
    .duration(graph.duration)
    .attr('transform', (d) => { return 'translate(' + d.y + ',' + d.x + ')'; });

  nodeUpdate.select('circle')
    .attr('r', graph.circle.radius)
    .style('fill', (d) => { return d.data.color || graph.circle.fill; });

  nodeUpdate.select('text')
    .style('fill-opacity', 1);
}

const removeNodes = (nodeSelect, source) => {
  const nodeExit = nodeSelect.exit()
    .transition()
    .duration(graph.duration)
    .attr('transform', function(d) { return 'translate(' + source.y + ',' + source.x + ')'; })
    .remove();
  nodeExit.select('circle')
    .attr('r', 1e-6);
  nodeExit.select('text')
    .style('fill-opacity', 1e-6);
}
