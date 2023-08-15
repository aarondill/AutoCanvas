// / @ts-check

"use strict";
// import path from "path";
import TerserPlugin from "terser-webpack-plugin";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import HtmlInlineScriptPlugin from "html-inline-script-webpack-plugin";

/** @typedef {import('webpack').Configuration} WebpackConfig **/

/** @type function: WebpackConfig */
const extensionConfig = (_env, argv) => {
	const mode = argv.mode ?? "none";
	return {
		target: "web",
		mode: mode, // this leaves the source code as close as possible to the original (when packaging we set this to 'production')

		optimization: {
			//Only minimize if production code
			minimize: mode === "production",
			minimizer: [new TerserPlugin()],
		},
		plugins: [
			{
				apply(compiler) {
					compiler.hooks.compilation.tap("DataUrlAdder", compilation => {
						HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tap(
							"Add data url",
							// eslint-disable-next-line no-extra-parens
							data => ((data.html = "data:text/html," + data.html), data)
						);
					});
				},
			},
			new HtmlWebpackPlugin({
				// *Just* include script tags
				templateContent: "",
				inject: "body",
				scriptLoading: "blocking",
			}),
			new HtmlInlineScriptPlugin(),
		],
		output: {
			path: fileURLToPath(new URL("dist", import.meta.url)),
			clean: true,
		},
		resolve: {
			extensions: [".ts", ".js"],
		},
		module: {
			rules: [
				{
					test: /\.ts$/,
					exclude: /node_modules/,
					use: [{ loader: "ts-loader" }],
				},
			],
		},
		devtool: mode === "production" ? undefined : "source-map",
	};
};
export default extensionConfig;
