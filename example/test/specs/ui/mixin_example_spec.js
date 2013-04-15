describeMixin('app/ui/mixin_example', function () {

  beforeEach(function () {
    // setup
    setupComponent();
  });

  afterEach(function () {
    // teardown
  });

  describe('fixtures are appended to $node', function() {
    it ('test html fixture', function() {
      var fixture = '<div class="js-bar" />';
      setupComponent(fixture, {
        barSelector: '.js-bar'
      });
      expect(this.component.$node.filter('.js-bar').length).toBe(1);
    });

    it ('test jQuery fixture', function() {
      var fixture = $('<div class="js-bar" />');
      setupComponent(fixture, {
        barSelector: '.js-bar'
      });
      expect(this.component.$node.filter('.js-bar').length).toBe(1);
    });

    it('test negative result', function() {
      var fixture = '<div class="js-foo" />';
      setupComponent(fixture);
      expect(this.component.$node.filter('.js-bar').length).toBe(0);
    });
  });
});
