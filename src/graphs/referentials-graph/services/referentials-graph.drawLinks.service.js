import {
  referentialsGraphModel as graph
} from '../model/referentials-graph.model';

export default {
  drawLinks(currentNode) {
    return drawLinks(currentNode)
  }
}

const drawLinks = (currentNode) => {
  const linkData = graph.rootNode.links();
  const linkSelect = graph.svg.selectAll('path.link')
    .data(linkData, (d) => {
      return d.target.data.id;
    });
  const linkContainers = linkSelect
    .enter()
    .insert('g', 'g') // 2nd param puts links before nodes, so node is above link in z-order
    .attr('class', 'link');

  drawPath(linkContainers, currentNode);
  drawPathText(linkContainers);
  updatePathText();
  drawTransition(linkSelect, currentNode);
}

const drawPath = (linkEnter, currentNode) => {
  const paths = linkEnter.append('path')
    .attr('class', 'link')
    .attr('id', function (d, i) {
      return d.target.data.id;
    })
    .style('fill', graph.links.fill)
    .style('stroke', graph.links.stroke)
    .style('stroke-width', graph.links.strokewidth)
    .attr('d', (d) => {
      const o = {
        x: currentNode.x0,
        y: currentNode.y0
      };
      return graph.diagonal(o, o);
    })
    .transition()
    .duration(graph.duration)
    .attr('d', (d) => {
      return graph.diagonal(d.source, d.target);
    });
  return paths;
}

const drawPathText = (linkEnter) => {
  const opacity = graph.links.showPathText ? 1 : 1e-6;
  const textPaths = linkEnter.append('text')
    .attr('x', 60)
    .attr('dy', 4)
    .append('svg:textPath')
    .attr('id', function (d, i) {
      return 'TP' + d.target.data.id;
    })
    .attr('class', 'textpath')
    .attr('fill', '#910f00')
    .style('font-size', 10)
    .style('fill-opacity', opacity)
    .attr('xlink:href', (d, i) => {
      return '#' + d.target.data.id;
    })
    .text((d, i) => {
      return d.target.data.parent_FK ? d.target.data.parent_FK.join(', ') : '';
    });
  return textPaths;
}

const updatePathText = () => {
  const opacity = graph.links.showPathText ? 1 : 1e-6;
  const textPathUpdates = graph.svg
    .selectAll('textpath')
    .style('fill-opacity', opacity);
  return textPathUpdates;
}

const drawTransition = (linkSelect, currentNode) => {
  linkSelect
    .transition()
    .duration(graph.duration)
    .attr('d', (d) => {
      return graph.diagonal(d.source, d.target);
    });

  // Transition exiting nodes to the parent's new position.
  linkSelect
    .exit()
    .transition()
    .duration(graph.duration)
    .attr('d', (d) => {
      const o = {
        x: currentNode.x,
        y: currentNode.y
      };
      return graph.diagonal(o, o);
    });
}

const selectAndCount = (title, tag) => {
  const s = graph.svg.selectAll(tag)
  console.log(title, s.size())
}
