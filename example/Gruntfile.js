module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jasmine: {
      src: 'app/**/*.js',
      options: {
        specs: 'test/specs/**/*spec.js',
        vendor: [
          // flight dependencies
          "bower_components/jquery/jquery.js",
          "bower_components/es5-shim/es5-shim.js",
          "bower_components/es5-shim/es5-sham.js",
          // jasmine extensions
          "test/assets/jasmine-jquery.js",
          "test/assets/flight-jasmine.js"
        ],
        template: require('grunt-template-jasmine-requirejs'),
        templateOptions: {
          requireConfig: {
            paths: {
              flight: 'bower_components/flight',
              spec: 'test/specs'
            }
          }
        }
      }
    }
  });

  // Load the plugin that provides the "grunt-contrib-jasmine" task.
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  // Default task(s).
  grunt.registerTask('default', ['jasmine']);

};