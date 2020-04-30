import React, { Component } from 'react';

import './FullPost.css';
import Axios from 'axios';

class FullPost extends Component {
    state = {
        loadedPost: null
    }

    componentDidUpdate () {
        if ((this.props.id && !this.state.loadedPost) || (this.props.id && (this.props.id !== this.state.loadedPost.id))) {
            Axios.get('https://jsonplaceholder.typicode.com/posts/' + this.props.id)
            .then(response => {
                this.setState({
                    loadedPost: response.data
                });
            })
        }
    }


    render () {
        let post = <p>Please select a Post!</p>;
        if (this.props.id) {
            post =  <p>Now Loading ...</p>;
        }

        if (this.props.id && this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete">Delete</button>
                    </div>
                </div>
            );
        }
        return post;
    }
}

export default FullPost;