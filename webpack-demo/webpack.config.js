const { mode } = require("webpack-nano/argv");
// const {
//   MiniHtmlWebpackPlugin,
// } = require("mini-html-webpack-plugin");
// const { WebpackPluginServe } = require("webpack-plugin-serve");
const { merge } = require("webpack-merge");
const parts = require("./webpack.parts");
const cssLoaders = [parts.autoprefix(),parts.tailwind()];


const commonConfig = merge([
    { entry: ["./src"] },
    parts.page({ title: "Demo" }),
    // parts.loadCSS(),
    parts.extractCSS({ loaders: cssLoaders },
    parts.loadImages({ limit: 2000 }),
    ),
  ]);
// console.log('commonConfig', commonConfig);

const productionConfig = merge([parts.eliminateUnusedCSS()]);

const developmentConfig = merge([
    { entry: ["webpack-plugin-serve/client"] },
    parts.devServer(),
  ]);

const getConfig = (mode) => {
    switch (mode) {
        case "production":
                console.log('merge(commonConfig, productionConfig, { mode })', merge(commonConfig, productionConfig, { mode }));
            return merge(commonConfig, productionConfig, { mode });
        case "development":
            return merge(commonConfig, developmentConfig, { mode });
        default:
            throw new Error(`Trying to use an unknown mode, ${mode}`);
    }
};

module.exports = getConfig(mode);


// module.exports = {
//     watch: mode === "development",
//     entry: ["./src", "webpack-plugin-serve/client"],
//     mode,
//     plugins: [
//         new MiniHtmlWebpackPlugin({ context: { title: "Demo" } }),
//         new WebpackPluginServe({
//             port: parseInt(process.env.PORT, 10) || 8080 ,
//             static: "./dist",
//             liveReload: true,
//             waitForBuild: true,
//             host: "127.0.0.1",
//           }),
//     ],
// };