import React from 'react';
import styled from 'styled-components';

// import './Person.css';

const StyledDiv = styled.div`
    width: 60%;
    margin: auto;
    border: 1px solid #ccc;
    box-shadow: 0 3px 20px rgb(3, 111, 231);
    padding: 16px;
    text-align: center;
    
    @media (min-width: 500px){
        width: 450px;
    }
`;

const person = ( props ) => {
    return(
        <StyledDiv>
            <p onClick={props.click}>I'm {props.name}! I am { Math.floor(props.age) } years old.</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.change} />
        </StyledDiv>
    )
}

export default person;