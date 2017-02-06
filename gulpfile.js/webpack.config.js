var config      = require('./config.json');
var path = require('path');

module.exports = {
    watch: true,
    entry: config.root.src + '/js/app.js',
    output: {
        filename: 'app.js'
    }
}