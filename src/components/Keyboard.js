var
  React = require('react'),
  qwertyHancock = require('../../node_modules/qwerty-hancock/dist/qwerty-hancock'),
  keyboardStore = require('../stores/keyboardStore'),
  keyboardActions = require('../actions/keyboardActions');  

var Keyboard = React.createClass({
  getInitialState: function(){
    return {
      keysPressed: keyboardStore.getActiveKeys()
    }
  },
  componentDidMount: function(){
    var self = this;
    keyboardStore.addChangeListener(this._onChange);
    this.keyboard = new QwertyHancock({
      id: 'keyboard',
      width: 600,
      height: 150,
      octaves: 2,
      startNote: 'A3',
      whiteNotesColour: 'white',
      blackNotesColour: 'black',
      hoverColour: '#f3e939'
    }); 
    this.keyboard.keyDown = function (note, frequency) {
      self.handleKeyDown(note, frequency);
    };
    this.keyboard.keyUp = function (note) {
      self.handleKeyUp(note);
    };       
  },
  handleKeyDown: function(note, frequency){
    keyboardActions.keyDown(note, frequency);
  },
  handleKeyUp: function(note, frequency){
    keyboardActions.keyUp(note, frequency);
  }, 
  _onChange: function(){
    this.setState({
      keysPressed: keyboardStore.getActiveKeys()
    })
  },   
  render: function(){   
    return (
      <div>
        <p>Currently playing {this.state.keysPressed.join(', ')}</p>
        <div id="keyboard"></div>
      </div>
    )
  }
});

module.exports = Keyboard;