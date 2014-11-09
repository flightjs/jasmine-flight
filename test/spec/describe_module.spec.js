/*global describeModule*/

define(function (require) {
  'use strict';

  describeModule('mock/example_module', function () {
    it('requires module and sets this.module', function () {
      expect(this.module.example).toBe(true);
    });
  });
});
