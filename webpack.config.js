const path = require('path');
const fs = require('fs');
const CssPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

/* -----------------------------------
 *
 * Server
 *
 * -------------------------------- */

const server = {
   entry: path.join(__dirname, 'src/server'),
   mode: 'development',
   target: 'node',
   externals: fs.readdirSync('node_modules'),
   output: {
      path: path.join(__dirname, 'dist'),
      filename: 'server.js',
      libraryTarget: 'commonjs2',
   },
   node: {
      __filename: false,
      __dirname: false,
   },
   resolve: {
      extensions: [
         '.js',
         '.ts',
         '.tsx',
         '.json',
         '.scss',
         '.ttf',
         '.woff',
         '.svg',
         '.eot',
      ],
      alias: {
         '@': path.resolve(__dirname, 'src'),
      },
   },
   module: {
      rules: [
         {
            test: /\.tsx?$/,
            use: [{ loader: 'ts-loader' }],
         },
         {
            test: /\.jsx?$/,
            use: [
               {
                  loader: 'babel-loader',
                  options: {
                     presets: ['@babel/preset-env'],
                     plugins: ['@babel/plugin-proposal-object-rest-spread'],
                  },
               },
            ],
         },
      ],
   },
};

/* -----------------------------------
 *
 * Client
 *
 * -------------------------------- */

const client = {
   entry: [
      path.join(__dirname, 'src/styles/template'),
      path.join(__dirname, 'src/client'),
   ],
   mode: 'development',
   target: 'web',
   context: path.join(__dirname, 'src'),
   output: {
      path: path.join(__dirname, 'dist/public'),
      filename: 'client.js',
   },
   resolve: {
      extensions: [
         '.js',
         '.ts',
         '.tsx',
         '.json',
         '.scss',
         '.ttf',
         '.woff',
         '.svg',
         '.eot',
      ],
      alias: {
         '@': path.resolve(__dirname, 'src'),
      },
   },
   module: {
      rules: [
         {
            test: /\.tsx?$/,
            use: [
               {
                  loader: 'ts-loader',
               },
            ],
         },
         {
            test: /\.jsx?$/,
            use: [
               {
                  loader: 'babel-loader',
                  options: {
                     presets: ['@babel/preset-env'],
                     plugins: ['@babel/plugin-proposal-object-rest-spread'],
                  },
               },
            ],
         },
         {
            test: /\.s[ac]ss$/i,
            use: [
               { loader: CssPlugin.loader },
               { loader: 'css-loader' },
               {
                  loader: 'sass-loader',
                  options: {
                     sassOptions: {
                        outputStyle: 'compressed',
                     },
                  },
               },
            ],
         },
      ],
   },
   plugins: [
      new CssPlugin({
         filename: 'style.css',
      }),
      new CopyPlugin([
         {
            from: './public',
         },
      ]),
   ],
};

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

module.exports = [server, client];
