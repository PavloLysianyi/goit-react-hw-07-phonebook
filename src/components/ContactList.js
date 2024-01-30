import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from './operations';
import {
  selectContacts,
  selectFilter,
  selectLoading,
  selectError,
} from './selectors';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const filteredContacts = contacts.filter(
    contact =>
      (contact.name &&
        contact.name.toLowerCase().includes(filter.toLowerCase())) ||
      (contact.number &&
        contact.number.toLowerCase().includes(filter.toLowerCase()))
  );

  const handleDeleteContact = async id => {
    try {
      dispatch(deleteContact(id));
    } catch (error) {
      console.error('Error deleting contact:', error.message);
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul className="list">
        {filteredContacts.map(contact => (
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
