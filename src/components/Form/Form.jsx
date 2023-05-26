import { useState } from 'react';
import { nanoid } from 'nanoid';

const Form = ({ contacts, onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleInput = e => {
    const { name, value } = e.currentTarget;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
    console.log(name);
    console.log(value);
  };

  const handleSubmit = e => {
    const newContact = {
      name,
      number,
      id: nanoid(),
    };
    e.preventDefault();
    console.log(contacts);
    onSubmit(newContact);
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const nameInputId = nanoid();
  const numberInputId = nanoid();

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={nameInputId}>Name</label>
      <input
        onChange={handleInput}
        value={name}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        id={nameInputId}
      />

      <label htmlFor={numberInputId}>Number</label>
      <input
        onChange={handleInput}
        value={number}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        id={numberInputId}
      />

      <button type="submit">Add contact</button>
    </form>
  );
};

export default Form;
