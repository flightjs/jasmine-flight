/*global spyOnEvent */

define(function (require) {
  'use strict';

  describe('spyOnEvent', function () {

    it('returns a spy', function () {

      var spy = spyOnEvent(document, 'test-event');
      expect(spy).not.toBeUndefined();
      expect(spy.callCount).toBe(0);
      expect(spy.mostRecentCall).toEqual({});
    });

    it('records event when event is triggered on target element', function () {

      var spy = spyOnEvent(document, 'test-event');

      $(document).trigger('test-event', {
        test: true
      });

      // callcount should be incremented
      expect(spy.callCount).toBe(1);

      // mostrecentcall should provide access to event data
      expect(spy.mostRecentCall.data).toEqual({
        test: true
      });

      // mostrecentcall should provide access to all event args
      expect(spy.mostRecentCall.args[0].type).toEqual('test-event');

      // calls should be exposed as array
      expect(spy.calls[0]).toBe(spy.mostRecentCall);
    });

    it('does not record event when event is triggered on different DOM branch', function () {

      var $node = $('<div />');
      $(document).append($node);

      var spy = spyOnEvent($node, 'test-event');

      $(document).trigger('test-event');

      // spy should not have been called
      expect(spy.callCount).toBe(0);
    });

    it('clears up after each test', function () {
      var spy = spyOnEvent(document, 'test-event');

      $(document).trigger('test-event');

      // callcount should be 1
      expect(spy.callCount).toBe(1);
    });

  });

  describe('event matchers', function() {
    beforeEach(function() {
      this.spy = spyOnEvent(document, 'test-event');
      $(document).trigger('test-event', {test: true});
    });

    it('matches with toHaveBeenTriggeredOn', function() {
      expect(this.spy).toHaveBeenTriggeredOn(document);
    });

    it('matches with toHaveBeenTriggeredOnAndWith', function() {
      expect(this.spy).toHaveBeenTriggeredOnAndWith(document, {test: true});
    });
  });
});
