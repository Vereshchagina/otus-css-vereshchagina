const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCss = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    mode: "production",

    entry: {
        main: path.resolve(__dirname, "./src/index.js")
    },

    output: {
        path: path.resolve(__dirname, "public"),
        filename: "[name].[hash:8].js",
        clean: true,
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
        }),
        new MiniCss({
            filename: "style.css",
        }),
        new CleanWebpackPlugin(),
    ],

    module: {
        rules: [
            {
                test: /\.(c|sa|sc)ss$/i,
                use: [MiniCss.loader, "css-loader", "sass-loader"],
            },
            {
                test: /\.html$/,
                use: "html-loader"
            },
            {
                test: /\.(png|gif|svg|jpg|jpeg)$/,
                type: "asset/resource",
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name]-[hash][ext]',
                }
            },
        ],
    },
};
