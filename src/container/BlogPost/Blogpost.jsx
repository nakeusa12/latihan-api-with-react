import React, { Component } from "react";
import "./Blogpost.css";
import Post from "../../Component/Post/Post";
import axios from "axios";

class Blogpost extends Component {
  state = {
    post: [],
    formBlogPost: {
      id: 1,
      title: "",
      body: "",
      userId: 1,
    },
  };

  getPostAPI = () => {
    axios
      .get("http://localhost:3004/posts?_sort=id&_order=desc")
      .then((res) => {
        this.setState({
          post: res.data,
        });
      });
  };

  // mengoper isi form kedalam db.json
  postDataToAPI = () => {
    axios
      .post("http://localhost:3004/posts", this.state.formBlogPost)
      .then((res) => {
        console.log(res);
        this.getPostAPI();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleRemove = (data) => {
    axios.delete(`http://localhost:3004/posts/${data}`).then((res) => {
      this.getPostAPI();
    });
  };

  handleFormChange = (event) => {
    let formBlogPostNew = { ...this.state.formBlogPost };
    let timeStamp = new Date().getTime();
    formBlogPostNew["id"] = timeStamp;

    formBlogPostNew[event.target.name] = event.target.value;
    this.setState({
      formBlogPost: formBlogPostNew,
    });
  };

  // method submit untuk mengirimnnya
  handleSubmit = () => {
    this.postDataToAPI();
  };

  componentDidMount() {
    this.getPostAPI();
  }

  render() {
    return (
      <>
        <p className="section-title">Blog</p>
        <div className="form-add-post">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            placeholder="add title"
            onChange={this.handleFormChange}
          />
          <label htmlFor="body">Blog Content</label>
          <textarea
            name="body"
            id="body"
            cols="30"
            rows="10"
            placeholder="Add blog desc"
            onChange={this.handleFormChange}
          />

          <button
            className="btn-submit"
            onClick={() => {
              this.handleSubmit();
            }}
          >
            Simpan
          </button>
        </div>
        {this.state.post.map((post) => {
          return <Post key={post.id} data={post} remove={this.handleRemove} />;
        })}
      </>
    );
  }
}

export default Blogpost;
