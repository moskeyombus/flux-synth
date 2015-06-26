var
  React = require('react'),
  noteStore = require('../../stores/noteStore'),  
  Keyboard = require('../Keyboard'),
  moduleStore = require('../../stores/moduleStore');

var InputDeviceModule = React.createClass({
  getInitialState: function(){
    return {
      activeNotes: noteStore.getActiveNotes()
    }
  },  
  componentDidMount: function(){
    noteStore.addChangeListeners(this._onChange, this._onChange);
  },   
  render: function(){
    if (this.props.selected) {
      return (
        <div>
          <p>Currently playing {Object.keys(this.state.activeNotes).join(', ')}</p>
          <Keyboard name="blank keyboard" activeKeys={this.activeNotes} />
        </div>
      )
    }
    else {
      return (<div><span></span></div>)
    }    
  },
  _onChange: function(value){
    this.setState({
      activeNotes: noteStore.getActiveNotes()
    })
  } 
});

module.exports = InputDeviceModule;