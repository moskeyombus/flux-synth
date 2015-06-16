var 
  AppDispatcher = require('../dispatcher/AppDispatcher'),
  appConstants = require('../constants/appConstants'),
  objectAssign = require('react/lib/Object.assign'),
  EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _store = {
  activeKeys: []
};

var keyDown = function(note, frequency){
  var index = _store.activeKeys.indexOf(note);
  if (index < 0) {
    _store.activeKeys.push(note);
  }
};

var keyUp = function(note){
  var index = _store.activeKeys.indexOf(note);
  if (index > -1) {
    _store.activeKeys.splice(index, 1);
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
    console.log(_store.activeKeys);
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