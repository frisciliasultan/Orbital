module.exports = {
    verbose: true,
    testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
    transformIgnorePatterns: ['node_modules/(?!lodash-es/*)'],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    transform: {
        // "\\.(ts|tsx)?$": "ts-jest",
        // "^.+\\.tsx?$": "<rootDir>/node_modules/ts-jest/preprocessor.js",
        "^.+\\.svg$": "<rootDir>/svgTransform.js"
    },
    moduleNameMapper: {
      "\\.(css|sass)$": "identity-obj-proxy",
    },
  };