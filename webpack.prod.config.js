var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var VueLoaderPlugin = require('vue-loader/lib/plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var merge = require('webpack-merge');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var webpackBaseConfig = require('./webpack.config.js');

//清空基本配置的插件列表
webpackBaseConfig.plugins=[];
module.exports=merge(webpackBaseConfig,{
    output:{
        publicPath:'/dist/',
        //将入口文件重命名为带有20位hash值的唯一文件
        filename:'[name].[hash].js',
        chunkFilename:'[name].[hash].chunk.js'
        //sourceMapFilename:'[name].[hash].map',
    },
    plugins:[
        // 提取css,并重新命名为带有20位hash值的唯一文件
        new ExtractTextPlugin({
            filename:'[name].[hash].css',
            allChunks:true      //true表示会把所有的css都提取出来，false只会把初始化的提取，默认是false
        }),
        //定义当前node环境为生产环境
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV:'"production"'
            }
        }),
        // 压缩js
        // new webpack.optimize.UglifyJsPlugin({
        //     compress:{
        //         warnings:false
        //     }
        // }),
        // 提取模板,并保存入口html文件
        new HtmlwebpackPlugin({
            filename: '../index_prod.html',
            template: './index.ejs',
            inject: false
        }),
        new CopyWebpackPlugin([
            {
                from:path.join(__dirname,'./static'),  // 不打包直接输出的文件
                to:'static',  // 打包后静态文件放置位置
                ignore:['.*']  // 忽略规则。（这种写法表示将该文件夹下的所有文件都复制）
            }
        ]),
        new VueLoaderPlugin()
    ],
    optimization:{
        minimizer:[
            new UglifyJsPlugin({
                uglifyOptions:{
                    output:{
                        comments:false
                    },
                    compress:{
                        //warnings:false,
                        drop_debugger:true,
                        drop_console:false
                    }
                }
            })
        ]
    }
});