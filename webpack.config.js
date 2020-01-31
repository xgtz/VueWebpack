var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config={
    entry:{
        main:'./main'
    },
    output:{
        path: path.join(__dirname,'./dist'),
        publicPath:'/dist/',
        filename:'main.js',
        sourceMapFilename:'main.map',
    },
    devtool:'#source-map',
    module:{
        rules:[
            {
                test:/\.css$/,
                use: ExtractTextPlugin.extract({
                    use:'css-loader',
                    fallback:'style-loader'
                })
            }
        ]
    },
    plugins:[
        new ExtractTextPlugin("main.css")
    ]
};

module.exports = config;