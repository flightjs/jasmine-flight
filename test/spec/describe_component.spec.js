/*global describeComponent, setupComponent*/

define(function (require) {
  'use strict';

  // we can't assume a shared instance across require() calls in webpack
  var isWebpack = (typeof require.include === 'function');

  var defineComponent = require('flight/lib/component');
  var Example = require('mock/example');

  describeComponent(Example, function () {
    describe('this.Component', function () {
      it('should be an Example component', function () {
        expect(this.Component).toEqual(Example);
      });
    });

    describe('this.component', function () {
      it('should be null if this.setupComponent() isn\'t called', function () {
        expect(this.component).toBeNull();
      });

      it('should be an instance of Example, if this.setupComponent() is called', function () {
        // waitsFor
        this.setupComponent();
        expect(this.component instanceof Example).toBe(true);
      });

      it('should reset `this.component` in a new context', function () {
        expect(this.component).toBeNull();
      });
    });

    describe('this.component.teardown()', function () {
      var result = [];

      beforeEach(function () {
        spyOn(this.Component.prototype, 'teardown').and.callFake(function () {
          result.push('call');
        });
      });

      it('should automatically call before this.setupComponent() if component exists', function () {
        expect(this.component).toBeNull();
        this.setupComponent();
        expect(result.length).toEqual(0);
        this.setupComponent();
        expect(result.length).toEqual(1);
      });

      it('should be called by afterEach of before `it`', function () {
        expect(result.length).toEqual(3);
      });
    });

    describe('this.setupComponent()', function () {
      it('provides the correct $node attribute', function () {
        expect(this.$node).toBeNull();
        this.setupComponent();
        expect(this.$node instanceof jQuery).toBe(true);
        expect(this.$node).toHaveClass('component-root');
      });

      it('sets the fixture if string given to first argument', function () {
        this.setupComponent('<div id="test_fixture1"/>');
        expect(this.$node).toHaveId('test_fixture1');
      });

      it('adds component-root class to fixture root', function () {
        this.setupComponent('<div id="test_fixture1"/>');
        expect(this.$node).toHaveClass('component-root');
      });

      it('sets the fixture if jQuery object given to first argument', function () {
        this.setupComponent($('<div id="test_fixture2"/>'));
        expect(this.$node).toHaveId('test_fixture2');
      });

      it('removes $node by afterEach', function () {
        expect(this.$node).toBeNull();
        expect($('.component-root').length).toEqual(0);
      });

      it('passes options to component if object givent to first argument', function () {
        this.setupComponent();
        expect(this.component.attr.param).toEqual('defaultParam');
        this.setupComponent({
          param: 'testParam'
        });
        expect(this.component.attr.param).toEqual('testParam');
      });

      it('sets the fixture and passed options to component if both arguments given', function () {
        this.setupComponent('<div id="test_fixture_both"/>', {
          param: 'testFixtureParam'
        });
        expect(this.component.attr.param).toEqual('testFixtureParam');
        expect(this.$node).toHaveId('test_fixture_both');
      });

      it('resets a fixture if multiple calls', function () {
        this.setupComponent('<div id="fixture1"/>');
        expect(this.$node).toHaveId('fixture1');

        this.setupComponent('<div id="fixture2"/>');
        expect(this.$node).toHaveId('fixture2');
      });

      it('calls this.component.teardown() if multiple calls', function () {
        spyOn(this.Component.prototype, 'teardown');
        try {
          this.setupComponent();
          expect(this.component.teardown.calls.count()).toEqual(0);
          this.setupComponent();
          expect(this.component.teardown.calls.count()).toEqual(1);
        } catch (e) {

        }
      });
    });
  });
});
