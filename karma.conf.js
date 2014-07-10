// Karma configuration file
//
// For all available config options and default values, see:
// https://github.com/karma-runner/karma/blob/stable/lib/config.js#L54

module.exports = function (config) {
  'use strict';

  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      // es5 shim for PhantomJS & IE8 & below
      'bower_components/es5-shim/es5-shim.js',
      'bower_components/es5-shim/es5-sham.js',
      // hack to load RequireJS after the shim libs
      'node_modules/requirejs/require.js',
      'node_modules/karma-requirejs/lib/adapter.js',
      // jQuery
      'bower_components/jquery/dist/jquery.js',
      // jasmine-jquery
      'bower_components/jasmine-jquery/lib/jasmine-jquery.js',
      // jasmine-flight (what we're actually testing!)
      'lib/jasmine-flight.js',
      // flight
      {pattern: 'bower_components/flight/**/*.js', included: false},
      // specs
      {pattern: 'test/spec/**/*.js', included: false},
      // mocks
      {pattern: 'test/mock/**/*.js', included: false},
      // test runner
      'test/test-main.js',
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {

    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
      //'Chrome',
      //'ChromeCanary',
      //'Firefox',
      //'FirefoxAurora',
      //'FirefoxNightly',
      //'Opera',
      'PhantomJS',
      //'Safari'
    ],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
