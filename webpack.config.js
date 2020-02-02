var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var VueLoaderPlugin = require('vue-loader/lib/plugin');


var config={
    entry:{
        main:'./main'
    },
    output:{
        path: path.join(__dirname,'./dist'),
        publicPath:'/dist/',
        filename:'[name].js',
        chunkFilename:'[name].chunk.js'
        //sourceMapFilename:'main.map',
    },
    //devtool:'#source-map',
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