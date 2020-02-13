import React, { useEffect, useRef } from 'react';
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

const StyledH1 = styled.h1`
  font-weight: bold;
`

const StyledDiv = styled.div`
  text-align: center;
`

const Cockpit = (props) => {
  // const toggleStyledBtnRef = React.createRef(); // this way not supported in React Hooks
  const toggleStyledBtnRef = useRef(null);

  // using useEffect() with handler method(setTimeout).
  // This is kind of a mock for sending http request and recieving data in response.
  useEffect(() => {
    console.log('[Cockpit.js] useEffect', [props.persons]);
    // setTimeout(() => {alert('Data saved to cloud!')}, 2000);
    toggleStyledBtnRef.current.click();
    return() => {
      console.log('[Cockpit.js] Cockpit changed');
    }
  }, [props.persons]);

  // using useEffect() with handler method(setTimeout).
  // The second parameter(empty list) means this useEffect() executes just once.
  // Important: useEffect() is executed after rendering, so atm all variable assignments should be done.
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
    <StyledDiv>
      <StyledH1>
        {props.title}
      </StyledH1>
      <p className={classes.join(' ')}>This is really working!</p>
      <StyledButton ref={toggleStyledBtnRef} altColor={props.showPerson} onClick={props.clicked}>
        Toggle Persons
      </StyledButton>
      <StyledButton onClick={props.login} isAuthenticated={props.isAuthenticated}>
        Log In
      </StyledButton>
    </StyledDiv>
  )
}

// Wrap React.memo() with the component.
// This is used for performance optimization to avoid unnecessary re-rendering.
// In short, this allows us not to update Cockpit unless props given to Cockpit is changed(different).
export default React.memo(Cockpit);