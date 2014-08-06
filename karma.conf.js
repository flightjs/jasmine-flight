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

    // list of files / patterns to load in the browser
    files: [
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

    // frameworks to use
    frameworks: [
      'jasmine',
      'requirejs'
    ],

    reporters: [process.env.TRAVIS ? 'dots' : 'progress'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
