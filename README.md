# jasmine-flight [![Build Status](https://travis-ci.org/flightjs/jasmine-flight.png?branch=master)](http://travis-ci.org/flightjs/jasmine-flight)

Extensions to the Jasmine test framework for use with [Flight](https://github.com/flightjs/flight)

# Getting started

Include [jasmine-flight.js](https://raw.github.com/flightjs/jasmine-flight/master/lib/jasmine-flight.js)
in your app and load it in your test runner.

Or install it with [Bower](http://bower.io/):

```bash
bower install --save-dev jasmine-flight
```

jasmine-flight depends on [jasmine](https://github.com/pivotal/jasmine)

jasmine-flight assumes you'll be using RequireJS to load Flight modules, and
that you've configured the Flight directory path. For example:

```javascript
requirejs.config({
  paths: {
    flight: 'bower_components/flight'
  }
});
```

# What is jasmine-flight?

jasmine-flight provides a set of helpers to load and instantiate AMD components, mixins and modules.

## describe helpers

### describeComponent(componentPath, specDefinitions)

Requires the component at componentPath and executes specDefinitions.

* The component constructor is available from within specDefinitions as `this.Component`
* To create a component instance, call `this.setupComponent`

#### `componentPath`: String

A path to an AMD component. E.g. `ui/compose`

#### `specDefinitions`: Function

A function to execute after the component has loaded. Should contain spec definitions.




### ddescribeComponent(componentPath, specDefinitions)

As per describeComponent, but prevents execution of any other specs.




### describeMixin(mixinPath, specDefinitions)

Requires the mixin at mixinPath and executes specDefinitions.

* The Mixin is attached to a dummy Component
* the dummy Component constructor is available from within specDefinitions as this.Component
* To create a component instance, call `this.setupComponent`


#### `mixinPath`: String

A path to an AMD mixin. E.g. `ui/with_close_button`

#### `specDefinitions`: Function

A function to execute after the mixin has loaded. Should contain spec definitions.




### ddescribeMixin(mixinPath, specDefinitions)

As per describeMixin, but prevents execution of any other specs.




### describeModule(modulePath, specDefinitions)

Requires the AMD module at modulePath and executes specDefinitions

* The module will be available as this.module from within specDefinitions.

#### `modulePath`: String

A path to an AMD module. E.g. `utils/time`

#### `specDefinitions`: Function

A function to execute after the module has loaded. Should contain spec definitions.

### ddescribeModule(modulePath, specDefinitions)

As per describeModule, but prevents execution of any other specs.




## this.setupComponent(fixture, options)

Instantiate a component or mixin within specDefinitions.

* The component instance is available at `this.component`
* The node the component is attached to is `this.$node`

#### `fixture`: String | jQuery

Generates a DOM element to attach the component to. If no fixture is provided, the component
will be attached to an empty DOM node.

#### `options`: Object

Options to pass to the component.

## Examples

In almost all cases, describeMixin and describeComponent are effectively identical in their usage,
thus only describeComponent is detailed here.

### describeComponent with fixture

This spec tests a simple component which has one methomd, 'getName', which returns the value
of an input field.

```javascript
describeComponent('ui/text_input', function () {
  it ('gets the value of the input field it is attached to', function () {
    this.setupComponent('<input type="text" value="hello world" />');
    expect(this.component.getValue()).toEqual('hello, world');
  });
});
```

### describeComponent with options

This spec tests a component which has one method, `getText`, which gets the text value of an element. It uses options to figure out which element to access.

```javascript
describeComponent('ui/text', function () {
  it ('gets the text of the element specified by elementSelector', function () {
    this.setupComponent('<div><p class="js-name">Jimmy</p></div>', {
      elementSelector: 'js-name'
    });
    expect(this.component.getText()).toEqual('Jimmy');
  });
});
```

### Stubbing mixin methods

When testing components, you may want to stub out methods provided by mixins. In this example, we're
stubbing a method named 'foo' (which was provided by a mixin) so that it always returns 'bar'.

```javascript
describeComponent('ui/text', function () {
  it ('foo returns "foo"', function () {
    this.setupComponent();
    var stub = spyOn(this.component, 'foo').andReturn('bar');
    expect(this.component.foo()).toEqual('bar');
  });
});
```

### Stubbing component methods

It's probably not a good idea to stub out methods on the component you're testing, but if you really, really want to...

```javascript
describeComponent('ui/text', function () {
  it('calls the stub instead', function () {
    // spy on the prototype...
    var spy = spyOn(this.Component.prototype, 'getText');

    // ... and then instantiate the component
    this.setupComponent();

    expect(spy).toHaveBeenCalled();
  });
});
```

### Spying on events

Event Spies are not part of this package but are mentioned here because it's mostly what you'll be wanting to do. spyOnEvent and the associated matchers are provided by https://github.com/velesin/jasmine-jquery

```javascript
describeComponent('ui/text', function () {
  it('triggers 'data-username' after initialize', function () {
    var spyEvent = spyOnEvent(document, 'data-username');
    this.setupComponent({
      username: 'bob'
    });
    expect(spyEvent).toHaveBeenTriggeredOnAndWith(document {
      username: 'bob'
    });
  });
});
```

## Contributing to this project

Anyone and everyone is welcome to contribute. Please take a moment to
review the [guidelines for contributing](CONTRIBUTING.md).

* [Bug reports](CONTRIBUTING.md#bugs)
* [Feature requests](CONTRIBUTING.md#features)
* [Pull requests](CONTRIBUTING.md#pull-requests)

## Authors

* [@tbrd](http://github.com/tbrd)

## Thanks

* [@esbie](http://github.com/esbie) and
  [@skilldrick](http://github.com/skilldrick) for creating the original
  `describeComponent` & `describeMixin` methods.
* [@necolas](http://github.com/necolas) for ongoing support & development

## License

Copyright 2013 Twitter, Inc and other contributors.

Licensed under the MIT License
