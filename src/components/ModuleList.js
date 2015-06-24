var
  React = require('react');

var ModuleList = React.createClass({
  getInitialState: function(){
    return {
      modules: []
    }
  },
  addModule: function(module) {
    this.setState({
      modules: this.state.modules.concat([module])
    });
  }, 
  render: function(){
    var listItems = this.state.modules.map(function(module){
      return <li> {module.name} </li>;
    });    
    return (
      <div>
        <h3>Module List</h3>
        <button onClick={this.addModule}> Add Module </button>
        <ul>
          <li>Input Device</li>
          {listItems}
          <li>Output Device</li>
        </ul>
      </div>
    )
  }
});

module.exports = ModuleList;