const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const buildPath = {
  source: path.join(__dirname, 'client/src/'),
  styles: path.join(__dirname, 'client/scss/'),
  output: path.join(__dirname, 'server/public/assets/')
};
const autoPrefixerTargetBrowsers = [
  "last 1 versions",
  "> 1%",
  "maintained node versions",
  "not dead"
];

module.exports = (env, argv) => {
  console.log("webpack mode: " + argv.mode);
  const isDevelopment = argv.mode === 'development';

  console.log("target browsers: ");
  console.log(require("browserslist")(autoPrefixerTargetBrowsers).map(x => "  - " + x).join("\n"));

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
                  plugins: [
                    require("autoprefixer")({
                      browsers: autoPrefixerTargetBrowsers
                    })
                  ]
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: isDevelopment
                }
              }
            ]
          }
        ]
      }
    }
  ];
};
