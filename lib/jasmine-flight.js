/**
 * Copyright 2013, Twitter Inc. and other contributors
 * Licensed under the MIT License
 */

(function (root) {
  'use strict';

  jasmine.flight = {};

  /**
   * Wrapper for describe. Load component before each test.
   *
   * @param componentPath
   * @param specDefinitions
   */

  root.describeComponent = function (componentPath, specDefinitions) {
    jasmine.getEnv().describeComponent(componentPath, specDefinitions);
  };

  root.ddescribeComponent = function (componentPath, specDefinitions) {
    jasmine.getEnv().ddescribeComponent(componentPath, specDefinitions);
  };

  var describeComponentFactory = function (componentPath, specDefinitions) {
    return function () {
      beforeEach(function (done) {
        this.Component = this.component = this.$node = null;

        this.setupComponent = function (fixture, options) {
          if (this.component) {
            this.component.teardown();
            this.$node.remove();
          }

          if (fixture instanceof jQuery || typeof fixture === 'string') {
            this.$node = $(fixture).addClass('component-root');
          } else {
            this.$node = $('<div class="component-root" />');
            options = fixture;
            fixture = null;
          }

          $('body').append(this.$node);

          options = options === undefined ? {} : options;

          this.component = (new this.Component()).initialize(this.$node, options);
        };

        var requireCallback = function (registry, Component) {
          registry.reset();
          this.Component = Component;
          done();
        }.bind(this);

        require(['flight/lib/registry', componentPath], requireCallback);
      });

      afterEach(function (done) {
        if (this.$node) {
          this.$node.remove();
          this.$node = null;
        }

        var requireCallback = function (defineComponent) {
          if (this.component) {
            this.component = null;
          }

          this.Component = null;
          defineComponent.teardownAll();
          done();
        }.bind(this);

        require(['flight/lib/component'], requireCallback);
      });

      specDefinitions.apply(this);
    };
  };

  jasmine.Env.prototype.describeComponent = function (componentPath, specDefinitions) {
    describe(componentPath, describeComponentFactory(componentPath, specDefinitions));
  };

  jasmine.Env.prototype.ddescribeComponent = function (componentPath, specDefinitions) {
    ddescribe(componentPath, describeComponentFactory(componentPath, specDefinitions));
  };

  /**
   * Wrapper for describe. Load mixin before each test.
   *
   * @param mixinPath
   * @param specDefinitions
   */

  root.describeMixin = function (mixinPath, specDefinitions) {
    jasmine.getEnv().describeMixin(mixinPath, specDefinitions);
  };

  root.ddescribeMixin = function (mixinPath, specDefinitions) {
    jasmine.getEnv().ddescribeMixin(mixinPath, specDefinitions);
  };

  var describeMixinFactory = function (mixinPath, specDefinitions) {
    return function () {
      beforeEach(function (done) {
        this.Component = this.component = this.$node = null;

        this.setupComponent = function (fixture, options) {
          if (this.component) {
            this.component.teardown();
            this.$node.remove();
          }

          if (fixture instanceof jQuery || typeof fixture === 'string') {
            this.$node = $(fixture).addClass('component-root');
          } else {
            this.$node = $('<div class="component-root" />');
            options = fixture;
            fixture = null;
          }

          $('body').append(this.$node);

          options = options === undefined ? {} : options;

          this.component = (new this.Component()).initialize(this.$node, options);
        };

        var requireCallback = function (registry, defineComponent, Mixin) {
          registry.reset();
          this.Component = defineComponent(function () {}, Mixin);
          done();
        }.bind(this);

        require(['flight/lib/registry', 'flight/lib/component', mixinPath], requireCallback);
      });

      afterEach(function (done) {
        if (this.$node) {
          this.$node.remove();
          this.$node = null;
        }

        var requireCallback = function (defineComponent) {
          if (this.component) {
            this.component = null;
          }

          this.Component = null;
          defineComponent.teardownAll();
          done();
        }.bind(this);

        require(['flight/lib/component'], requireCallback);
      });

      specDefinitions.apply(this);
    };
  };

  jasmine.Env.prototype.describeMixin = function (mixinPath, specDefinitions) {
    describe(mixinPath, describeMixinFactory(mixinPath, specDefinitions));
  };

  jasmine.Env.prototype.ddescribeMixin = function (mixinPath, specDefinitions) {
    ddescribe(mixinPath, describeMixinFactory(mixinPath, specDefinitions));
  };

  /**
   * Wrapper for describe. Load module before each test.
   *
   * @param modulePath
   * @param specDefinitions
   */

  root.describeModule = function (modulePath, specDefinitions) {
    return jasmine.getEnv().describeModule(modulePath, specDefinitions);
  };

  root.ddescribeModule = function (modulePath, specDefinitions) {
    return jasmine.getEnv().ddescribeModule(modulePath, specDefinitions);
  };

  function describeModuleFactory (modulePath, specDefinitions) {
    return function () {
      beforeEach(function (done) {
        this.module = null;

        var requireCallback = function (module) {
          this.module = module;
          done();
        }.bind(this);

        require([modulePath], requireCallback);
      });

      specDefinitions.apply(this);
    };
  };

  jasmine.Env.prototype.describeModule = function (modulePath, specDefinitions) {
    describe(modulePath, describeModuleFactory(modulePath, specDefinitions));
  };

  jasmine.Env.prototype.ddescribeModule = function (modulePath, specDefinitions) {
    ddescribe(modulePath, describeModuleFactory(modulePath, specDefinitions));
  }
}(this));
