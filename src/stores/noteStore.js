var 
  AppDispatcher = require('../dispatcher/AppDispatcher'),
  appConstants = require('../constants/appConstants'),
  objectAssign = require('react/lib/Object.assign'),
  EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

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
    this.on(appConstants.NOTE_START, startCallback);
    this.on(appConstants.NOTE_STOP, stopCallback);
  },
  removeChangeListener: function(startCallback, stopCallback){
    this.removeListener(appConstants.NOTE_START, startCallback);
    this.removeListener(appConstants.NOTE_STOP, stopCallback);
  },
  getActiveNotes: function(){
    return _store.activeNotes;
  },
});

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case appConstants.NOTE_START:
      noteStart(action.data);
      noteStore.emit(appConstants.NOTE_START, action.data);
      break;
    case appConstants.NOTE_STOP:
      noteStop(action.data);
      noteStore.emit(appConstants.NOTE_STOP, action.data);
      break;
    default:
      return true;
  }
});

module.exports = noteStore;