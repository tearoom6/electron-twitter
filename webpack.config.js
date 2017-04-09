const mainConfig = {
  target: 'electron-main',
  node: {
    __dirname: false,
    __filename: false
  },
  entry: { main: __dirname + '/src/js/main/index.js' },
  output: { path: __dirname + '/app', filename: '[name].js' },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'eslint-loader',
        enforce: 'pre',
        options: {
          fix: true,
          failOnError: false,
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
        ],
      },
      {
        test:   /\.(png|jpg|ttf|otf|eot|svg|woff2?)(\?.+)?$/,
        loader: 'url-loader',
        options:  {
          limit: 30000
        }
      },
    ],
  },
}

const rendererConfig = {
  target: 'electron-renderer',
  node: {
    __dirname: false,
    __filename: false
  },
  entry: { timeline: __dirname + '/src/js/renderer/timeline.js', form: __dirname + '/src/js/renderer/form.js' },
  output: { path: __dirname + '/app', filename: 'renderer_[name].js' },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'eslint-loader',
        enforce: 'pre',
        options: {
          fix: true,
          failOnError: false,
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
        ],
      },
      {
        test:   /\.(png|jpg|ttf|otf|eot|svg|woff2?)(\?.+)?$/,
        loader: 'url-loader',
        options:  {
          limit: 30000
        }
      },
    ],
  },
}

module.exports = [ mainConfig, rendererConfig ]
