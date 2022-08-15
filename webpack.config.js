const path = require('path');
const webpack = require('webpack');
const Uglify = require('uglifyjs-webpack-plugin');

let MODE = process.argv[process.argv.length - 1].substr(1) === 'prod' ? 'production' : 'development';

console.log(process.argv[process.argv.length - 1]);

const config = {
    entry  : path.resolve(__dirname, './blocks/index.js'),
    mode   : MODE,
    devtool: MODE === 'development' ? 'inline-source-map' : false, // Инициализируем sourcemaps в зависимости от окружения
    output : {
      filename: 'main.js',
      path: path.resolve(__dirname, '../public')
    },
    module: {

      rules: [
        {
        test: /\.(js)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
            presets: ['@babel/preset-env'],
            plugins: ['babel-plugin-transform-regenerator']
          }
        }
      ]
    }
};

module.exports = config;