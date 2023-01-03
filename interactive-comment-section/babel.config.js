module.exports = {
    presets: [
        "@babel/preset-env",
        "@babel/preset-react",
        ["@babel/preset-typescript", { runtime: "automatic" }],
    ],
    plugins: [
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-proposal-class-properties",
    ],
}
