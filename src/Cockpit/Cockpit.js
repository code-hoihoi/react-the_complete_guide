import React from 'react';
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

const cockpit = (props) => {
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
            <h1>Hi! I am a React App.</h1>
            <p className={classes.join(' ')}>This is really working!</p>
            <StyledButton altColor={props.showPerson} onClick={props.clicked}>
                Toggle Persons
            </StyledButton>
            {props.persons}
        </div>
    )
}

export default cockpit;