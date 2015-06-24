var
  React = require('react'),
  Synthesizer = require('./Synthesizer'),
  ModuleList = require('./ModuleList'),
  ModuleViewContainer = require('./ModuleViewContainer'),
  noteStore = require('../stores/noteStore'),   
  InputDevice = require('./InputDevice');

var Synthesizer = React.createClass({
  getInitialState: function() {
    return {
      audioContext: new AudioContext,
      oscillators: {}
    } 
  },
  componentDidMount: function(){
    noteStore.addChangeListeners(this._onNoteStart, this._onNoteStop);
  },    
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
          <InputDevice audioContext={this.state.audioContext}/>
        </div>
      </div>
    )
  },
  _onNoteStart: function(value){
    this.state.oscillators[value.note] = this.state.audioContext.createOscillator();
    this.state.oscillators[value.note].type = 'square';
    this.state.oscillators[value.note].connect(this.state.audioContext.destination)    
    this.state.oscillators[value.note].frequency.setValueAtTime(value.frequency, this.state.audioContext.currentTime);
    this.state.oscillators[value.note].start();
    console.log("Starting " + value.note)
  },
  _onNoteStop: function(value){
    this.state.oscillators[value.note].stop();
    console.log("Stopping " + value.note)
  }  
});

module.exports = Synthesizer;