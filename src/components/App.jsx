import React, { useEffect } from 'react';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import { useDispatch } from 'react-redux';
import { fetchContacts } from './operations';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className="container">
      <h1 className="heading">Phonebook</h1>
      <ContactForm />
      <h2 className="sub-heading">Contacts</h2>
      <Filter />
      <ContactList />
    </div>
  );
};

export default App;
