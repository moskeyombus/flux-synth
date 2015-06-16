var 
  AppDispatcher = require('../dispatcher/AppDispatcher'),
  appConstants = require('../constants/appConstants'),
  objectAssign = require('react/lib/Object.assign'),
  EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _store = {
  activeKeys: {}
};

var keyDown = function(data){
  if (!_store.activeKeys[data.note]) {
    _store.activeKeys[data.note] = data.frequency;
  }
};

var keyUp = function(note){
  if (_store.activeKeys[note]) {
    delete _store.activeKeys[note];
  }
}

var keyboardStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(callback){
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback){
    this.removeListener(CHANGE_EVENT, callback);
  },
  getActiveKeys: function(){
    return _store.activeKeys;
  },
});

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case appConstants.KEY_DOWN:
      keyDown(action.data);
      keyboardStore.emit(CHANGE_EVENT);
      break;
    case appConstants.KEY_UP:
      keyUp(action.data);
      keyboardStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

module.exports = keyboardStore;