import React, { Component } from 'react';
import styled from 'styled-components';

import Persons from '../Components/Persons/Persons';
import Cockpit from '../Cockpit/Cockpit';

const StyledParagraph = styled.p`
  text-align:center;
`

class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
  }

  state = {
    persons: [
      {id: "00001", name: "Max", age: 28},
      {id: "00002", name: "Manu", age: 30},
      {id: "00003", name: "Stephanie", age: 26}
    ],
    showPerson: false,
    showCockpit: true,
    nameChangeCounter: 0,
    loggedIn: false
  }

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  componentDidMount(props) {
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate');
    return true; // need to return either true or false as this method deceides to update the DOM.
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('[App.js] componentDidUpdate');
  }

  componentWillUnmount() {
    console.log('[App.js] componentWillUnmount');
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

    // This way does not guarantee the React updates the state immediately.
    // Therefore, this.state.nameChangeCounter may no refer to previous state's value.
    // (It can be the second or third previous value of nameChangeCounter -> causes unexpected result)
    /*
    this.setState({ 
        persons : newPersons,
        nameChangeCounter: this.state.nameChangeCounter + 1
      }
    )
    */
    // The better way to update the state that guarantees nameChangeCounter is actually the previous state's one
    this.setState((previousState, props) => { 
      return {
        persons: newPersons,
        nameChangeCounter: previousState.nameChangeCounter + 1
      }
    })
  }

  toggleNameHandler = () => {
    const doesShow = this.state.showPerson;
    this.setState({ showPerson: !doesShow })
  }

  removeCockpit = () => {
    this.setState({ showCockpit: false })
  }

  loginHandler = () => {
    this.setState({ loggedIn: true });
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
          isAuthenticated={this.state.loggedIn} 
        />
      )
    }

    return (
      <React.Fragment>
        <StyledParagraph> 
          <button onClick={this.removeCockpit}>remove cockpit</button>
        </StyledParagraph>
        {this.state.showCockpit ? 
          <Cockpit 
            title={this.props.appTitle} 
            persons={this.state.persons} 
            personsLen={this.state.persons.length} 
            showPerson={this.state.showPerson} 
            clicked={this.toggleNameHandler} 
            login={this.loginHandler}
            isAuthenticated={this.state.loggedIn} 
          /> : null
        }
        {persons}
      </React.Fragment>
    );
  }
}

export default App;
