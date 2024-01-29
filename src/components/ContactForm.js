import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  addContact,
  setContactsLoading,
  setContactsError,
} from './contactsSlice';
import { addNewContact } from './api';

const ContactForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ name: '', number: '' });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleAddContact = async () => {
    dispatch(setContactsLoading(true));

    const { name, number } = formData;

    if (name.trim() === '' || number.trim() === '') {
      alert("Будь ласка, введіть ім'я та номер контакту.");
      dispatch(setContactsLoading(false));
      return;
    }

    try {
      const newContact = await addNewContact({
        name,
        number,
      });

      dispatch(addContact(newContact));
      setFormData({ name: '', number: '' });
    } catch (error) {
      console.error('Error adding contact:', error.message);
      dispatch(setContactsError('Failed to add contact'));
    } finally {
      dispatch(setContactsLoading(false));
    }
  };

  return (
    <div className="form-container">
      <label className="label">
        Ім'я контакту:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="input"
        />
      </label>
      <label className="label">
        Номер телефону:
        <input
          type="tel"
          name="number"
          value={formData.number}
          onChange={handleInputChange}
          required
          className="input"
        />
      </label>
      <button type="button" onClick={handleAddContact} className="button">
        Додати контакт
      </button>
    </div>
  );
};

export default ContactForm;
