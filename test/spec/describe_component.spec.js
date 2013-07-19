/*global describeComponent, setupComponent*/

define(function (require) {
  'use strict';

  var defineComponent = require('flight/lib/component');
  var Example = require('mock/example');

  describeComponent('mock/example', function () {
    describe('this.Component', function () {
      it('should be an Example component', function () {
        expect(this.Component).toEqual(Example);
      });
    });

    describe('this.component', function () {
      it('should be null if setupComponent() isn\'t called', function () {
        expect(this.component).toBeNull();
      });

      it('should be an instance of Example, if setupComponent() is called', function () {
        // waitsFor
        setupComponent();
        expect(this.component instanceof Example).toBe(true);
      });

      it('should reset `this.component` in a new context', function () {
        expect(this.component).toBeNull();
      });
    });

    describe('defineComponent.teardownAll()', function () {
      var result = [];

      beforeEach(function () {
        spyOn(defineComponent, 'teardownAll').andCallFake(function () {
          result.push('call');
        });
      });

      describe('automatically calls after each test', function () {
        it('dummy', function () {
          // do nothing
        });

        it('first call', function () {
          expect(result.length).toEqual(1);
        });

        it('second call', function () {
          expect(result.length).toEqual(2);
        });

        it('third call', function () {
          expect(result.length).toEqual(3);
        });
      });
    });

    describe('this.component.teardown()', function () {
      var result = [];

      beforeEach(function () {
        spyOn(this.Component.prototype, 'teardown').andCallFake(function () {
          result.push('call');
        });
      });

      it('should automatically call before setupComponent() if component exists', function () {
        expect(this.component).toBeNull();
        setupComponent();
        expect(result.length).toEqual(0);
        setupComponent();
        expect(result.length).toEqual(1);
      });

      it('should be called by afterEach of before `it`', function () {
        expect(result.length).toEqual(3);
      });
    });

    describe('setupComponent()', function () {
      it('provides the correct $node attribute', function () {
        expect(this.$node).toBeNull();
        setupComponent();
        expect(this.$node instanceof jQuery).toBe(true);
        expect($('<div/>').append(this.$node).html()).toEqual('<div class="component-root"></div>');
      });

      it('sets the fixture if string given to first argument', function () {
        setupComponent('<div id="test_fixture1"/>');
        expect($('<div/>').append(this.$node).html()).toEqual(
          '<div class="component-root">' +
            '<div id="test_fixture1"></div>' +
          '</div>'
        );
      });

      it('sets the fixture if jQuery object given to first argument', function () {
        setupComponent($('<div id="test_fixture2"/>'));
        expect($('<div/>').append(this.$node).html()).toEqual(
          '<div class="component-root">' +
            '<div id="test_fixture2"></div>' +
          '</div>'
        );
      });

      it('removes $node by afterEach', function () {
        expect(this.$node).toBeNull();
        expect($('.component-root').length).toEqual(0);
      });

      it('passes options to component if object givent to first argument', function () {
        setupComponent();
        expect(this.component.attr.param).toEqual('defaultParam');
        setupComponent({
          param: 'testParam'
        });
        expect(this.component.attr.param).toEqual('testParam');
      });

      it('sets the fixture and passed options to component if both arguments given', function () {
        setupComponent('<div id="test_fixture_both"/>', {
          param: 'testFixtureParam'
        });
        expect(this.component.attr.param).toEqual('testFixtureParam');
        expect($('<div/>').append(this.$node).html()).toEqual(
          '<div class="component-root">' +
            '<div id="test_fixture_both"></div>' +
          '</div>'
        );
      });

      it('resets a fixture if multiple calls', function () {
        setupComponent('<div id="fixture1"/>');
        expect($('<div/>').append(this.$node).html()).toEqual(
          '<div class="component-root">' +
            '<div id="fixture1"></div>' +
          '</div>'
        );
        setupComponent('<div id="fixture2"/>');
        expect($('<div/>').append(this.$node).html()).toEqual(
          '<div class="component-root">' +
            '<div id="fixture2"></div>' +
          '</div>'
        );
      });

      it('calls this.component.teardown() if multiple calls', function () {
        spyOn(this.Component.prototype, 'teardown');
        try {
          setupComponent();
          expect(this.component.teardown.calls.length).toEqual(0);
          setupComponent();
          expect(this.component.teardown.calls.length).toEqual(1);
        } catch (e) {

        }
      });
    });
  });
});
