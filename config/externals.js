/**
 * 开发中的外部引用 JS（CDN 加载）
 */
module.exports.devScripts = [
    // {
    //     key: 'react',
    //     value: 'React',
    //     src: '/static/js/react.production.min.js',
    //     type: 'js'
    //     // attributes: {crossorigin: 'anonymous'}
    // },
    // {
    //     key: 'react-dom',
    //     value: 'ReactDOM',
    //     src: '/static/js/react-dom.production.min.js',
    //     type: 'js'
    // },
    // {
    //     key: 'react-router',
    //     value: 'ReactRouter',
    //     src: '/static/js/react-router.min.js',
    //     type: 'js'
    // },
    // {
    //     key: 'react-router-dom',
    //     value: 'ReactRouterDOM',
    //     src: '/static/js/react-router-dom.min.js',
    //     type: 'js',
    // },
    // {
    //     key: 'lodash',
    //     value: '_',
    //     src: '/static/js/lodash.min.js',
    //     type: 'js',
    // },
    // {
    //     key: 'moment',
    //     value: 'moment',
    //     src: '/static/js/moment.min.js',
    //     type: 'js'
    // },
    // {
    //     key: 'antd',
    //     value: 'antd',
    //     src: '/static/js/antd.min.js',
    //     type: 'js'
    // },
    // {
    //     key: '',
    //     value: '',
    //     src: '/static/js/zh-cn.js',
    //     type: 'js'
    // },
    // {
    //     key: '',
    //     value: '',
    //     src: '/static/js/immutable.min.js',
    //     type: 'js'
    // }
]

/**
 * 正式构建中，外部引用的 JS（CDN 加载）
 */
module.exports.prodScripts = [
    {
        key: 'react',
        value: 'React',
        src: '/static/js/react.production.min.js',
        type: 'js'
        // attributes: {crossorigin: 'anonymous'}
    },
    {
        key: 'react-dom',
        value: 'ReactDOM',
        src: '/static/js/react-dom.production.min.js',
        type: 'js'
    },
    {
        key: 'react-router',
        value: 'ReactRouter',
        src: '/static/js/react-router.min.js',
        type: 'js'
    },
    {
        key: 'react-router-dom',
        value: 'ReactRouterDOM',
        src: '/static/js/react-router-dom.min.js',
        type: 'js',
    },
    {
        key: 'lodash',
        value: '_',
        src: '/static/js/lodash.min.js',
        type: 'js',
    },
    {
        key: 'moment',
        value: 'moment',
        src: '/static/js/moment.min.js',
        type: 'js'
    },
    {
        key: 'antd',
        value: 'antd',
        src: '/static/js/antd.min.js',
        type: 'js'
    },
    {
        key: '',
        value: '',
        src: '/static/js/zh-cn.js',
        type: 'js'
    },
    {
        key: '',
        value: '',
        src: '/static/js/immutable.min.js',
        type: 'js'
    }
]
