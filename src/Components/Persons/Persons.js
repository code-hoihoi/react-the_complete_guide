import React, {Component} from 'react';

import Person from './Person/Person';

class Persons extends Component{
    shouldComponentUpdate(nextProps, nextState) {
        console.log('[Persons.js] shouldComponentUpdate', nextProps, nextState);
        // With this change, clicking "remove cockpit" button while displaying Persons list should not 
        // print the log of Persons.js rendering and Person.js rendering. -> Perfomance Optimization
        if(nextProps.persons !== this.props.persons) {
            return true;
        }
        else {
            return false;
        }
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