// PureComponent fires shouldComponentUpdate if any props given to this components changed
import React, { PureComponent } from 'react';

import Person from './Person/Person';

class Persons extends PureComponent{

    /* We no longer need this function as we extend PureComponent, which does exactly the same in shorthand
    shouldComponentUpdate(nextProps, nextState) {
        console.log('[Persons.js] shouldComponentUpdate', nextProps, nextState);
        // With this if-else, clicking "remove cockpit" button while displaying Persons list should not 
        // print the log of Persons.js rendering and Person.js rendering. -> Perfomance Optimization
        if(
            nextProps.persons !== this.props.persons ||
            nextProps.persons !== this.props.clicked ||
            nextProps.persons !== this.props.changed
        ) {
            return true;
        }
        else {
            return false;
        }
    }*/

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
            <React.Fragment>
                {this.props.persons.map((person, personIndex) => {
                    return <Person 
                        key={person.id} 
                        name={person.name} 
                        age={person.age}
                        click={() => this.props.clicked(personIndex)}
                        change={(event) => this.props.changed(event, person.id)} 
                    />
                })}
            </React.Fragment>
        )
    }
}

export default Persons;