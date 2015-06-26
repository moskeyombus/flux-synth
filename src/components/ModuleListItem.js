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
  },
  _onSelectModule: function(module) {
    if(module._id === this.state._id && this.state.selected) {
      this.setState({selected: false})
    }
    else if(module._id === this.state._id) {
      this.setState({selected: true})
    }
  }
});

module.exports = ModuleListItem;