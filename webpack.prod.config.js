var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var VueLoaderPlugin = require('vue-loader/lib/plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var merge = require('webpack-merge');
var webpackBaseConfig = require('./webpack.config.js');

//清空基本配置的插件列表
webpackBaseConfig.plugins=[];
module.exports=merge(webpackBaseConfig,{
    output:{
        publicPath:'/dist/',
        //将入口文件重命名为带有20位hash值的唯一文件
        filename:'[name].[hash].js',
        sourceMapFilename:'[name].[hash].map',
    },
    plugins:[
        // 提取css,并重新命名为带有20位hash值的唯一文件
        new ExtractTextPlugin({
            filename:'[name].[hash].css',
            allChunks:true
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
                        drop_console:true
                    }
                }
            })
        ]
    }
});