var config  = require('./config.json');
var path    = require('path');


module.exports = {
  entry: config.root.src + '/js/app.ts',
  module: {
    rules: [

      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
          // other vue-loader options go here
        }
      },

      {
        test: /\.tsx?$/,
        loader: 'ts-loader', 
        options: {
          transpileOnly: true,
          appendTsSuffixTo: [/\.vue$/],
          configFileName: './gulpfile.js/tsconfig.json'
        }
      }
    ]
  },
  /*resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },*/
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  output: {
    filename: 'app.js'
  }
}