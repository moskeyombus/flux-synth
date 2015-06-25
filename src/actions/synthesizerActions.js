var 
  AppDispatcher = require('../dispatcher/AppDispatcher'),
  appConstants = require('../constants/appConstants');

var synthesizerActions = {
  triggerFrequency: function(frequency){
    AppDispatcher.handleAction({
      actionType: appConstants.events.TRIGGER_FREQUENCY,
      data: { frequency: frequency }
    });
  },
  addModule: function(data){
    AppDispatcher.handleAction({
      actionType: appConstants.events.ADD_MODULE,
      data: data
    });
  }
};

module.exports = synthesizerActions;