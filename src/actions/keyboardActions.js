var 
  AppDispatcher = require('../dispatcher/AppDispatcher'),
  appConstants = require('../constants/appConstants');

var keyboardActions = {
  keyDown: function(note, frequency){
    AppDispatcher.handleAction({
      actionType: appConstants.KEY_DOWN,
      data: { note: note, frequency: frequency }
    });
  },
  keyUp: function(note){
    AppDispatcher.handleAction({
      actionType: appConstants.KEY_UP,
      data: note
    })
  }
};

module.exports = keyboardActions;