const path = require("path");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

// For sharing global sass variables, mixins etc
const sassResourcesLoader = {
  loader: "sass-resources-loader",
  options: {
    resources: ["./src/assets/scss/_variables.scss"],
  },
};

const NODE_ENV = process.env.NODE_ENV || "development";
const isProd = NODE_ENV === "production";

module.exports = {
  mode: NODE_ENV,

  output: {
    path: resolve("dist"),
    publicPath: "/dist/",
    filename: "js/[name].[chunkhash].js",
    chunkFilename: "js/[name].[chunkhash].js",
  },

  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      "@": resolve("src"),
    },
  },

  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: "eslint-loader",
        enforce: "pre",
        include: resolve("src"),
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          compilerOptions: {
            preserveWhitespace: false,
          },
        },
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: [resolve("src")],
      },
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 4096,
          fallback: {
            loader: "file-loader",
            options: {
              name: "img/[name].[hash:8].[ext]",
            },
          },
        },
      },
      {
        test: /\.(css|scss)$/,
        oneOf: isProd
          ? [
              {
                test: resolve("src/App.vue"),
                use: [
                  MiniCssExtractPlugin.loader,
                  "css-loader",
                  "postcss-loader",
                  "sass-loader",
                ],
              },
              {
                use: [
                  "vue-style-loader",
                  "css-loader",
                  "postcss-loader",
                  "sass-loader",
                  sassResourcesLoader,
                ],
              },
            ]
          : [
              {
                use: [
                  "vue-style-loader",
                  {
                    loader: "css-loader",
                    options: {
                      sourceMap: true,
                      importLoaders: 3,
                    },
                  },
                  {
                    loader: "postcss-loader",
                    options: { sourceMap: true },
                  },
                  {
                    loader: "sass-loader",
                    options: { sourceMap: true },
                  },
                  sassResourcesLoader,
                ],
              },
            ],
      },
    ],
  },

  plugins: [
    new VueLoaderPlugin(),
    new CaseSensitivePathsPlugin(),
    ...(isProd
      ? [
          new MiniCssExtractPlugin({
            filename: "css/common.[chunkhash].css",
          }),

          new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require("cssnano"),
            cssProcessorOptions: {
              preset: ["default"],
            },
            canPrint: true,
          }),
        ]
      : [
          new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
              messages: [
                "Your application is running here http://localhost:8080",
              ],
            },
          }),
        ]),
  ],
};
