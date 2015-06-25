var
  React = require('react'),
  moduleStore = require('../stores/moduleStore');

var ModuleViewContainer = React.createClass({
  getInitialState: function(){
    moduleStore.addSelectModuleListener(this._onSelectModule);
    return {
      module: null
    }
  },   
  render: function(){
    var message = <p>No module selected.</p>
    if(this.state.module) {
      message = <p>Current selected module is {this.state.module.name}</p>
    }
    return (
      <div>
        <h3>Module View Container</h3>
        {message}
      </div>
    )
  },
  _onSelectModule: function(module) {
    this.setState({module: module})
  }  
});

module.exports = ModuleViewContainer;