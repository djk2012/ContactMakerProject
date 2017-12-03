var AppDispatcher = require('../dispatcher/AppDispatcher');
var ContactConstants = require('../constants/ContactConstants');

var ContactActions = {

  /**
   * Saving new contact
   * @param {string} new contact object
   */
  create: function(newContact) {
  	// adding avatar randomly!
  	var avatar = 'img/faces/' + Math.floor(Math.random() * (15-1) + 1) + '.jpg';
  	newContact.avatar = avatar;

    AppDispatcher.dispatch({
      actionType: ContactConstants.Contact_CREATE,
      name: newContact.name,
      phone: newContact.phone,
      email: newContact.email,
      company:newContact.company,
      avatar: newContact.avatar
    });
  },
  /**
   * Opening modal to edit contact
   */
  edit: function(contact) {
    AppDispatcher.dispatch({
      actionType: ContactConstants.Contact_EDIT,
      id: contact.id,
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      company:contact.company,
      avatar: contact.avatar
    });
  },
  /**
   * Saving edited contact
   */
  save: function(contact) {
    AppDispatcher.dispatch({
      actionType: ContactConstants.Contact_SAVE,
      id: contact.id,
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      company:contact.company,
      avatar: contact.avatar
    });
  },

  /**
   * removing contact
   */
  remove: function(removeId) {
    AppDispatcher.dispatch({
      actionType: ContactConstants.Contact_REMOVE,
      id: removeId
    });
  }

};

module.exports = ContactActions;
