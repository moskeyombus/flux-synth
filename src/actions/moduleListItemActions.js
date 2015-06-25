var 
  AppDispatcher = require('../dispatcher/AppDispatcher'),
  appConstants = require('../constants/appConstants');

var moduleListItemActions = {
  selectModule: function(data){
    AppDispatcher.handleAction({
      actionType: appConstants.events.SELECT_MODULE,
      data: data
    });
  }
};

module.exports = moduleListItemActions;