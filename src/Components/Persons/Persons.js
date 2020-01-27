import React from 'react';

import Person from './Person/Person';

const persons = (props) => {
    return (
        <div>
            {props.persons.map((person, personIndex) => {
                return <Person 
                    key={person.id} 
                    name={person.name} 
                    age={person.age}
                    click={() => props.clicked(personIndex)}
                    change={(event) => props.changed(event, person.id)} 
                />
            })}
        </div>
    )
}

export default persons;