const webpack = require('webpack')
const library = '[name]_lib'
const path = require('path')

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: {
        bundles: ['react', 'react-dom', 'react-router', 'react-router-dom', 'antd', 'lodash', 'moment', 'braft-editor']
    },

    output: {
        filename: '[name].dll.js',
        path: path.join(__dirname, '../public/js/'),
        library
    },

    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, '../public/js/[name]-manifest.json'),
            // This must match the output.library option above
            name: library
        })
    ]
}
