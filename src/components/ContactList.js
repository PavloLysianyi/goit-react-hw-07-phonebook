import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteContact,
  setContactsLoading,
  setContactsError,
  selectLoading,
  selectError,
} from './contactsSlice';
import { deleteContact as deleteContactFromApi } from './api';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const handleDeleteContact = async id => {
    dispatch(setContactsLoading(true));

    try {
      await deleteContactFromApi(id);
      dispatch(deleteContact(id));
    } catch (error) {
      console.error('Error deleting contact:', error.message);
      dispatch(setContactsError('Failed to delete contact'));
    } finally {
      dispatch(setContactsLoading(false));
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
