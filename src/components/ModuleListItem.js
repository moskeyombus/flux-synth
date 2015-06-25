var
  React = require('react'),
  moduleStore = require('../stores/moduleStore'),
  moduleListItemActions = require('../actions/moduleListItemActions');

var ModuleListItem = React.createClass({
  getInitialState: function(){
    moduleStore.addSelectModuleListener(this._onSelectModule);
    return {
      _id: this.props._id,
      name: this.props.name,
      selected: false
    }
  },     
  render: function(){
    var elementClass = '';
    if(this.state.selected) {
      elementClass = 'selected';
    }
    return (
      <p className={elementClass} onClick={this._handleClick} key={this.state._id}>{ this.state.name }</p>
    )
  },
  _handleClick: function() {
    moduleListItemActions.selectModule({ moduleId: this.state._id });
    this.setState({selected: true})
  },
  _onSelectModule: function(module) {
    if(moduleStore.getSelectedModule() !== this.state._id) {
      this.setState({selected: false})
    }
  }
});

module.exports = ModuleListItem;