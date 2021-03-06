module.exports = {
    presets: [
        [
            "@babel/react",
            {
                "modules": false
            }
        ]
    ],
    plugins: [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-transform-classes",
        "@babel/plugin-transform-arrow-functions",
        "@babel/plugin-transform-template-literals",
        "@babel/plugin-syntax-dynamic-import",
    ],
    env: {
        production: {
            plugins: [
                "transform-react-remove-prop-types",
            ]
        }
    }
};
