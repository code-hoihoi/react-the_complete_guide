import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null,
        hasError: false
    }

    componentDidUpdate () {
        if (!this.state.hasError && this.props.id) {
            if (!this.state.loadedPost || (this.props.id !== this.state.loadedPost.id)) {
                axios.get('https://jsonplaceholder.typicode.com/posts/' + this.props.id)
                    .then(response => {
                        this.setState({
                            loadedPost: response.data
                        });
                    })
                    .catch(error => {
                        this.setState({
                            hasError: true
                        });
                    })
            }
        }
    }

    deleteDataHandler () {
        axios.delete('https://jsonplaceholder.typicode.com/posts/' + this.props.id)
            .then(response => {
                console.log(response);
                this.setState({
                    loadedPost: null
                });
                this.props.deleted();
            })
            .catch(error => {
                this.setState({
                    hasError: true
                });
            });
    }

    render () {
        let post = <p className="PostDefaultMessage">Please select a Post!</p>;
        if (this.props.id) {
            post =  <p className="PostDefaultMessage">Now Loading ...</p>;
        }
        if (this.state.hasError) {
            return <p className="ErrorMessage">Something Went Wrong with the Request!!</p>;
        }

        if (this.props.id && this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deleteDataHandler.bind(this)}>Delete</button>
                    </div>
                </div>
            );
        }
        return post;
    }
}

export default FullPost;