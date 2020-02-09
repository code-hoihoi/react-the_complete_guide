import React, {Component} from 'react';
import styled from 'styled-components';

// import './Person.css';

class Person extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        console.log('[Person.js] shouldComponentUpdate', nextProps, nextState);
        return true;  // need to return either true or false as this method deceides to update the DOM.
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('[Person.js] getSnapshotBeforeUpdate', prevProps, prevState);
        return {message: 'snapshot msg from [Person.js]!'};
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[Person.js] componentDidUpdate', prevProps, prevState, snapshot);
        //return null;
    }

    render() {
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

        console.log('[Person.js] rendering...');
        return(
            <StyledDiv>
                <p onClick={this.props.click}>I'm {this.props.name}! I am { Math.floor(this.props.age) } years old.</p>
                <p>{this.props.children}</p>
                <input type="text" onChange={this.props.change} value={this.props.name}/>
            </StyledDiv>
        )
    }
}

export default Person;