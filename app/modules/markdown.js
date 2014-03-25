var marked = require('marked');

var parseMarkdown = module.exports.parseMarkdown = function (input) {
    return marked(input);
};