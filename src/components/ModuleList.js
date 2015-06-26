var
  React = require('react'),
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
      var currentItem = self.props.moduleList[key];
      return <ModuleListItem key={currentItem._id} _id={currentItem._id} name={currentItem.name} />
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