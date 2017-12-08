var React = require('react');
var Navbar = require('./Navbar.react');
var ContactModal = require('./ContactModal.react');
var EditContactModal = require('./EditContactModal.react');
var ContactList = require('./ContactList.react');
var ContactStore = require('../stores/ContactStore');
var ContactActions = require('../actions/ContactActions');


/**
 * Retrieve the current Contacts data from the ContactStore
 */
function getContactsState() {
  return {
    allContacts: ContactStore.getAll(),
    editContact: ContactStore.getEditContact()
  };
}

var ContactApp = React.createClass({
  getInitialState: function() {
    // loading existing data
    this._initializeContacts();
    return getContactsState();
  },
  componentDidMount: function() {
		ContactStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    ContactStore.removeChangeListener(this._onChange);
  },
	render: function() {
    // request to edit a specific contact from store
    var editId = this.state.editContact.id;
    var editContact = this.state.editContact;
    if (editId !== undefined) {
      $('#edit_contact_modal').openModal();

      // fill form elements with selected contact info
      $('#edit_contact_form').find('#contact_id').val(editContact.id);
      $('#edit_contact_form').find('#contact_name').val(editContact.name);
      $('#edit_contact_form').find('#contact_phone').val(editContact.phone);
      $('#edit_contact_form').find('#contact_company').val(editContact.company);
      $('#edit_contact_form').find('#contact_email').val(editContact.email);
      $('#edit_contact_form').find('#contact_avatar').val(editContact.avatar);

      // focus on the first field with a little delay so it won't mess-
      // with modal focus
      setTimeout(function() {
        $('#edit_contact_form').find('#contact_name').focus();
      },50);
      

      // changing back to undefined so it prevent from opening the modal-
      // everytime the view is rendering
      this.state.editContact.id = undefined;
    }
    // main block
    return(
      <ul className="collection">
        <Navbar/>
        <ContactList data={this.state.allContacts}/>
        <ContactModal />
        <EditContactModal editContact={this.state.editContact} />
      </ul>

    );
  },
  /**
  * Event handler for 'change' events coming from the ContactStore
  */
  _onChange: function() {
    this.setState(getContactsState());

  },
  _initializeContacts: function() {
    // loading imaginary contacts
    // can also be loaded from a remote server
    var contacts = [
            {
              id: 1,
              name : 'James Bond',
              phone: '413-307-5859',
              company:'Ericsson AB',
              email: 'jamesbonds@yahoo.com'
            },
            {
              id: 2,
              name : 'Chris henrysson',
              phone: '511-357-5259',
              company:'Volvo AB',
              email: 'Chrishenrysson@gmail.com'
            },
            {
              id: 3,
              name : 'Ricky Green',
              phone: '138-379-0152',
              company:'computech-it',
              email: 'richygreen@126.us'
            }

          ];

        // looping through loaded contacts to create them individually
        // sending action
        contacts.forEach(function(obj) {
        	ContactActions.create(obj);
        });
  }

});

module.exports = ContactApp;