// Karma configuration file
//
// For all available config options and default values, see:
// https://github.com/karma-runner/karma/blob/stable/lib/config.js#L54

module.exports = function (config) {
  'use strict';

  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    frameworks: [
      'jasmine',
      'commonjs'
    ],

    preprocessors: {
      'index.js': ['commonjs'],
      'test/**/*.js': ['commonjs'],
      'node_modules/flightjs/*.js': ['commonjs'],
      'node_modules/flightjs/lib/*.js': ['commonjs']
    },

    // list of files / patterns to load in the browser
    files: [
      // jquery
      'node_modules/flightjs/node_modules/jquery/dist/jquery.js',
      // jasmine-jquery
      'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
      // flight
      'node_modules/flightjs/*.js',
      'node_modules/flightjs/lib/*.js',
      // library
      'index.js',
      // tests
      'test/mock/**/*.js',
      'test/spec/**/*.js'
    ],

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // Start these browsers
    // CLI --browsers Chrome, Firefox, Safari
    browsers: [process.env.TRAVIS ? 'Firefox' : 'Chrome'],

    // use dots reporter, as travis terminal does not support escaping sequences
    // possible values: 'dots', 'progress'
    // CLI --reporters progress
    reporters: [process.env.TRAVIS ? 'dots' : 'progress'],

    singleRun: false
  });
};
