var
  React = require('react');

var AudioOutputModule = React.createClass({
  getInitialState: function(){
    return {}
  },    
  render: function(){
    if (this.props.selected) {
      return (
        <div>
          <p>Placeholder audio out</p>
        </div>
      )
    }
    else {
      return (<div><span></span></div>)
    }    
  }
});

module.exports = AudioOutputModule;