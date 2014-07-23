var flight = require('flightjs');

module.exports = flight.component(Example);

function Example() {
  this.defaultAttrs({
    param: 'defaultParam'
  });
}
