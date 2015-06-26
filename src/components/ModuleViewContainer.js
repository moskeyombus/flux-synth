var
  React = require('react'),
  SynthModule = require('./modules/SynthModule'),
  moduleStore = require('../stores/moduleStore'),
  appConstants = require('../constants/appConstants');

var ModuleViewContainer = React.createClass({
  getInitialState: function(){
    moduleStore.addSelectModuleListener(this._onSelectModule);
    return {
      module: null
    }
  },   
  render: function(){
    var 
      self = this,
      currentRendered,
      currentItem;
    
    var moduleList = Object.keys(this.props.modules).map(function (key) {
      currentItem = self.props.modules[key];
      return <SynthModule key={currentItem._id} _id={currentItem._id} type={currentItem.type} audioContext={self.props.audioContext} />    
    })
    return (
      <div>
        <h3>Module View Container</h3>
        {moduleList}
      </div>
    )
  },
  _onSelectModule: function(module) {
    this.setState({module: module})
  }  
});

module.exports = ModuleViewContainer;