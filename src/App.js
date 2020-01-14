import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

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
    //console.log("was clicked")
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
    const myStyle = {
      backgroundColor: 'Green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };

    let persons = null
    if (this.state.showPerson) {
      persons = (
        <div>
          {this.state.persons.map((person, personIndex) => {
            return <Person 
              key={person.id} 
              name={person.name} 
              age={person.age}
              click={() => this.deleteNameHandler(personIndex)}
              changed={(event) => this.nameChangeHandler(event, person.id)} />
          })}
        </div>
      )
      myStyle.backgroundColor = 'red';
      myStyle[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      }
    }

    const classes = [];
    if(this.state.persons.length <= 2){
      classes.push('red');
    }
    if(this.state.persons.length <= 1){
      classes.push('bold');
    }

    return (
      <div className="App">
        <h1>Hi! I am a React App.</h1>
        <p className={classes.join(' ')}>This is really working!</p>
        <button style={myStyle} onClick={this.toggleNameHandler}>Toggle Persons</button>
        {persons}
      </div>
    );
  }
}

export default App;
