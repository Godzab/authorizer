module.exports = {
    plugins: [
        "@babel/plugin-proposal-nullish-coalescing-operator",
        "@babel/plugin-proposal-optional-chaining",
        "@babel/plugin-proposal-object-rest-spread",
        "macros"
    ],
    presets: [
        [
            "@babel/preset-env",
            {
                targets: { node: "current" },
            },
        ],
        ["@babel/preset-react", { runtime: "automatic" }],
        "@babel/preset-typescript",
    ],
};
