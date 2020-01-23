import React, { Component } from 'react';

import Person from './Person/Person';
import ErrorBoundary from './ErrroBoundary/ErrorBoundary';
import classes from './App.css';

class App extends Component {
  state = {
    persons: [
      {id: "00001", name: "Max", age: "28"},
      {id: "00002", name: "Manu", age: "30"},
      {id: "00003", name: "Stephanie", age: "26"}
    ],
    otherstate: "some other state value",
    showPerson: false
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
    let persons = null
    let btnClass = ''

    if (this.state.showPerson) {
      persons = (     
        <div>
          {this.state.persons.map((person, personIndex) => {
            return <ErrorBoundary key={person.id}>
              <Person 
                name={person.name} 
                age={person.age}
                click={() => this.deleteNameHandler(personIndex)}
                changed={(event) => this.nameChangeHandler(event, person.id)} />
            </ErrorBoundary>
          })}
        </div>
      )
      btnClass = classes.Red
    }

    const assignedClasses = [];
    if(this.state.persons.length <= 2){
      assignedClasses.push(classes.red);
    }
    if(this.state.persons.length <= 1){
      assignedClasses.push(classes.bold);
    }

    return (
      <div className={classes.App}>
        <h1>Hi! I am a React App.</h1>
        <p className={assignedClasses.join(' ')}>This is really working!</p>
        <button className={btnClass} onClick={this.toggleNameHandler}>Toggle Persons</button>
        {persons}
      </div>
    );
  }
}

export default App;
