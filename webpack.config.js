const path = require('path');
module.exports = {
    entry: path.join(__dirname, "/app/index.tsx"),
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "/dist")
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [ ".webpack.js", ".web.js", ".ts", ".tsx", ".js" ]
    },

    module: {
        rules: [ {
            test: /\.tsx$/,

            use: [
                // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
                {
                    loader: "babel-loader"
                }
            ]
        }, {
            test: /\.js$/,
            use: [
                {
                    loader: "source-map-loader"
                }
            ]
        }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
};