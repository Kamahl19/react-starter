const webpack = require('webpack');
const lodash = require('lodash');
const baseConfig = require('./config.base');
const commons = require('./common');

module.exports = lodash.merge(baseConfig, {
    devtool: 'cheap-module-eval-source-map',
    debug: true,

    entry: {
        main: baseConfig.entry.main.concat([
            'eventsource-polyfill',
            'webpack-hot-middleware/client',
        ])
    },

    output: {
        path: commons.root('build'),
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js',
        publicPath: '/'
    },

    module: {
        loaders: baseConfig.module.loaders.concat([
            {
                test: /\.css$/,
                loader: 'style!css'
            }, {
                test: /\.less$/,
                exclude: /node_modules/,
                loader: 'style!css!less?sourceMap'
            }, {
                test: /\.json$/,
                loader: 'json',
            }
        ])
    },

    plugins: baseConfig.plugins.concat([
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ])
});
