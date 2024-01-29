import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, selectContacts, selectFilter } from './contactsSlice';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
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
  );
};

export default ContactList;
