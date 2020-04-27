import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {data: []};

    componentDidMount () {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                  const partial_data = response.data.slice(0, 4).map((datum) => {
                      return {...datum, 'author': 'Max'}; // DO NOT Forget the Spread Operator!
                  });

                  this.setState({data: partial_data});
                  // console.log('[componentDidMount]', response);
            });
    }

    render () {
        const posts = this.state.data.map((datum) => {
            return <Post key={datum.id} title={datum.title} author={datum.author}/>
        });
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;