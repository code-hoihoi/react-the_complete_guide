import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        data: [],
        id: null
    };

    componentDidMount () {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                  const partial_data = response.data.slice(0, 4).map((datum) => {
                      return {...datum, 'author': 'Max'}; // DO NOT Forget the Spread Operator!
                  });

                  this.setState({
                    data: partial_data
                  });
                  // console.log('[componentDidMount]', response);
            });
    }

    selectedIdHandler = (selectedId) => {
        this.setState({
            id: selectedId
        });
    }

    render () {
        const posts = this.state.data.map((datum) => {
            return (
                <Post 
                    key={datum.id} 
                    title={datum.title} 
                    author={datum.author} 
                    clicked={() => this.selectedIdHandler(datum.id)} />
            );
        });

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.id}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;