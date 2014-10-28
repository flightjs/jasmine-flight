/*global spyOnEvent*/

define(function (require) {
  'use strict';

  describe('spyOnEvent', function () {
    it('returns a spy', function () {
      var spy = spyOnEvent(document, 'test-event');
      expect(spy).not.toBeUndefined();
      expect(spy.calls.count()).toBe(0);
      expect(spy.calls.all()).toEqual([]);
    });

    it('records event when event is triggered on target element', function () {
      var spy = spyOnEvent(document, 'test-event');

      $(document).trigger('test-event', {
        test: true
      });

      // calls.count() should be incremented
      expect(spy.calls.count()).toBe(1);

      // `calls.mostRecent()` should provide access to event data
      expect(spy.calls.mostRecent().data).toEqual({
        test: true
      });

      // `calls.mostRecent()` should provide access to all event args
      expect(spy.calls.mostRecent().args[0].type).toEqual('test-event');

      // calls should be exposed as array
      expect(spy.calls.first()).toBe(spy.calls.mostRecent());
    });

    it('does not record event when event is triggered on different DOM branch', function () {
      var $node = $('<div />');
      var spy = spyOnEvent($node, 'test-event');

      $(document.body).append($node);
      $(document.body).trigger('test-event');

      // spy should not have been called
      expect(spy.calls.count()).toBe(0);
    });

    it('clears up after each test', function () {
      var spy = spyOnEvent(document, 'test-event');

      $(document).trigger('test-event');

      // calls.count() should be 1
      expect(spy.calls.count()).toBe(1);
    });
  });

  describe('event matchers', function () {
    beforeEach(function () {
      this.spy = spyOnEvent(document, 'test-event');
      $(document).trigger('test-event', {test: true, test2: null});
    });

    it('matches with toHaveBeenTriggeredOn', function () {
      expect(this.spy).toHaveBeenTriggeredOn(document);
    });

    it('matches with toHaveBeenTriggeredOnAndWith', function () {
      expect(this.spy).toHaveBeenTriggeredOnAndWith(document, {test: true, test2: null});
    });

    it('matches with data subset when fuzzy flag is set', function () {
      expect(this.spy).toHaveBeenTriggeredOnAndWith(document, {test: true}, true);
      expect(this.spy).toHaveBeenTriggeredOnAndWith(document, {test2: null}, true);
    });

    it('matches with data subset when using fuzzy shortcut', function () {
      expect(this.spy).toHaveBeenTriggeredOnAndWithFuzzy(document, {test: true});
      expect(this.spy).toHaveBeenTriggeredOnAndWithFuzzy(document, {test2: null});
    });
  });
});
