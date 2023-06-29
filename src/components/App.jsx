import React from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { MainTitle, MainDiv, ContactTitle } from './App.styled';

export class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contactsFromLocalStorage = JSON.parse(
      localStorage.getItem('contacts')
    );

    if (contactsFromLocalStorage) {
      this.setState({ contacts: contactsFromLocalStorage });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;

    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  deleteContact = deleteId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => id !== deleteId),
    }));
  };

  addContact = ({ name, number }) => {
    const allContacts = this.state.contacts;
    const contactExists = allContacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (contactExists) {
      alert(`${name} is already in contacts`);
      return;
    }

    if (!contactExists) {
      this.setState(prevState => ({
        contacts: [{ name, number, id: nanoid() }, ...prevState.contacts],
      }));
    }
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <MainDiv>
        <MainTitle>Phonebook</MainTitle>
        <ContactForm addContact={this.addContact} />

        <ContactTitle>Contacts</ContactTitle>
        <Filter filterValue={this.state.filter} onChange={this.handleInput} />
        <ContactList
          filteredContacts={filteredContacts}
          onDelete={this.deleteContact}
        />
      </MainDiv>
    );
  }
}
