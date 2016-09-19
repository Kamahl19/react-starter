/* eslint no-console:0 */

const express = require('express');
const webpack = require('webpack');
const config = require('./webpack/config.dev');

const app = express();
const compiler = webpack(config);

console.log(config);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/public', express.static('public'));

app.listen(3000, (err) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log('Listening at http://localhost:3000');
});
