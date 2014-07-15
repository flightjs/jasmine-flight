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

  jasmine.Env.prototype.describeModule = function (modulePath, specDefinitions) {
    describe(modulePath, function () {
      beforeEach(function (done) {
        this.module = null;

        var requireCallback = function (module) {
          this.module = module;
          done();
        }.bind(this);

        require([modulePath], requireCallback);
      });

      specDefinitions.apply(this);
    });
  };

  /**
   * Create root node and initialize component. Fixture should be html string
   * or jQuery object.
   *
   * @param fixture {String} (Optional)
   * @param options {Options} (Optional)
   */


  (function (namespace) {
    var eventsData = {
      spiedEvents: {},
      handlers: []
    };

    namespace.formatElement = function ($element) {
      var limit = 200;
      var output = '';

      if ($element instanceof jQuery) {
        output = jasmine.jQuery.elementToString($element);
        if (output.length > limit) {
          output = output.slice(0, 200) + '...';
        }
      } else {
        //$element should always be a jQuery object
        output = 'element is not a jQuery object';
      }

      return output;
    };

    namespace.compareColors = function (color1, color2) {
      if (color1.charAt(0) === color2.charAt(0)) {
        return color1 === color2;
      } else {
        return namespace.hex2rgb(color1) === namespace.hex2rgb(color2);
      }
    };

    namespace.hex2rgb = function (colorString) {
      if (colorString.charAt(0) !== '#') return colorString;
      // note: hexStr should be #rrggbb
      var hex = parseInt(colorString.substring(1), 16);
      var r = (hex & 0xff0000) >> 16;
      var g = (hex & 0x00ff00) >> 8;
      var b = hex & 0x0000ff;
      return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    };

    namespace.events = {
      spyOn: function (selector, eventName) {
        eventsData.spiedEvents[[selector, eventName]] = {
          callCount: 0,
          calls: [],
          mostRecentCall: {},
          name: eventName
        };

        var handler = function (e, data) {
          var call = {
            event: e,
            args: jasmine.util.argsToArray(arguments),
            data: data
          };
          eventsData.spiedEvents[[selector, eventName]].callCount++;
          eventsData.spiedEvents[[selector, eventName]].calls.push(call);
          eventsData.spiedEvents[[selector, eventName]].mostRecentCall = call;
        };

        jQuery(selector).on(eventName, handler);
        eventsData.handlers.push([selector, eventName, handler]);
        return eventsData.spiedEvents[[selector, eventName]];
      },

      eventArgs: function (selector, eventName, expectedArg) {
        var actualArgs = eventsData.spiedEvents[[selector, eventName]].mostRecentCall.args;

        if (!actualArgs) {
          throw 'No event spy found on ' + eventName + '. Try adding a call to spyOnEvent or make sure that the selector the event is triggered on and the selector being spied on are correct.';
        }

        // remove extra event metadata if it is not tested for
        if ((actualArgs.length === 2) && typeof actualArgs[1] === 'object' &&
          expectedArg && !expectedArg.scribeContext && !expectedArg.sourceEventData && !expectedArg.scribeData) {
          actualArgs[1] = $.extend({}, actualArgs[1]);
          delete actualArgs[1].sourceEventData;
          delete actualArgs[1].scribeContext;
          delete actualArgs[1].scribeData;
        }

        return actualArgs;
      },

      wasTriggered: function (selector, event) {
        var spiedEvent = eventsData.spiedEvents[[selector, event]];
        return spiedEvent && spiedEvent.callCount > 0;
      },

      wasTriggeredWith: function (selector, eventName, expectedArg) {
        var actualArgs = jasmine.flight.events.eventArgs(selector, eventName, expectedArg);
        return actualArgs && jasmine.matchersUtil.contains(actualArgs, expectedArg);
      },

      wasTriggeredWithData: function (selector, eventName, expectedArg) {
        var actualArgs = jasmine.flight.events.eventArgs(selector, eventName, expectedArg);
        var valid;

        if (actualArgs) {
          valid = false;
          for (var i = 0; i < actualArgs.length; i++) {
            if (jasmine.flight.validateHash(expectedArg, actualArgs[i])) {
              return true;
            }
          }
          return valid;
        }

        return false;
      },

      cleanUp: function () {
        eventsData.spiedEvents = {};
        // unbind all handlers
        for (var i = 0; i < eventsData.handlers.length; i++) {
          jQuery(eventsData.handlers[i][0]).off(eventsData.handlers[i][1], eventsData.handlers[i][2]);
        }
        eventsData.handlers    = [];
      }
    };

    namespace.validateHash = function (a, b, intersection) {
      var validHash;
      for (var field in a) {
        if ((typeof a[field] === 'object') && (typeof b[field] === 'object')) {
          validHash = a[field] === b[field] || jasmine.flight.validateHash(a[field], b[field]);
        } else if (intersection && (typeof a[field] === 'undefined' || typeof b[field] === 'undefined')) {
          validHash = true;
        } else {
          validHash = (a[field] === b[field]);
        }
        if (!validHash) {
          break;
        }
      }
      return validHash;
    };

    namespace.assertEventTriggeredWithData = function (actual, selector, expectedArg, fuzzyMatch) {
      var eventName = typeof actual === 'string' ? actual : actual.name;
      var wasTriggered = jasmine.flight.events.wasTriggered(selector, eventName);
      var wasTriggeredWithData = false;

      if (wasTriggered) {
        if (fuzzyMatch) {
          wasTriggeredWithData = jasmine.flight.events.wasTriggeredWithData(selector, eventName, expectedArg);
        } else {
          wasTriggeredWithData = jasmine.flight.events.wasTriggeredWith(selector, eventName, expectedArg);
        }
      }

      var result = {
        pass: wasTriggeredWithData
      };

      result.message = function () {
        var $pp = function (obj) {
          var description;
          var attr;

          if (!(obj instanceof jQuery)) {
            obj = $(obj);
          }

          description = [
            obj.get(0).nodeName
          ];

          attr = obj.get(0).attributes || [];

          for (var x = 0; x < attr.length; x++) {
            description.push(attr[x].name + '="' + attr[x].value + '"');
          }

          return '<' + description.join(' ') + '>';
        };

        if (wasTriggered) {
          var actualArg = jasmine.flight.events.eventArgs(selector, eventName, expectedArg)[1];
          return [
            '<div class="value-mismatch">Expected event ' + eventName + ' to have been triggered on' + selector,
            '<div class="value-mismatch">Expected event ' + eventName + ' not to have been triggered on' + selector
          ];
        } else {
          return [
            'Expected event ' + eventName + ' to have been triggered on ' + $pp(selector),
            'Expected event ' + eventName + ' not to have been triggered on ' + $pp(selector)
          ];
        }
      }();

      return result;

    };
  })(jasmine.flight);

  beforeEach(function () {
    jasmine.addMatchers({
      toHaveBeenTriggeredOn: function () {
        return {
          compare: function (actual, selector) {
            var eventName = typeof actual === 'string' ? actual : actual.name;
            var wasTriggered = jasmine.flight.events.wasTriggered(selector, eventName);
            var result = {
              pass: wasTriggered
            };

            result.message = function () {
              var $pp = function (obj) {
                var description;
                var attr;

                if (!(obj instanceof jQuery)) {
                  obj = $(obj);
                }

                description = [
                  obj.get(0).nodeName
                ];

                attr = obj.get(0).attributes || [];

                for (var x = 0; x < attr.length; x++) {
                  description.push(attr[x].name + '="' + attr[x].value + '"');
                }

                return '<' + description.join(' ') + '>';
              };

              if (wasTriggered) {
                return [
                  '<div class="value-mismatch">Expected event ' + eventName + ' to have been triggered on' + selector,
                  '<div class="value-mismatch">Expected event ' + eventName + ' not to have been triggered on' + selector
                ];
              } else {
                return [
                  'Expected event ' + eventName + ' to have been triggered on ' + $pp(selector),
                  'Expected event ' + eventName + ' not to have been triggered on ' + $pp(selector)
                ];
              }
            }();

            return result;
          }
        };
      },

      toHaveBeenTriggeredOnAndWith: function () {
        return {
          compare: function (actual, selector, expectedArg, fuzzyMatch) {
            return jasmine.flight.assertEventTriggeredWithData(actual, selector, expectedArg, fuzzyMatch);
          }
        };
      },

      toHaveBeenTriggeredOnAndWithFuzzy: function () {
        return {
          compare: function (actual, selector, expectedArg) {
            return jasmine.flight.assertEventTriggeredWithData(actual, selector, expectedArg, true);
          }
        };
      },

      toHaveCss: function () {
        return {
          compare: function (actual, prop, val) {
            var result;
            if (val instanceof RegExp) {
              result = val.test(actual.css(prop));
            } else if (prop.match(/color/)) {
              //IE returns colors as hex strings; other browsers return rgb(r, g, b) strings
              result = jasmine.flight.compareColors(actual.css(prop), val);
            } else {
              result = actual.css(prop) === val;
              //sometimes .css() returns strings when it should return numbers
              if (!result && typeof val === 'number') {
                result = parseFloat(actual.css(prop), 10) === val;
              }
            }

            actual = jasmine.flight.formatElement(actual);
            return result;
          }
        };
      }
    });
  });

  root.spyOnEvent = function (selector, eventName) {
    jasmine.jQuery.events.spyOn(selector, eventName);
    return jasmine.flight.events.spyOn(selector, eventName);
  };

  afterEach(function () {
    jasmine.flight.events.cleanUp();
  });

}(this));
