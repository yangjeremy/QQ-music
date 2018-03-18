const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: __dirname + '/script/app.js',
    devtool: 'eval-source-map',
    output: {
        path: __dirname + "/dist",
        // hashDigestLength: 3,
        filename: 'bundle.js'
    },
    devServer: {
    contentBase: "./", //本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true,//实时刷新
    hot: true
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                use: {
                    loader: "babel-loader",
                },
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                  use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                      {loader:"css-loader",
                      options: {
                        minimize: true
                      }},
                      "postcss-loader",
                      "sass-loader"
                    ]
                  }),
                  exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                minimize: true
                            }
                        },
                        "postcss-loader",
                    ]
                }),
                exclude: /node_modules/
            }
           
        ]
    },
    plugins:[
        new webpack.BannerPlugin('QQ音乐demo form陈康'),
        new HtmlWebpackPlugin({
            template: __dirname + "/index.html"
        }),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin("style.css"), //分离css
        new webpack.optimize.UglifyJsPlugin() //压缩JS

    ]
}