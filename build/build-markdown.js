/*
  Convert markdown docs to html for display at runtime.

  Using markdown.js, can generate intermediate token tree and html tree
  which is handy for making adjustments (e.g image path prefix and image scaling)
  See recursive function apply_to_htmlTree at the end of the file.

  However, marked.js has better fenced code display, using highlight.js
  It requires a reference to <style src="highlight.js/styles/default.css"> to apply colors to hljs classes.
  Also requires a deep scoped style to implement image scaling (deep scoping is needed since the html is dynamic)
    div.currentDoc >>> img {
      width: 90 % ;
    }

*/

var ora = require('ora')
var fs = require('fs');
var path = require('path')
var marked = require('marked');

var spinner = ora('compiling markdown to html...')
spinner.start()

marked.setOptions({
  renderer: new marked.Renderer(),
  baseUrl: 'static/docs/',
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  },
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
});

var sourceFolder = './static/docs'
fs.readdir(sourceFolder, function (err, files) {
  if (err) {
    console.error("Could not list the directory.", err);
    process.exit(1);
  }

  files
    .filter(file => path.extname(file) === '.md')
    .forEach(function (file, index) {
      const fromPath = path.join(sourceFolder, file);
      let content = fs.readFileSync(fromPath, 'utf8')
      // html = convertWithMarkdown(content)
      html = marked(content)

      const toPath = path.join(sourceFolder, path.basename(file, '.md') + '.html');
      fs.writeFileSync(toPath, html);
      console.log(toPath)
    });
  spinner.stop()
});

// function convertWithMarkdown(content) {
//   var md = require("markdown").markdown;
//   var tree = md.parse(text);
//   var htmlTree = md.toHTMLTree(tree);
//   apply_to_htmlTree(htmlTree, 'img', (src) => {
//     adjustImgPath(src);
//   })
//   var html = md.renderJsonML();
//   return html;
// }

// function adjustImgPath(src) {
//   return 'static/docs/' + (src[0] === '.' ? src.slice(2) : src);
// }

// function apply_to_htmlTree(htmlTree, node_type, fn) {
//   function apply_to_node(jsonml) {
//     if (!Array.isArray(jsonml)) {
//       return;
//     }
//     if (jsonml[0] === node_type) {
//       fn(jsonml);
//     }
//     jsonml.slice(1).forEach(node => {
//       apply_to_node(node);
//     })
//   }
//   htmlTree.forEach(apply_to_node);
// }
