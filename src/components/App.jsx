import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Section from './Section/Section';
import { nanoid } from 'nanoid';
import Filter from './Filter/Filter';
import { Container } from './Shared.styled';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const { name, number } = event.target.elements;
    const isExist = this.state.contacts.some(
      contact => contact.name === name.value
    );

    if (isExist) {
      alert(`${name.value} is already in contacts.`);
    } else {
      this.setState(
        prevState => {
          return {
            ...prevState,
            contacts: [
              ...prevState.contacts,
              { name: name.value, id: nanoid(), number: number.value },
            ],
          };
        },
        () => {
          event.target.reset();
        }
      );
    }
  };

  handleFilter = event => {
    this.setState({ filter: event.target.value });
  };

  handleDelete = id => {
    this.setState(prevState => ({
      ...prevState,
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
    return (
      <Container>
        <Section title="Phonebook">
          <ContactForm onSubmit={this.handleFormSubmit} />
        </Section>
        <Section title="Contacts">
          <Filter onFilter={this.handleFilter} />
          <ContactList
            contacts={filteredContacts}
            onDelete={this.handleDelete}
          />
        </Section>
      </Container>
    );
  }
}
