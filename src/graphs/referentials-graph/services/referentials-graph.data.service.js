import Vue from 'vue'
import { referentialsGraphModel as graph } from '../model/referentials-graph.model';

export default {
  loadData () {
    const treePromise = Vue.http.get(graph.pathToData + graph.treeFile)
      .then(response => {
        return response.json()
      })
  
    const dataPromise = Vue.http.get(graph.pathToData + graph.dataFile)
      .then(response => {
        return response.json()
      })
    
    return Promise.all([treePromise, dataPromise])  // eslint-disable-line no-undef
      .then(([tree, data]) => {
        return merge(tree, data);
      })
  }
}

const merge = (tree, data) => {
  data.forEach((d) => {
    const node = findByName(d.child, tree);
    if (node) {
      node.orphans = d.orphans;
      node.color = typeof node.orphans !== 'undefined'
        ? node.orphans === 0 ? 'lightgreen' : 'red'
        : node.children ? 'lightsteelblue' : 'white';
    }
  });
  cascadeColor(tree);
  return tree;
}

const findByName = (name, node) => {
  if (name === node.name) {
    return node;
  }
  if (!node.children) {
    return false;
  }
  for (let i = 0; i < node.children.length; i++) {
    const result = findByName(name, node.children[i]);
    if (result) {
      return result;
    }
  }
  return false;   // The node has not been found and we have no more options
}

const cascadeColor = (node) => {
  if (!node.children) {
    return;
  }
  node.children.forEach((child) => {
    cascadeColor(child);
    if (child.color === 'red' || child.color === 'orange') {
      node.color = 'orange';
    }
  });
}

const handleError = (error, method, methodArgs = null) => {
  const msg = `${this.constructor.name}.${method}: ${error}. Method args: ${JSON.stringify(methodArgs)}`;
  console.error(msg);
}
