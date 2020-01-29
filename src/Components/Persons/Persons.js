import React, {Component} from 'react';

import Person from './Person/Person';

class Persons extends Component{
    shouldComponentUpdate(nextProps, nextState) {
        console.log('[Persons.js] shouldComponentUpdate', nextProps, nextState);
        return true;  // need either true or false as this method deceides to update the DOM.
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('[Persons.js] getSnapshotBeforeUpdate', prevProps, prevState);
        return {message: 'snapshot msg from [Persons.js]!'};
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[Persons.js] componentDidUpdate', prevProps, prevState, snapshot);
        //return null;
    }

    render() {
        console.log('[Persons.js] rendering...');
        return (
            <div>
                {this.props.persons.map((person, personIndex) => {
                    return <Person 
                        key={person.id} 
                        name={person.name} 
                        age={person.age}
                        click={() => this.props.clicked(personIndex)}
                        change={(event) => this.props.changed(event, person.id)} 
                    />
                })}
            </div>
        )
    }
}

export default Persons;