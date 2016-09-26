const resolve = require('path').resolve;

const src = [__dirname, '../', 'src'];

module.exports = {
    '@': resolve(...src),
    '@actions': resolve(...src, 'actions'),
    '@components': resolve(...src, 'components'),
    '@constants': resolve(...src, 'constants'),
    '@containers': resolve(...src, 'containers'),
    '@reducers': resolve(...src, 'reducers'),
    '@routes': resolve(...src, 'routes'),
    '@redux': resolve(...src, 'redux'),
    '@styles': resolve(...src, 'styles'),
    '@utils': resolve(...src, 'utils'),
};
