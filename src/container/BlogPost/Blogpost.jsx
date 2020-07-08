import React, { Component } from "react";
import "./Blogpost.css";
import Post from "../../Component/Post/Post";
import axios from "axios";

class Blogpost extends Component {
  state = {
    post: [],
  };

  componentDidMount() {
    // ? fetch = standar es6
    // fetch("https://jsonplaceholder.typicode.com/posts")
    //   .then((response) => response.json())
    //   .then((json) => {
    //     this.setState({
    //       post: json,
    //     });
    //   });
    axios.get("http://localhost:3004/posts").then((res) => {
      this.setState({
        post: res.data,
      });
    });
  }

  render() {
    return (
      <>
        <p className="section-title">Blog</p>
        {this.state.post.map((post) => {
          return <Post key={post.id} title={post.title} desc={post.body} />;
        })}
      </>
    );
  }
}

export default Blogpost;
