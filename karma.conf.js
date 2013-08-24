module.exports = function(config) {
  config.set({
    // Karma configuration file

    // base path, that will be used to resolve files and exclude
    basePath: '',

    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'bower_components/es5-shim/es5-shim.js',
      'bower_components/es5-shim/es5-sham.js',
      'bower_components/jquery/jquery.js',

      'bower_components/jasmine-jquery/lib/jasmine-jquery.js',
      'lib/jasmine-flight.js',

      // hack to load RequireJS after the shim libs
      'node_modules/karma-requirejs/lib/require.js',
      'node_modules/karma-requirejs/lib/adapter.js',

      {pattern: 'bower_components/flight/**/*.js', included: false},
      {pattern: 'test/mock/*.js', included: false},
      {pattern: 'test/spec/*.js', included: false},

      'test/test-main.js'
    ],

    // use dots reporter, as travis terminal does not support escaping sequences
    // possible values: 'dots', 'progress', 'junit', 'teamcity'
    // CLI --reporters progress
    reporters: ['dots'],

    // enable / disable watching file and executing tests whenever any file changes
    // CLI --auto-watch --no-auto-watch
    autoWatch: true,

    // start these browsers
    browsers: [
        'Chrome',
        'Firefox'
    ],

    // Auto run tests on start (when browsers are captured) and exit
    // CLI --single-run --no-single-run
    singleRun: false,

    plugins: [
      'karma-jasmine',
      'karma-requirejs',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-ie-launcher',
      'karma-safari-launcher'
    ]
  });
}
