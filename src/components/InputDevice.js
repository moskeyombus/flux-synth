var
  React = require('react'),
  noteStore = require('../stores/noteStore'),  
  Keyboard = require('./Keyboard');

var InputDevice = React.createClass({
  getInitialState: function(){
    return {
      activeNotes: noteStore.getActiveNotes()
    }
  },  
  componentDidMount: function(){
    noteStore.addChangeListeners(this._onChange, this._onChange);
  },   
  render: function(){
    return (
      <div>
        <div> This is the input device. </div>
        <p>Currently playing {Object.keys(this.state.activeNotes).join(', ')}</p>
        <Keyboard name="blank keyboard" activeKeys={this.activeNotes} />
      </div>
    )
  },
  _onChange: function(value){
    this.setState({
      activeNotes: noteStore.getActiveNotes()
    })
  }  
});

module.exports = InputDevice;