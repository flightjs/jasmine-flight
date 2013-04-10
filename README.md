flight-jasmine [![Build Status](https://travis-ci.org/twitter/flight-jasmine.png?branch=master)](http://travis-ci.org/twitter/flight-jasmine)
==============

Extensions to the Jasmine test framework for use with [Flight](https://github.com/twitter/flight)

# Getting started

Copy [lib/flight-jasmine.js](lib/flight-jasmine.js) in to your app and load in test runner.

## Components
```javascript
describeComponent('path/to/component', function () {
  beforeEach(setupComponent);

  it('should do x', function () {
    // a component instance is now accessible as this.component
    // the component root node is attached to the DOM
    // the component root node is also available as this.$node
  });
});
```

## Mixins
```javascript
describeMixin('path/to/mixin', function () {
  // initialize the component and attach it to the DOM
  beforeEach(setupComponent);

  it('should do x', function () {
    expect(this.component.doSomething()).toBe(expected);
  });
});
```

## Event spy
```javascript
describeComponent('data/twitter_profile', function () {
  beforeEach(setupComponent);

  describe('listens for uiNeedsTwitterUserId', function () {

    // was the event triggered?
    it('and triggers dataTwitterUserId', function () {
      var eventSpy = spyOnEvent(document, 'dataTwitterProfile');
      $(document).trigger('uiNeedsTwitterUserId', {
        screen_name: 'tbrd'
      });
    expect(eventSpy).toHaveBeenTriggeredOn(document);
    });

    // is the user id correct?
    it('and has correct id', function () {
      var eventSpy = spyOnEvent(document, 'dataTwitterUserId');
      $(document).trigger('uiNeedsTwitteruserId', {
        screen_name: 'tbrd'
      });
      expect(eventSpy.mostRecentCall.data).toEqual({
        screen_name: 'tbrd',
        id: 4149861
      });
    });
  });
});
```
## setupComponent
```javascript
setupComponent(optionalFixture, optionalOptions);
```
Calling setupComponent twice will create an instance, tear it down and create a new one.

### HTML Fixtures
```javascript
describeComponent('ui/twitter_profile', function () {
  // is the component attached to the fixture?
  it('this.component.$node has class "foo"', function () {
    setupComponent('<span class="foo">Test</span>');
    expect(this.component.$node).toHaveClass('foo');
  });
});
```
### Component Options
```javascript
describeComponent('data/twitter_profile', function () {
  // is the option set correctly?
  it('this.component.attr.baseUrl is set', function () {
    setupComponent({
      baseUrl: 'http://twitter.com/1.1/'
    });
  expect(this.component.attr.baseUrl).toBe('http://twitter.com/1.1/');
  });
});
```
# Teardown

Components are automatically torn down after each test.

# Why flight-jasmine?

Flight components are defined by their interface: the events they trigger and handle, and how they interact with the DOM. They are also highly independent, with no reliance on other components. These two factors allow them to be rigourously and exhaustively tested.

However, Flight does not expose component instances so testing them can be tricky. Also, out-of-the-box Jasmine does not support testing of jQuery Events.

flight-jasmine provides the developer with simple methods for setting up, exposing and tearing down component instances, and for testing whether expected events are triggered.


## Contributing to this project

Anyone and everyone is welcome to contribute. Please take a moment to
review the [guidelines for contributing](CONTRIBUTING.md).

* [Bug reports](CONTRIBUTING.md#bugs)
* [Feature requests](CONTRIBUTING.md#features)
* [Pull requests](CONTRIBUTING.md#pull-requests)

## Authors

+ [@tbrd](http://github.com/tbrd)

## Thanks

+ [@esbie](http://github.com/esbie) and [@skilldrick](http://github.com/skilldrick) for creating the original describeComponent & describeMixin methods
+ [@necolas] (http://github.com/necolas) for CONTRIBUTING.md

## License
Copyright 2013 Twitter, Inc and other contributors.

Licensed under the MIT License
