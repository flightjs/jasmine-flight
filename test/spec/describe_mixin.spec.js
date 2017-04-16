/*global describeComponent, setupComponent*/

define(function (require) {
  'use strict';

  var defineComponent = require('flight/lib/component');
  var mixin = require('mock/example_mixin');
  console.log(mixin);

  describeMixin(mixin, function () {
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
