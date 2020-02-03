const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const DESTINATION = path.resolve(__dirname, 'dist');

module.exports = {
	entry: path.join(__dirname, '/main.ts'),
	output: 
	{
		path: DESTINATION,
		filename: 'bootcamp-ui-kit.min.js',
	},
	module: 
	{
		rules: 
		[
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test:/\.(s*)css$/,
				use:
				[
					MiniCssExtractPlugin.loader,
					{
					  loader: "css-loader"
					},
					"sass-loader"
				]
			}
		]
	},
	resolve: 
	{
		extensions: [".tsx", ".ts", ".js"]
	},
	externals: 
	{
		jquery: 'jQuery'
	},
	optimization: 
	{
		minimizer: 
		[
		  new OptimizeCSSAssetsPlugin({})
		]
	},
	plugins: 
	[
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
		  // Options similar to the same options in webpackOptions.output
		  // both options are optional
		  filename: "bootcamp-ui-kit.min.css",
		  chunkFilename: "[name].css"
		}),
		new HtmlWebpackPlugin({
		  inject: false,
		  hash: true,
		  template: 'index.html',
		  filename: 'index.html'
		}),
		new CopyWebpackPlugin(
		[
		  {
			from: './src/asset/',
			to: DESTINATION + '/asset/',
			toType: 'dir'
		  },
		  {
			from: "./node_modules/jquery/dist/jquery.min.js",
			to: DESTINATION + '/vendors/jquery.min.js'
		  }
		], {})
	]
};
