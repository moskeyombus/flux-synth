var
  React = require('react'), 
  ModuleList = require('./ModuleList'),
  ModuleViewContainer = require('./ModuleViewContainer'),
  InputDevice = require('./InputDevice');

var SynthesizerContainer = React.createClass({
  render: function(){
    return (
      <div class="row">
        <div class="col-md-4">
          <ModuleList />
        </div>
        <div class="col-md-8">
          <ModuleViewContainer />
        </div>        
        <div class="col-md-12">
          <InputDevice />
        </div>
      </div>
    )
  }
});

module.exports = SynthesizerContainer;