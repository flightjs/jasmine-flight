define([], function () {
  var withMixinName = function () {

    this.defaultAttrs({
      barSelector: '.bar'
    });

    this.foo = function() {

    };

    this.bar = function() {
      var $bar = this.select('barSelector');
      return $bar.length > 0;
    };

    this.after('initialize', function() {

    });

  };

  return withMixinName;

});