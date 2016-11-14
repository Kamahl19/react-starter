const webpack = require('webpack');
const lodash = require('lodash');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const baseConfig = require('./config.base');
const commons = require('./common');

module.exports = lodash.merge(baseConfig, {
    devtool: 'source-map',
    debug: false,

    output: {
        path: commons.root('build'),
        filename: '[name].bundle.[hash].js',
        sourceMapFilename: '[file].map',
        chunkFilename: '[id].chunk.js',
        publicPath: '/'
    },

    module: {
        loaders: baseConfig.module.loaders.concat(
            [{
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css?minimize', 'postcss')
            }, {
                test: /\.less$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract('style', 'css?minimize!less', 'postcss')
            }, {
                test: /\.json$/,
                loader: ExtractTextPlugin.extract('json'),
            }]
        )
    },

    plugins: baseConfig.plugins.concat([
        new CopyWebpackPlugin([{ from: 'public', to: 'public' }]),
        new ExtractTextPlugin('[name].bundle.[hash].css', {}),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
                drop_debugger: true,
                passes: 3,
            }
        }),
    ]),

    postcss: [
        autoprefixer({ browsers: ['last 2 versions'] })
    ],
});
