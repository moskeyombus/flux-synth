var
  React = require('react'),
  MultiOscillatorModule = require('./MultiOscillatorModule'),
  InputDeviceModule = require('./InputDeviceModule'),  
  AudioOutputModule = require('./AudioOutputModule'),
  noteStore = require('../../stores/noteStore'),
  moduleStore = require('../../stores/moduleStore'),
  appConstants = require('../../constants/appConstants');

var SynthModule = React.createClass({
  getInitialState: function(){
    moduleStore.addSelectModuleListener(this._onSelectModule);
    return {
      inputConnected: this.props.inputConnected,
      selected: false
    }
  },
  render: function(){
    return (
      <div>
        {this.chooseModule()}
      </div>
    )
  },
  chooseModule: function() {
    switch(this.props.type){
      case appConstants.moduleTypes.INPUT:
        return <InputDeviceModule key={this.props._id} _id={this.props._id} selected={this.state.selected} />
        break;    
      case appConstants.moduleTypes.SYNTH_MODULE:
        return <MultiOscillatorModule key={this.props._id} _id={this.props._id} audioContext={this.props.audioContext} inputConnected={true} selected={this.state.selected} />
        break;
      case appConstants.moduleTypes.OUTPUT:
        return <AudioOutputModule key={this.props._id} _id={this.props._id} audioContext={this.props.audioContext} />
        break;          
      default:
        return (<div><span></span></div>)
    }  
  },  
  _onSelectModule: function(module) {
    if(module._id === this.props._id && this.state.selected) {
      this.setState({selected: false})
    }
    else if(module._id === this.props._id) {
      this.setState({selected: true})
    }
  } 
});

module.exports = SynthModule;