
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ContactConstants = require('../constants/ContactConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _contacts = [];
var _editContact = {};

// will be used to incremental id for contacts
var currentId = 0;

// saving new contact
function create(newContact) {
  _contacts[currentId] = {
    id: currentId,
    name: newContact.name,
    phone: newContact.phone,
    email: newContact.email,
    company:newContact.company,
    avatar: newContact.avatar
  };
  currentId+=1;
}

// sending edit id to controller view
function edit(contact) {
  _editContact = {
    id: contact.id,
    name: contact.name,
    phone: contact.phone,
    email: contact.email,
    company:contact.company,
    avatar: contact.avatar
  };
}

// saving edited contact
function save(contact) {
  _contacts[contact.id] = {
    id: contact.id,
    name: contact.name,
    phone: contact.phone,
    email: contact.email,
    company:contact.company,
    avatar: contact.avatar
  };
}

// removing contact by user
function remove(removeId) {
  if (_contacts.hasOwnProperty(removeId)) {
    delete _contacts[removeId];
  }
}


var ContactStore = assign({}, EventEmitter.prototype, {
  /**
   * Get the entire Contacts.
   * @return {object}
   */
  getEditContact: function() {
    return _editContact;
  },
  getAll: function() {
    return _contacts;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case ContactConstants.Contact_CREATE:
      text = action.name.trim();
      if (text !== '') {
        create(action);
        ContactStore.emitChange();
      }
      break;

    case ContactConstants.Contact_EDIT:
      edit(action);
      ContactStore.emitChange();
      break;

    case ContactConstants.Contact_SAVE:
      save(action);
      ContactStore.emitChange();
      break;

    case ContactConstants.Contact_REMOVE:
      remove(action.id);
      ContactStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = ContactStore;