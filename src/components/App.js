import React, { Component } from 'react';
import axios from "axios";
import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from '../components/Post/Post'

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios
    .get("https://practiceapi.devmountain.com/api/posts")
    .then(response => {
      // console.log(response);
      this.setState({
        posts: response.data
      })
    });
  }

  updatePost(id, text) {
    axios
    .put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, {text})
    .then(response => {
      console.log('response: ', response);
      this.setState({
        posts: response.data
      })
    })
  }

  deletePost(id) {
    axios
    .delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
    .then(response => {
      this.setState({
        posts: response.data
      })
    })
  }

  createPost(text) {
    axios
    .post("https://practiceapi.devmountain.com/api/posts", {text})
    .then(response => {
      // console.log(response);
      this.setState({
        posts: response.data
      })
    });
  }

  render() {
    const { posts } = this.state;
    const displayPosts = posts.map(post => {
      return (
        <Post 
        key = {post.id}
        id = {post.id}
        text = {post.text}
        date = {post.date}
        updatePostFn = {this.updatePost}
        deletePostFn = {this.deletePost}
        />
        
      )
    })
    // console.log(displayPosts)
    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose
          createPostFn = {this.createPost}
          />
          {displayPosts}
          
          
        </section>
      </div>
    );
  }
}

export default App;
