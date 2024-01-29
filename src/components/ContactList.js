import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from './contactsSlice';
import { deleteContact as deleteContactFromApi } from './api';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);

  const handleDeleteContact = async id => {
    try {
      await deleteContactFromApi(id);
      dispatch(deleteContact(id));
    } catch (error) {
      console.error('Error deleting contact:', error.message);
    }
  };

  return (
    <ul className="list">
      {contacts.map(contact => (
        <li key={contact.id} className="list-item">
          <span className="contact-info">
            {contact.name} - {contact.number}
          </span>
          <button
            type="button"
            onClick={() => handleDeleteContact(contact.id)}
            className="delete-button"
          >
            Видалити
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
