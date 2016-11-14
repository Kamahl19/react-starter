const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const aliases = require('./aliases');
const commons = require('./common');

module.exports = {
    title: 'React Starter',
    baseUrl: '/',
    host: 'localhost',
    port: 3000,
    entry: {
        main: [
            'babel-polyfill',
            'whatwg-fetch',
            './src/main',
        ]
    },

    resolve: {
        extensions: ['', '.js', '.jsx', '.json', '.css', '.html', '.less'],
        alias: aliases,
    },

    module: {
        preLoaders: [{
            test: /\.js$/,
            loader: 'source-map-loader'
        }],
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel',
            include: commons.root('src')
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url?limit=10000',
        }, {
            test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=application/font-woff'
        }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=application/octet-stream'
        }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file'
        }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=image/svg+xml'
        }]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: 'body',
            hash: true,
            minify: {
                collapseWhitespace: true,
                removeTagWhitespace: true,
            },
        }),
        new CopyWebpackPlugin([
            { from: 'static' }
        ]),
    ],
};
