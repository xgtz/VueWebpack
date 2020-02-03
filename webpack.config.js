var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');  // 提取散落css的插件
var VueLoaderPlugin = require('vue-loader/lib/plugin');    
  
var config={
    entry:{
        main:'./src/main'
    },
    output:{
        path: path.join(__dirname,'./dist'),   // 存放打包后文件的输出目录
        publicPath:'/dist/',                   // 制定资源文件应用的目录
        filename:'[name].js',                  
        chunkFilename:'[name].chunk.js',
        // filename:'main.js',
        sourceMapFilename:'[name].main.map',
    },
    resolve:{
        extensions:['.js','.vue','.json'],
        alias:{
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.join(__dirname,'src')
        }
    },
    devtool:'#source-map',
    module:{
        rules:[
            {
                test:/\.vue$/,
                loader:'vue-loader',
                options:{
                    loaders:{
                        css: ExtractTextPlugin.extract({
                            use:'css-loader',
                            fallback:'vue-style-loader'
                        })
                    }
                }
            },
            {
                test:/\.js$/,
                loader:'babel-loader',
                exclude:/node_modules/
            },
            {
                test:/\.css$/,
                use: ExtractTextPlugin.extract({
                    use:'css-loader',
                    fallback:'style-loader'
                })
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                use:[
                    {
                        loader:'file-loader',
                        options:{
                            esModule:false
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new ExtractTextPlugin("[name].css"),
        //new ExtractTextPlugin("main.css"),
        new VueLoaderPlugin()
    ]
};

module.exports = config;