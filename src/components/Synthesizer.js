var
  React = require('react'),
  Synthesizer = require('./Synthesizer'),
  ModuleList = require('./ModuleList'),
  ModuleViewContainer = require('./ModuleViewContainer'),    
  InputDevice = require('./InputDevice'),
  moduleStore = require('../stores/moduleStore'),   
  synthesizerActions = require('../actions/synthesizerActions'),
  appConstants = require('../constants/appConstants');

var Synthesizer = React.createClass({
  getInitialState: function() {
    moduleStore.addNewModuleListener(this._onNewModule);
    return {
      audioContext: new AudioContext,
      modules: {}
    } 
  },  
  componentDidMount: function(){
    synthesizerActions.addModule({name: "Primary Input", type: appConstants.moduleTypes.INPUT})
    synthesizerActions.addModule({name: "Synth Module", type: appConstants.moduleTypes.SYNTH_MODULE})
    synthesizerActions.addModule({name: "Primary Output", type: appConstants.moduleTypes.OUTPUT})    
  },     
  render: function(){
    return (
      <div class="row">
        <div class="col-md-4">
          <ModuleList audioContext={this.state.audioContext} moduleList={this.state.modules}/>
        </div>
        <div class="col-md-8">
          <ModuleViewContainer />
        </div>        
        <div class="col-md-12">
          <InputDevice />
        </div>
      </div>
    )
  },
  _onNewModule: function(value){
    this.setState({modules: moduleStore.getModuleList()});
  }
});

module.exports = Synthesizer;