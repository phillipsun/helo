import React, { Component } from "react";
import axios from "axios";

import noImage from "./../../assets/missing.png";
import "./Form.css";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      img: "",
      content: ""
    };
    this.submit = this.submit.bind(this);
  }

  submit() {
    axios.post('/api/post/', this.state)
      .then(res => this.props.history.push("/dashboard"));
  }

  render() {
    let imgSrc = this.state.img ? this.state.img : noImage;
    return (
      <div className="Form content_box">
        <h2 className="title">New Post</h2>
        <div className="form_input_box">
          <p>Title:</p>
          <input
            value={this.state.title}
            onChange={e => this.setState({ title: e.target.value })}
          />
        </div>
        <div
          className="form_img_prev"
          style={{ backgroundImage: `url('${imgSrc}')` }}
          alt="preview"
        />
        <div className="form_input_box">
          <p>Image URL:</p>
          <input
            value={this.state.img}
            onChange={e => this.setState({ img: e.target.value })}
          />
        </div>
        <div className="form_text_box">
          <p>Content:</p>
          <textarea
            value={this.state.content}
            onChange={e => this.setState({ content: e.target.value })}
          />
        </div>
        <button onClick={this.submit} className="dark_button form_button">
          Post
        </button>
      </div>
    );
  }
}

export default Form;
