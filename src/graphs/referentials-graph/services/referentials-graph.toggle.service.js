import { referentialsGraphModel as graph } from '../model/referentials-graph.model';
import DrawService from './referentials-graph.draw.service'

export default {
  nodeClick(node) {
    return nodeClick(node)
  }
}

const nodeClick = (node) => {
  if (node.depth === 0) {
    graph.links.showPathText = false;
    hideAll(node);
    DrawService.draw(node);
    showAll(node);
    DrawService.draw(node);
    return;
  }
  if (node.depth === 1) {
    graph.links.showPathText = true;
    closeSiblings(node);
    showAll(node);
    DrawService.draw(node);
    return;
  }
}

const toggleChildren = (parent) => {
  let anyOpen = false;
  parent.children.forEach((child) => {
    if (child.children) {
      anyOpen = true;
    }
  });
  if (anyOpen) {
    parent.children.forEach((child) => {
      hideAll(child);
    });
  } else {
    showAll(parent);
  }
}

const hide = (d) => {  // Remove children array but save content
  if (!d.children) { return; }
  d._children = d.children;
  d.children = null;
}

const show = (d) => {  // Restore children array
  if (!d._children) { return; }
  d.children = d._children;
  d._children = null;
}

const hideAll = (d) => {
  (d.children || d._children || []).forEach((c) => {
    hideAll(c);
  });
  hide(d);
}

const showAll = (d) => {
  (d.children || d._children || []).forEach((c) => {
    showAll(c);
  });
  show(d);
}

const toggleAll = (d) => {
  (d.children || d._children || []).forEach(function (c) {
    toggleAll(c);
  });
  toggle(d);
}

const toggle = (d) => {
  if (d.children) {
    hide(d);
  } else {
    if (d._children) {
      show(d);
    }
  }
}

const closeSiblings = (current) => {
  current.parent.children.forEach((sibling) => {
    if (sibling !== current) {
      hide(sibling);
    }
  });
}

const closeChildren = (parent) => {
  parent.children.forEach((child) => {
    hide(child);
  });
}
