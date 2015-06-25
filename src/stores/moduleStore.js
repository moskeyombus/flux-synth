var 
  AppDispatcher = require('../dispatcher/AppDispatcher'),
  appConstants = require('../constants/appConstants'),
  objectAssign = require('react/lib/Object.assign'),
  EventEmitter = require('events').EventEmitter,
  shortid = require('shortid');

var CHANGE_EVENT = 'change';

var _store = {
  modules: {},
  selectedModule: null
};

var addModule = function(data) {
  data.order = Object.keys(_store.modules).length;
  data._id = shortid.generate();
  _store.modules[data._id] = data
} 

var moduleStore = objectAssign({}, EventEmitter.prototype, {
  addNewModuleListener: function(callback){
    this.on(appConstants.events.ADD_MODULE, callback);
  },
  removeNewModuleListener: function(callback){
    this.removeListener(appConstants.events.ADD_MODULE, callback);
  },  
  addSelectModuleListener: function(callback){
    this.on(appConstants.events.SELECT_MODULE, callback);
  },
  removeSelectModuleListener: function(callback){
    this.removeListener(appConstants.events.SELECT_MODULE, callback);
  },
  getSelectedModule: function(){
    return _store.selectedModule;
  },
  getModuleList: function() {
    return _store.modules;
  }
});

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case appConstants.events.ADD_MODULE:
      addModule(action.data)
      moduleStore.emit(appConstants.events.ADD_MODULE, action.data);
      break;    
    case appConstants.events.SELECT_MODULE:
      _store.selectedModule = action.data.moduleId;
      moduleStore.emit(appConstants.events.SELECT_MODULE, _store.modules[_store.selectedModule]);
      break;
    default:
      return true;
  }
});

module.exports = moduleStore;