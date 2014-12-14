/**
 * Copyright 2013, Twitter Inc. and other contributors
 * Licensed under the MIT License
 */

+function (root, jasmine, $) {
  'use strict';

  jasmine.flight = {};

  var defineComponent = require('flight/lib/component');

  /**
   * setupComponent
   * - Assumes it has been called in the context of a jasmine spec.
   * - Creates a new HTML element and attaches to it an instance of this.Component
   * - If a fixture is provided, the fixture will serve as the component root.
   *
   * @param fixture: HTML or jQuery fixture
   * @param options: component initialization options
   */
  function setupComponent (fixture, options) {
    // tear down any existing component instance
    if (this.component) {
      this.component.teardown();
      this.$node.remove();
    }

    if (fixture instanceof jQuery || typeof fixture === 'string') {
      // use the fixture to create component root node
      this.$node = $(fixture).addClass('component-root');
    } else {
      // create an empty component root node
      this.$node = $('<div class="component-root" />');
      options = fixture;
      fixture = null;
    }

    // append component root node to body
    $('body').append(this.$node);

    // normalize options
    options = options === undefined ? {} : options;

    // instantiate component on component root node
    this.component = (new this.Component()).initialize(this.$node, options);
  };

  /**
   * describeComponent wraps jasmine.Env.prototype.describeComponent, providing a global
   * variable to access the current jasmine environment
   *
   * @param componentReference
   * @param specDefinitions
   */
  root.describeComponent = function (componentReference, specDefinitions) {
    jasmine.getEnv().describeComponent(componentReference, specDefinitions);
  };
  jasmine.Env.prototype.describeComponent = function (componentReference, specDefinitions) {
    describe(componentReference, describeComponentFactory(componentReference, specDefinitions));
  };

  /**
   * ddescribeComponent wraps ddescribe
   *
   * @param componentReference
   * @param specDefinitions
   */
  root.ddescribeComponent = function (componentReference, specDefinitions) {
    jasmine.getEnv().ddescribeComponent(componentReference, specDefinitions);
  };
  jasmine.Env.prototype.ddescribeComponent = function (componentReference, specDefinitions) {
    ddescribe(componentReference, describeComponentFactory(componentReference, specDefinitions));
  };

  /**
   * describeComponentFactory
   * loads the specified amd component/mixin before executing specDefinitions
   * provides this.setupComponent
   * Component instances created with this.setupComponent are torn down after each spec
   *
   * @param componentReference
   * @param specDefinitions
   */
  function describeComponentFactory (componentReference, specDefinitions, isMixin) {
    return function () {
      beforeEach(function (done) {
        // reset member variables
        this.Component = this.component = this.$node = null;

        // bind setupComponent to the current context
        this.setupComponent = setupComponent.bind(this);

        if (isMixin) {
          // mix the mixin in to an anonymous, component
          this.Component = defineComponent(function () {}, componentReference);
        } else {
          this.Component = componentReference;
        }

        done();
      });

      afterEach(function (done) {
        // remove the component root node
        if (this.$node) {
          this.$node.remove();
          this.$node = null;
        }

        // reset local member variables
        this.component.teardown();
        this.component = null;
        this.Component = null;
        done();
      });

      specDefinitions.apply(this);
    };
  };

  /**
   * Wrapper for describe.
   *
   * @param mixinReference
   * @param specDefinitions
   */
  root.describeMixin = function (mixinReference, specDefinitions) {
    jasmine.getEnv().describeMixin(mixinReference, specDefinitions);
  };
  jasmine.Env.prototype.describeMixin = function (mixinReference, specDefinitions) {
    describe(mixinReference, describeMixinFactory(mixinReference, specDefinitions));
  };

  /**
   * Wrapper for ddescribe.
   *
   * @param mixinReference
   * @param specDefinitions
   */
  root.ddescribeMixin = function (mixinReference, specDefinitions) {
    jasmine.getEnv().ddescribeMixin(mixinReference, specDefinitions);
  };
  jasmine.Env.prototype.ddescribeMixin = function (mixinReference, specDefinitions) {
    ddescribe(mixinReference, describeMixinFactory(mixinReference, specDefinitions));
  };

  /**
   * describeMixinFactory is a wrapper for describeComponentFactory
   * Loads amd mixin as a component before executing specDefinitions
   *
   * @param componentReference
   * @param specDefinitions
   */
  function describeMixinFactory (mixinReference, specDefinitions) {
    return describeComponentFactory(mixinReference, specDefinitions, true);
  };

  /**
   * Wrapper for describe.
   *
   * @param moduleReference
   * @param specDefinitions
   */
  root.describeModule = function (moduleReference, specDefinitions) {
    return jasmine.getEnv().describeModule(moduleReference, specDefinitions);
  };
  jasmine.Env.prototype.describeModule = function (moduleReference, specDefinitions) {
    describe(moduleReference, describeModuleFactory(moduleReference, specDefinitions));
  };

  root.ddescribeModule = function (moduleReference, specDefinitions) {
    return jasmine.getEnv().ddescribeModule(moduleReference, specDefinitions);
  };
  jasmine.Env.prototype.ddescribeModule = function (moduleReference, specDefinitions) {
    ddescribe(moduleReference, describeModuleFactory(moduleReference, specDefinitions));
  };

  /**
   * Load amd module before executing specDefinitions
   */
  function describeModuleFactory (moduleReference, specDefinitions) {
    return function () {
      beforeEach(function (done) {
        this.module = null;
        this.module = module;
        done();
      });

      specDefinitions.apply(this);
    };
  };

}(window, window.jasmine, window.jQuery);
