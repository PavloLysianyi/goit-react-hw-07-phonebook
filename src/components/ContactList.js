import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from './contactsSlice';
import { deleteContact as deleteContactFromApi } from './api';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);
  const loading = useSelector(state => state.contacts.isLoading);
  const error = useSelector(state => state.contacts.error);

  const handleDeleteContact = async id => {
    dispatch(deleteContact.pending());

    try {
      await deleteContactFromApi(id);
      dispatch(deleteContact.fulfilled(id));
    } catch (error) {
      console.error('Error deleting contact:', error.message);
      dispatch(deleteContact.rejected('Failed to delete contact'));
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
    </div>
  );
};

export default ContactList;
