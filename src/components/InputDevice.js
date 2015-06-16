var
  React = require('react'), 
  Keyboard = require('./Keyboard');

var InputDevice = React.createClass({
  render: function(){
    return (
      <div>
        <div> This is the input device. </div>
        <Keyboard name="blank keyboard"/>
      </div>
    )
  }
});

module.exports = InputDevice;