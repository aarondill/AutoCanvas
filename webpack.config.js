// / @ts-check

"use strict";
// import path from "path";
import TerserPlugin from "terser-webpack-plugin";
import { fileURLToPath } from "url";

/** @typedef {import('webpack').Configuration} WebpackConfig **/

/** @type function: WebpackConfig */
const extensionConfig = (env, argv) => {
	return {
		target: "web",
		mode: "none", // this leaves the source code as close as possible to the original (when packaging we set this to 'production')

		optimization: {
			//Only minimize if production code
			minimize: argv.mode === "production",
			minimizer: [new TerserPlugin()],
		},
		entry: "./src/index.ts", // the entry point of this extension, 📖 -> https://webpack.js.org/configuration/entry-context/
		output: {
			// the bundle is stored in the 'dist' folder (check package.json), 📖 -> https://webpack.js.org/configuration/output/
			path: fileURLToPath(new URL("dist", import.meta.url)),
			filename: "index.js",
		},
		resolve: {
			// support reading TypeScript and JavaScript files, 📖 -> https://github.com/TypeStrong/ts-loader
			extensions: [".ts", ".js"],
		},
		module: {
			rules: [
				{
					test: /\.ts$/,
					exclude: /node_modules/,
					use: [
						{
							loader: "ts-loader",
						},
					],
				},
			],
		},
		devtool: "nosources-source-map",
	};
};
export default extensionConfig;
