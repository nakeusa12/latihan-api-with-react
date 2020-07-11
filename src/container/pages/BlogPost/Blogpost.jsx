import React, { Component } from "react";
import "./Blogpost.css";
import Post from "../../../Component/Post/Post";
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
    isUpdate: false,
  };

  // Mengambil data API
  // _sort=id&_order=desc digunakan untuk memuculkan data terbaru
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
      .then(() => {
        this.getPostAPI();
        this.setState({
          formBlogPost: {
            id: 1,
            title: "",
            body: "",
            userId: 1,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Fungsi untuk menyimpan kembali data yang sudah diubah kedalam API
  putDataAPI = () => {
    axios
      .put(
        `http://localhost:3004/posts/${this.state.formBlogPost.id}`,
        this.state.formBlogPost
      )
      .then(() => {
        this.getPostAPI();
        this.setState({
          isUpdate: false,
          formBlogPost: {
            id: 1,
            title: "",
            body: "",
            userId: 1,
          },
        });
      });
  };

  // Method untuk menghapus data pada API
  handleRemove = (data) => {
    axios.delete(`http://localhost:3004/posts/${data}`).then((res) => {
      this.getPostAPI();
    });
  };

  // Method untuk mengupdate data pada API
  handleUpdate = (data) => {
    this.setState({
      formBlogPost: data,
      isUpdate: true,
    });
  };

  handleFormChange = (event) => {
    // mengambil isi dari objek fromblogpost
    let formBlogPostNew = { ...this.state.formBlogPost };

    // timestamp dijadikan Id saat isi form ditambahkan
    let timeStamp = new Date().getTime();

    // jika form dalam kondisi post maka jalankan dibawah ini, namun jika form dalam kondisi update jangan jalankan timestap id agar Id dari postnya tidak terubah
    if (!this.state.isUpdate) {
      formBlogPostNew["id"] = timeStamp;
    }

    // menargetkan kedua nilai name pada form input agar ketika di isi, data tersebut bisa diupdate ke dalam state formBlogPost
    formBlogPostNew[event.target.name] = event.target.value;
    this.setState({
      formBlogPost: formBlogPostNew,
    });
  };

  // method submit untuk mengirimnnya
  handleSubmit = () => {
    // Jika isUpdate(pada state) bernilai true makan jalankan putDataApi(), namun jika tetap false jalanlan postDataToAPI()
    if (this.state.isUpdate) {
      this.putDataAPI();
    } else {
      this.postDataToAPI();
    }
  };

  // lifecycle pada react untuk mengupdate
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
            value={this.state.formBlogPost.title}
            onChange={this.handleFormChange}
          />
          <label htmlFor="body">Blog Content</label>
          <textarea
            name="body"
            id="body"
            cols="30"
            rows="10"
            placeholder="Add blog desc"
            value={this.state.formBlogPost.body}
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
          return (
            <Post
              key={post.id}
              data={post}
              remove={this.handleRemove}
              update={this.handleUpdate}
            />
          );
        })}
      </>
    );
  }
}

export default Blogpost;
