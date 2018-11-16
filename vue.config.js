//这里有一些新的东西
const cfg = {
    baseUrl: './',
    outputDir:'vip',
    pages: {
        index: {
            entry: 'src/page/index/index.js',
            template: 'public/index.html',
            filename: 'index.html'
        },
        active: {
            entry: 'src/page/active/active.js',
            template: 'public/index.html',
            filename: 'active.html',
        },
        success:{
            entry: 'src/page/success/success.js',
            template: 'public/index.html',
            filename: 'success.html',
        }
    },
    configureWebpack: {
        devServer: {
            disableHostCheck: true
        }
    },
    productionSourceMap: false,
    filenameHashing: false,
    chainWebpack: config => {
        for(const p in cfg.pages){
            config
                .plugin('html-'+p)
                .tap(args => {
                    args[0].minify = {
                        removeAttributeQuotes: false
                    }
                    return args;
                })
        }

    }
}

module.exports = cfg