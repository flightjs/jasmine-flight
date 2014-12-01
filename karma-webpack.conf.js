// Karma configuration file
//
// For all available config options and default values, see:
// https://github.com/karma-runner/karma/blob/stable/lib/config.js#L54

module.exports = function (config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [process.env.TRAVIS ? 'Firefox' : 'Chrome'],

    preprocessors: {
      'lib/jasmine-flight.js': ['webpack'],
      'test/spec/**/*.js': ['webpack'],
    },

    // list of files / patterns to load in the browser
    files: [
      // jQuery
      'bower_components/jquery/dist/jquery.js',
      // jasmine-jquery
      'bower_components/jasmine-jquery/lib/jasmine-jquery.js',
      // jasmine-flight (what we're actually testing!)
      'lib/jasmine-flight.js',
      // specs
      'test/spec/**/*.js',
    ],

    // frameworks to use
    frameworks: [
      'jasmine'
    ],

    plugins: [
        'karma-webpack',
        'karma-chrome-launcher',
        'karma-jasmine'
    ],
    
    webpack: {
      resolve: {
        root: __dirname,
        alias: {
          'flight': 'bower_components/flight',
          'mock/example': 'test/mock/example.js',
          'mock/example_mixin': 'test/mock/example_mixin.js',
          'mock/example_module': 'test/mock/example_module.js',
        },
      },
      modulesDirectories: ['bower_components'],
    },

    webpackServer: {
      progress: false,
      stats: false,
      debug: false,
      quiet: true
    },

    reporters: [process.env.TRAVIS ? 'dots' : 'progress'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
