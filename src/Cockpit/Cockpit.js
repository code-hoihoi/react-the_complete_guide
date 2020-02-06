import React, { useEffect } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${props => props.altColor ? 'red' : 'green'};
  color: white;
  font: inherit;
  border: 1px solid blue;
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.altColor ? 'salmon' : 'lightgreen'};
    color: black;
  }
`;

const Cockpit = (props) => {
  // using useEffect() with handler method(setTimeout).
  // This is kind of a mock for sending http request and recieving data in response.
  useEffect(() => {
    console.log('[Cockpit.js] useEffect', [props.persons]);
    // setTimeout(() => {alert('Data saved to cloud!')}, 2000);
    return() => {
      console.log('[Cockpit.js] Cockpit changed');
    }
  }, [props.persons]);

  // using useEffect() with handler method(setTimeout).
  // Only executed once (after first rendering) as empty list is given.
  useEffect(() => {
    console.log('[Cockpit.js] useEffect');
    // const timer = setTimeout(() => {alert('This useEffect is executed only first time!')}, 1000);
    return() => {
      // clearTimeout(timer);
      console.log('[Cockpit.js] cleanup is done');
    }
  }, []);

  const classes = [];

  if(props.personsLen <= 2){
    classes.push('red');
  }
  if(props.personsLen <= 1){
    classes.push('bold');
  }
  
  return (
      <div>
          <h1>{props.title}</h1>
          <p className={classes.join(' ')}>This is really working!</p>
          <StyledButton altColor={props.showPerson} onClick={props.clicked}>
              Toggle Persons
          </StyledButton>
      </div>
  )
}

// Wrap React.memo() with the component.
// This is used for performance optimization to avoid unnecessary re-rendering.
// In short, it will not update Cockpit unless props given to Cockpit is changed(different).
export default React.memo(Cockpit);