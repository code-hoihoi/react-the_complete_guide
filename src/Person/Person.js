import React from 'react';
import Radium from 'radium';
import './Person.css';

const person = ( props ) => {
    const personStyle = {
        '@media (min-width: 500px)': {
            width: '450px'
        }
    };
    return(
        <div className="Person" style={personStyle}>
            <p onClick={props.click}>I'm {props.name}! I am { Math.floor(props.age) } years old.</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed} />
        </div>
    )
}

export default Radium(person);