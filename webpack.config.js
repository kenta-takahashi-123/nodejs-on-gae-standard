const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const AutoPrefixer = require('autoprefixer');
const buildPath = {
  source: path.join(__dirname, 'client/src/'),
  styles: path.join(__dirname, 'client/scss/'),
  output: path.join(__dirname, 'server/public/assets/')
};

module.exports = (env, argv) => {
  console.log("webpack mode: " + argv.mode);
  const isDevelopment = argv.mode === 'development';

  console.log("target browsers: ");
  console.log(require("browserslist")().map(x => "  - " + x).join("\n"));

  return [
    {
      entry: [
        path.join(buildPath.source, 'main.ts'),
        path.join(buildPath.styles, 'index.scss')
      ],
      output: {
        path: buildPath.output,
        filename: 'main.bundle.js'
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: "styles.bundle.css"
        })
      ],
      resolve: {
        extensions: ['.ts', '.js', '.json']
      },
      devtool: isDevelopment ? "inline-source-map" : false,
      optimization: {
        minimizer: isDevelopment ? [] : [
          new TerserPlugin({}),
          new OptimizeCSSAssetsPlugin({})
        ]
      },
      module: {
        rules: [
          {
            test: /\.ts$/,
            loader: 'ts-loader'
          },
          {
            test: /\.scss$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  sourceMap: isDevelopment
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: isDevelopment
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: isDevelopment,
                  postcssOptions: {
                    plugins: [
                      [AutoPrefixer, { grid: true }],
                    ]
                  }
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: isDevelopment,
                  implementation: require('sass')
                }
              }
            ]
          }
        ]
      }
    }
  ];
};
