import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, selectContacts } from './contactsSlice';
import { nanoid } from 'nanoid';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const [formData, setFormData] = useState({ name: '', number: '' });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleAddContact = () => {
    const { name, number } = formData;

    if (name.trim() === '' || number.trim() === '') {
      alert("Будь ласка, введіть ім'я та номер контакту.");
      return;
    }

    // Перевірка наявності контакту із введеним ім'ям або номером
    const contactExists = contacts.some(
      contact =>
        contact.name.toLowerCase() === name.toLowerCase() ||
        contact.number === number
    );

    if (contactExists) {
      alert("Контакт з таким ім'ям або номером вже існує.");
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    dispatch(addContact(newContact));
    setFormData({ name: '', number: '' });
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
