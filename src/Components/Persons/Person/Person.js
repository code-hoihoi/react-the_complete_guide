import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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

class Person extends Component {
  constructor(props) {
    super(props);
    this.inputElementRef = React.createRef();
  }
    
  componentDidMount() {
    this.inputElementRef.current.focus();
  }

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
    console.log('[Person.js] rendering...');
    return(
      <StyledDiv>
        <p onClick={this.props.click}>I'm {this.props.name}! I am { Math.floor(this.props.age) } years old.</p>
        <p key="i2">{this.props.children}</p>
        <input 
          type="text" 
          key="i3"
          ref={this.inputElementRef}
          onChange={this.props.change} 
          value={this.props.name}/>
      </StyledDiv>
    )
  }
}

// Demo for how PropTypes work. Run the app and check the console log.
// The entire code should give warning that age should be a number instead of string
Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  change: PropTypes.func,
  children: PropTypes.node
}

export default Person;