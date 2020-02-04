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
    setTimeout(() => {alert('Data saved to cloud!')}, 2000);
    return() => {
      console.log('[Cockpit.js] this component is changed');
    }
  }, [props.persons]);

  // using useEffect() with handler method(setTimeout).
  // Only executed once (after first rendering) as empty list is given.
  useEffect(() => {
    console.log('[Cockpit.js] useEffect');
    setTimeout(() => {alert('This useEffect is executed only first time!')}, 1000);
    return() => {
      console.log('[Cockpit.js] cleanup is done');
    }
  }, []);

  const classes = [];
  let len = props.personsLen;

  if(len <= 2){
    classes.push('red');
  }
  if(len <= 1){
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

export default Cockpit;