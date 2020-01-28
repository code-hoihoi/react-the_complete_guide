import React, { Component } from 'react';

import './App.css';
import Persons from '../Components/Persons/Persons';
import Cockpit from '../Cockpit/Cockpit';

class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
  }

   state = {
    persons: [
      {id: "00001", name: "Max", age: "28"},
      {id: "00002", name: "Manu", age: "30"},
      {id: "00003", name: "Stephanie", age: "26"}
    ],
    otherstate: "some other state value",
    showPerson: false
  }

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedState', props, 'WARNED AS A LEGACY LIFECYCLE METHOD!');
  }

  componentWillMount(props) {
    console.log('[App.js] componentWillMount', 'WARNED AS A LEGACY LIFECYCLE METHOD!');
  }

  componentDidMount(props) {
    console.log('[App.js] componentDidMount');
  }

  switchNameHandler = (newName) => {
    this.setState(
      {
        persons : [
          {name: newName, age: "28"},
          {name: "Manu", age: "30"},
          {name: "Stephanie", age: "27"}
        ]
      }
    );
  }

  deleteNameHandler = (personIndex) => {
    // const persons = this.state.persons; // <- BAD PRACTICE!! DON"T DO THIS!!
    // We should make a copy of state instead. :D
    // const persons = this.state.persons.slice();  // <- One possible way to make a copy but obsolete
    const persons = [...this.state.persons];  // <- Modern way to make a copy
    persons.splice(personIndex, 1)
    this.setState({
      persons: persons
    });
  }

  nameChangeHandler = (event, id) => {
    // Find an index of person in which the event occurs
    const personIndex = this.state.persons.findIndex((p) => {
      return p.id === id;
    });
    // Make a copy of person and change the name according to the input
    const person = {
      ...this.state.persons[personIndex]
    }
    person.name = event.target.value;

    // Make a copy of persons array and swap an element with person(the copy created above)
    const newPersons = [...this.state.persons];
    newPersons[personIndex] = person;

    this.setState({ persons : newPersons })
  }

  toggleNameHandler = () => {
    const doesShow = this.state.showPerson;
    this.setState(
      {
        showPerson: !doesShow
      }
    )
  }

  render() {
    console.log('[App.js] rendering...');
    let persons = null;
    if (this.state.showPerson) {
      persons = (
        <Persons 
          persons={this.state.persons}
          clicked={this.deleteNameHandler}
          changed={this.nameChangeHandler}
        />
      )
    }

    return (
      <div className="App">
        <Cockpit 
          title={this.props.appTitle}
          persons={persons} 
          personsLen={this.state.persons.length} 
          showPerson={this.state.showPerson} 
          clicked={this.toggleNameHandler} />
      </div>
    );
  }
}

export default App;
