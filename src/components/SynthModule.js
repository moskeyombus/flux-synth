var
  React = require('react'),
  noteStore = require('../stores/noteStore');

var SynthModule = React.createClass({
  getInitialState: function(){
    return {
      inputConnected: this.props.inputConnected,
      oscillators: {}
    }
  }, 
  componentDidMount: function(){
    noteStore.addChangeListeners(this._onNoteStart, this._onNoteStop);
  },    
  render: function(){
    return (
      <div>
        <div> Synth Module </div>
      </div>
    )
  },
  _onNoteStart: function(value){
    if(this.state.inputConnected) {
      this.state.oscillators[value.note] = this.props.audioContext.createOscillator();
      this.state.oscillators[value.note].type = 'square';
      this.state.oscillators[value.note].connect(this.props.audioContext.destination)    
      this.state.oscillators[value.note].frequency.setValueAtTime(value.frequency, this.props.audioContext.currentTime);
      this.state.oscillators[value.note].start();
    }
  },
  _onNoteStop: function(value){
    console.log(value)
    if(this.state.inputConnected) {
      this.state.oscillators[value.note].stop();
    }
  }  
});

module.exports = SynthModule;