const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",

  entry: {
    main: path.resolve(__dirname, "./src/index.js")
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash:8].js",
    clean: true,
  },

  devServer: {
    compress: false,
    port: 3000,
    open: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.(c|sa|sc)ss$/i,
        use: ["style-loader", "css-loader", "sass-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  "autoprefixer",
                  "postcss-preset-env",
                  "postcss-deadcss",
                  "at-rule-packer",
                ]
              }
            }
          }
        ],
      },

      {
        test: /\.html$/,
        use: "html-loader"
      },

      {
        test: /\.(png|gif|svg|jpg|jpeg)$/,
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75
              }
            }
          },
        ],
        type: "asset/resource",
      },

      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource",
        generator: {
          filename: 'fonts/[name]-[hash][ext]',
        }
      },
    ],
  },
};