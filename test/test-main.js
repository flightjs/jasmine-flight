'use strict';

var tests = Object.keys(window.__karma__.files).filter(function (file) {
  return (/\.spec\.js$/.test(file));
});

require.config({
  // Karma serves files from '/base'
  baseUrl: '/base',

  paths: {
    'flight': 'bower_components/flight',
    'mock': 'test/mock'
  },

  // ask Require.js to load these files (all our tests)
  deps: tests,

  // start test run, once Require.js is done
  callback: window.__karma__.start
});

