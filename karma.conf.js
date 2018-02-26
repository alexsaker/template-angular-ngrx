// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function(config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular/cli"],
    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-ie-launcher"),
      require("karma-firefox-launcher"),
      require("karma-phantomjs-launcher"),
      require("karma-jasmine-html-reporter"),
      require("karma-spec-reporter"),
      require("karma-junit-reporter"),
      require("karma-coverage-istanbul-reporter"),
      require("karma-scss-preprocessor"),
      require("node-sass"),
      require("@angular/cli/plugins/karma")
    ],
    retryLimit: 4,
    captureTimeout: 210000,
    browserDisconnectTolerance: 3,
    browserDisconnectTimeout: 210000,
    browserNoActivityTimeout: 210000,
    client: {},
    coverageIstanbulReporter: {
      type: "lcov",
      dir: "./coverage/client",
      subdir: ".",
      file: "coverage.lcov",
      reports: ["html", "lcovonly", "text-summary"],
      fixWebpackSourcePaths: true
    },
    junitReporter: {
      outputDir: "./coverage", // results will be saved as $outputDir/$browserName.xml
      outputFile: "report.xml" // if included, results will be saved as $outputDir/$browserName/$outputFile
    },
    angularCli: {
      environment: "dev"
    },
    reporters: ["progress", "coverage-istanbul", "junit", "kjhtml"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["Chrome", "Firefox", "IE"],
    singleRun: false,
    files: [{ pattern: "src/styles.scss", included: true, watched: true }],
    preprocessors: {
      "./src/test.ts": ["@angular/cli"],
      "./src/**/*.scss": ["scss"]
    },
    proxies: {
      "/assets": "/src/assets/"
    }
  });
};
