var
  React = require('react'),
  SynthModule = require('./SynthModule.js'),
  ModuleListItem = require('./ModuleListItem.js'),
  moduleStore = require('../stores/moduleStore'),
  appConstants = require('../constants/appConstants');

var ModuleList = React.createClass({
  getInitialState: function(){
    return {
      modules: moduleStore.getModuleList()
    }
  },     
  render: function(){
    var self = this;
    var listItems = Object.keys(this.props.moduleList).map(function (key) {
      var currentItem = self.props.moduleList;
      return <ModuleListItem key={currentItem[key]._id} _id={currentItem[key]._id} name={currentItem[key].name} />
    })
    return (
      <div>
        <h3>Module List</h3>
        {listItems}
      </div>
    )
  }  
});

module.exports = ModuleList;