import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      {name: "Max", age: "28"},
      {name: "Manu", age: "30"},
      {name: "Stephanie", age: "26"}
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
    )
  }

  nameChangeHandler = (event) => {
    this.setState(
      {
        persons : [
          {name: event.target.value, age: "28"},
          {name: "Manu", age: "30"},
          {name: "Stephanie", age: "27"}
        ]
      }
    )
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
      backgroundColor: 'White',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px'
    };

    let persons = null
    if (this.state.showPerson) {
      persons = (
        <div>
          {this.state.persons.map(person => {
            return <Person name={person.name} age={person.age} />
          })}
          {/* <Person 
            name={this.state.persons[0].name} 
            age={this.state.persons[0].age} />
          <Person 
            name={this.state.persons[1].name} 
            age={this.state.persons[1].age} 
            click={() => this.switchNameHandler("Hoihoi")}>My Hobbies: Racing</Person>
          <Person 
            name={this.state.persons[2].name} 
            age={this.state.persons[2].age}
          clicked={this.nameChangeHandler} /> */}
        </div>
      )
    }

    return (
      <div className="App">
        <h1>Hi! I am a React App.</h1>
        <p>This is really working!</p>
        <button style={myStyle} onClick={this.toggleNameHandler}>Switch Name</button>
        {persons}
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, "Does this work?"));
  }
}

export default App;
