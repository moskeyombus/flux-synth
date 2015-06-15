var qwertyHancock = require('../../node_modules/qwerty-hancock/dist/qwerty-hancock')

var Keyboard = React.createClass({
  componentDidMount: function(){
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
  },  
  render: function(){   
    return (
      <div id="keyboard">
        and this is the <b>{this.props.name}</b>.
      </div>
    )
  }
});

module.exports = Keyboard;