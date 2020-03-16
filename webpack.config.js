const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const WebpackBeforeBuildPlugin = require("before-build-webpack")
const NodemonPlugin = require("nodemon-webpack-plugin")
const nodeExternals = require("webpack-node-externals")
const { createDeclarationFiles, getEntry, getPackagesPath } = require("./utils")


module.exports = (env = {}) => ({
    target: "node",
    mode: env.dev ? "development" : "production",
    devtool: env.dev ? "inline-source-map" : false,
    watchOptions: { ignored: /\.d\.ts$/ },
    entry: () => getEntry(env.dev),
    output: {
        filename: "[name]/dist/index.js",
        path: getPackagesPath(),
        libraryTarget: "umd"
    },
    externals: [nodeExternals()],
    resolve: {
        extensions: [
            ".js",
            ".ts"
        ]
    },
    plugins: [
        new WebpackBeforeBuildPlugin((stats, callback) => {

            console.log("Checking type changes in TS files...")
            const status = createDeclarationFiles()

            switch (status) {

                case "created": {

                    console.log("TS declaration files successfully created.")

                    break

                }

                case "updated": {

                    console.log("TS declaration files successfully updated.")

                    break

                }

                default: {

                    console.log("TS declaration files already updated.")

                    break

                }

            }

            callback()

        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                "*/dist/**/*",
                "!*/dist/index.d.ts"
            ]
        }),
        ...env.nodemon ? [new NodemonPlugin()] : []
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.mjs$/,
                type: "javascript/auto"
            }
        ]
    }
})
