import React from 'react';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';

const App = () => {
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
