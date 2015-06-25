var 
  AppDispatcher = require('../dispatcher/AppDispatcher'),
  appConstants = require('../constants/appConstants');

var keyboardActions = {
  keyDown: function(note, frequency){
    AppDispatcher.handleAction({
      actionType: appConstants.events.NOTE_START,
      data: { note: note, frequency: frequency }
    });
  },
  keyUp: function(note, frequency){
    AppDispatcher.handleAction({
      actionType: appConstants.events.NOTE_STOP,
      data: { note: note, frequency: frequency }
    })
  }
};

module.exports = keyboardActions;