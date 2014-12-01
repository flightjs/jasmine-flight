/*global describeModule*/

define(function (require) {
  'use strict';

  var module = (typeof require.include === 'function') ? require('mock/example_module') : 'mock/example_module';

  describeModule('mock/example_module', function () {
    it('requires module and sets this.module', function () {
      expect(this.module.example).toBe(true);
    });
  });
});
