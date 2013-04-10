define([
  'flight/lib/component'
], function (defineComponent) {
  var componentName = function () {

    this.handleExampleDataRequest = function() {

      this.trigger(document, 'dataExample', {
        example: 'foobar'
      })

    };

    this.after('initialize', function () {

      this.on('uiNeedsExampleData', this.handleExampleDataRequest);

    });
  };

  return defineComponent(componentName);
});