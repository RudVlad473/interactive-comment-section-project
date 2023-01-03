let mode = process.env.NODE_ENV || "development"

const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
// const BundleAnalyzerPlugin =
//     require("webpack-bundle-analyzer").BundleAnalyzerPlugin

module.exports = {
    mode: mode,
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "[name].bundle.js",
        chunkFilename: "[name].chunk.js",
        assetModuleFilename: "./images/[name][ext]"
    },
    resolve: {
        extensions: [".ts", ".js", ".tsx", ".jsx", ".scss", ".css"]
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource"
            },
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { publicPath: "" }
                    },
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(j|t)sx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/i,
                loader: "html-loader"
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),

        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
        // new BundleAnalyzerPlugin(),
    ],
    devtool: "source-map",
    devServer: {
        static: "public",
        hot: true,
        open: {
            app: {
                name: "firefox"
                //name: "chrome",
            }
        },
        historyApiFallback: true
    },
    target: "web"
}

// output: {
//         path: path.resolve(__dirname, "dist"),
//         filename: "[name].js",
//         assetModuleFilename: "./images/[hash][ext][query]",
//         clean: true,

//     },
