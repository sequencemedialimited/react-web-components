import path from 'path'

import Webpack from 'webpack'

import {
  CleanWebpackPlugin
} from 'clean-webpack-plugin'

import TerserPlugin from 'terser-webpack-plugin'

import CopyPlugin from 'copy-webpack-plugin'

const {
  EnvironmentPlugin,
  SourceMapDevToolPlugin
} = Webpack

const clientPath = path.resolve('./client')
const assetsPath = path.resolve('./public/js')

const {
  env: {
    NODE_ENV = 'production'
  } = {}
} = process

export default function common (env, { mode = NODE_ENV } = {}) {
  return {
    mode,
    entry: {
      app: {
        import: [
          path.join(clientPath, 'app/index.jsx')
        ],
        dependOn: [
          'vendors'
        ]
      },
      vendors: [
        'react',
        'react-dom',
        'prop-types'
      ]
    },
    output: {
      path: path.join(assetsPath, 'app'),
      filename: '[name].js'
    },
    stats: {
      colors: true
    },
    module: {
      rules: [
        {
          test: /\.mjs?$|\.cjs?$|\.jsx?$|\.mts?$|\.cts?$|\.tsx?$/,
          use: {
            loader: 'babel-loader'
          },
          exclude: /node_modules/
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin({
        verbose: false,
        cleanOnceBeforeBuildPatterns: [
          path.join(assetsPath, '*.js'),
          path.join(assetsPath, '*.js.map')
        ]
      }),
      new EnvironmentPlugin({ NODE_ENV }),
      new SourceMapDevToolPlugin({ filename: '[name].js.map' }),
      new CopyPlugin({
        patterns: [
          {
            from: path.join(clientPath, 'components'),
            to: path.join(assetsPath, 'components')
          }
        ],
      })
    ],
    optimization: {
      runtimeChunk: 'single',
      minimize: true,
      minimizer: [
        new TerserPlugin()
      ]
    },
    experiments: {
      backCompat: false
    }
  }
}
