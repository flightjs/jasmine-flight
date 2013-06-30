// Karma configuration file

// base path, that will be used to resolve files and exclude
basePath = '';

// list of files / patterns to load in the browser
files = [
  'bower_components/es5-shim/es5-shim.js',
  'bower_components/es5-shim/es5-sham.js',
  'bower_components/jquery/jquery.js',

  JASMINE,
  JASMINE_ADAPTER,
  REQUIRE,
  REQUIRE_ADAPTER,

  'lib/jasmine-flight.js',

  {pattern: 'bower_components/flight/**/*.js', included: false},
  {pattern: 'test/mock/*.js', included: false},
  {pattern: 'test/spec/*.js', included: false},

  'test/test-main.js'
];

// use dots reporter, as travis terminal does not support escaping sequences
// possible values: 'dots', 'progress', 'junit', 'teamcity'
// CLI --reporters progress
reporters = ['dots'];

// web server port
// CLI --port 9876
port = 9876;

// cli runner port
// CLI --runner-port 9100
runnerPort = 9100;

// enable / disable watching file and executing tests whenever any file changes
// CLI --auto-watch --no-auto-watch
autoWatch = true;

// start these browsers
browsers = [
    'Chrome',
    'Firefox'
];

// Auto run tests on start (when browsers are captured) and exit
// CLI --single-run --no-single-run
singleRun = false;
