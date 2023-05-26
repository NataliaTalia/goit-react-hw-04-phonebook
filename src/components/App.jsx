import { useState, useEffect } from 'react';

import Form from './Form/Form';
import Contacts from './Contacts/Contacts';
import Filter from './Filter/Filter';

const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem('contacts')) ?? ''
  );
  const [filter, setFilter] = useState('');

  const formSubmitHandler = data => {
    const { name, number } = data;

    console.log(data);

    const existingContact = contacts.find(
      contact => contact.name === name && contact.number === number
    );
    console.log(existingContact);

    if (existingContact) {
      alert(`${existingContact.name} already exists`);
    } else {
      setContacts(prevContacts => [
        ...prevContacts,
        { name: data.name, number: data.number, id: data.id },
      ]);
    }
  };

  const filterHandler = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContact = () => {
    const normalizedFilter = filter.toLocaleLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // useEffect(() => {
  //   const contacts = localStorage.getItem('contacts');

  //   const parsedContacts = JSON.parse(contacts);
  //   console.log(parsedContacts);
  //   if (parsedContacts) {
  //     setContacts(parsedContacts);
  //   }
  // }, [contacts]);

  return (
    <div
      style={{
        height: '100vh',
        // display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <h1>Phonebook</h1>
      <Form onSubmit={formSubmitHandler} contacts={contacts} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={filterHandler} />
      <Contacts contacts={getVisibleContact()} onDelete={deleteContact} />
    </div>
  );
};

export default App;
