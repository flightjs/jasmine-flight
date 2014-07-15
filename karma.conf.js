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

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
      'Chrome'
    ],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
