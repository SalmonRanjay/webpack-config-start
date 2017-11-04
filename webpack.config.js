const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const VENDOR_LIBS = ['jquery'];

module.exports = {
    entry: {
        bundle: './src/index.js',
        vendor: VENDOR_LIBS
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },
    module: {
        rule: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },{
                test: /\.css$/,
                use: [{
                    loader: 'css-loader'
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        plugin: (loader) => [
                            require('postcss-smart-import'),
                            require('autoprefixer'),
                            require('postcss-mixins'),
                            require('postcss-nested'),
                            require('postcss-simple-vars'),
                            require('postcss-hexrgba')
                        ]
                    }
                }
            ]
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CopyWebpackPlugin([
            { from: './src/assets/images', to: './assets/images' }
        ]),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
          }),
          new ExtractTextPlugin("[name].css"),
    ]
}