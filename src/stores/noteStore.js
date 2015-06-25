var 
  AppDispatcher = require('../dispatcher/AppDispatcher'),
  appConstants = require('../constants/appConstants'),
  objectAssign = require('react/lib/Object.assign'),
  EventEmitter = require('events').EventEmitter;

var _store = {
  activeNotes: {}
};

var noteStart = function(data){
  if (!_store.activeNotes[data.note]) {
    _store.activeNotes[data.note] = data.frequency;
  }
};

var noteStop = function(data){
  if (_store.activeNotes[data.note]) {
    delete _store.activeNotes[data.note];
  }
}

var noteStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListeners: function(startCallback, stopCallback){
    this.on(appConstants.events.NOTE_START, startCallback);
    this.on(appConstants.events.NOTE_STOP, stopCallback);
  },
  removeChangeListener: function(startCallback, stopCallback){
    this.removeListener(appConstants.events.NOTE_START, startCallback);
    this.removeListener(appConstants.events.NOTE_STOP, stopCallback);
  },
  getActiveNotes: function(){
    return _store.activeNotes;
  },
});

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case appConstants.events.NOTE_START:
      noteStart(action.data);
      noteStore.emit(appConstants.events.NOTE_START, action.data);
      break;
    case appConstants.events.NOTE_STOP:
      noteStop(action.data);
      noteStore.emit(appConstants.events.NOTE_STOP, action.data);
      break;
    default:
      return true;
  }
});

module.exports = noteStore;