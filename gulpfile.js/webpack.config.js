var config  = require('./config.json');
var path    = require('path');


module.exports = {
  entry: config.root.src + '/js/app.ts',
  module: {
    rules: [{
      //test: /\.tsx?$/,
      loader: 'ts-loader', 
      options: {
        transpileOnly: true,
        configFileName: './gulpfile.js/tsconfig.json'
      },
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: 'app.js'
  }
}