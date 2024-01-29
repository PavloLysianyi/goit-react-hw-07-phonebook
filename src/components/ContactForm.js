import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact, fetchContacts } from './contactsSlice';
import { addNewContact } from './api'; // Add this import

const ContactForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ name: '', number: '' });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleAddContact = async () => {
    dispatch(addContact.pending());

    const { name, number } = formData;

    if (name.trim() === '' || number.trim() === '') {
      alert("Будь ласка, введіть ім'я та номер контакту.");
      dispatch(addContact.rejected('Failed to add contact'));
      return;
    }

    try {
      const newContact = await addNewContact({
        name,
        number,
      });

      dispatch(addContact.fulfilled(newContact));
      setFormData({ name: '', number: '' });
      dispatch(fetchContacts()); // Оновити список контактів після додавання нового контакту
    } catch (error) {
      console.error('Error adding contact:', error.message);
      dispatch(addContact.rejected('Failed to add contact'));
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