module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
            ? ''
            : '/',
    configureWebpack: {
        devServer: {
            disableHostCheck: true
        }
    },
    // filenameHashing:false,
    productionSourceMap: false,
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].minify = {
                    removeAttributeQuotes: false    //禁止取消属性值上的双引号
                };
                // args[0].hash=true;   //在资源引用后面增加?hash
                return args;
            })
        // config.plugins.delete('prefetch-' + p)    //移除预加载
        config.module
              .rule('images')
                .use('url-loader')
                  .loader('url-loader')
                  .tap(options => Object.assign(options, { limit: 1 }))
    }
}
