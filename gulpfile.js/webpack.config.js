var config      = require('./config.json');
var path = require('path');

// console.log(config.root.src)

module.exports = {
    // watch: true,
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