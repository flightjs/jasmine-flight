"use strict";

describeComponent('app/data/example', function () {
  beforeEach(function () {
    setupComponent();
  });

  it('should listen to uiNeedsExampleData and trigger dataExample', function () {
    var dataExample = spyOnEvent(document, 'dataExample');
    this.component.$node.trigger('uiNeedsExampleData');
    expect(dataExample).toHaveBeenTriggeredOn(document);
    expect(dataExample.mostRecentCall.data).toEqual({
      example: 'foobar'
    });
  });
});

