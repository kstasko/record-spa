const path = require('path');

module.exports = {
    target: 'node',
    mode: 'development',
    entry: './src/lambda.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'lambda.js',
        libraryTarget: 'commonjs'
    },
    resolve: {
        extensions: [".webpack.js", ".ts", ".js"],
        modules: ["node_modules", `${__dirname}/node_modules`]
    },
    module: {
        rules: [
            {test: /\.ts?$/, loader: "ts-loader"}
        ]
    }
};