var
  React = require('react'),
  noteStore = require('../../stores/noteStore');

var MultiOscillatorModule = React.createClass({
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
    if (this.props.selected) {
      return (
        <div>
          <div> Multi Oscillator Module </div>
        </div>
      )
    }
    else {
      return (<div><span></span></div>)
    }
  },
  _onNoteStart: function(value){
    if(this.state.inputConnected) {
      this.state.oscillators[value.note] = this.props.audioContext.createOscillator();
      this.state.oscillators[value.note].type = 'saw';
      this.state.oscillators[value.note].connect(this.props.audioContext.destination)    
      this.state.oscillators[value.note].frequency.setValueAtTime(value.frequency, this.props.audioContext.currentTime);
      this.state.oscillators[value.note].start();
    }
  },
  _onNoteStop: function(value){
    if(this.state.inputConnected) {
      this.state.oscillators[value.note].stop();
    }
  } 
});

module.exports = MultiOscillatorModule;