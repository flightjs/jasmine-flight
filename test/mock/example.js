define(function (require) {
  'use strict';

  var defineComponent = require('flight/lib/component');

  function Example() {
    this.attributes({
      param: 'defaultParam'
    });
  }

  return defineComponent(Example);
});
