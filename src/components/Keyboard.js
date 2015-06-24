var
  React = require('react'),
  qwertyHancock = require('../../node_modules/qwerty-hancock/dist/qwerty-hancock'),
  keyboardActions = require('../actions/keyboardActions');  

var Keyboard = React.createClass({
  getInitialState: function(){
    return {
      keysPressed: this.props.activeKeys
    }
  },
  componentDidMount: function(){
    var self = this;

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
    this.keyboard.keyUp = function (note, frequency) {
      self.handleKeyUp(note, frequency);
    };       
  },
  handleKeyDown: function(note, frequency){
    keyboardActions.keyDown(note, frequency);
  },
  handleKeyUp: function(note, frequency){
    keyboardActions.keyUp(note, frequency);
  }, 
  render: function(){   
    return (
      <div>
        <div id="keyboard"></div>
      </div>
    )
  }
});

module.exports = Keyboard;