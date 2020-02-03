var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var VueLoaderPlugin = require('vue-loader/lib/plugin');
var apiMocker = require('webpack-api-mocker');

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

  
var config={
    entry:{
        main:'./src/main'
    },
    output:{
        path: path.join(__dirname,'./dist'),
        publicPath:'/dist/',
        filename:'[name].js',
        chunkFilename:'[name].chunk.js'
        //sourceMapFilename:'main.map',
    },
    resolve:{
        extensions:['.js','.vue','.json'],
        alias:{
            'vue$': 'vue/dist/vue.esm.js',
            '@':resolve('src')
        }
    },
    //devtool:'#source-map',
    devServer:{
        // port:8009, //端口号
        // hot:true,  //是否使用热更新
        // compress:true, // 压缩
        // historyApiFallback:true,
        // contentBase:path.join(__dirname,'output'), 
        before(app){
            apiMocker(app,path.resolve('./mock/index.js'),{
                proxy:{
                    '/repos/*':'https://api.github.com'
                },
                changeHost:true
            })
        }
    },
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
        new VueLoaderPlugin()
    ]
};

module.exports = config;