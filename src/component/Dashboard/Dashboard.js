import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

//import searchLogo from './../../assets/search_logo.png';
import "./Dashboard.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      myPosts: true,
      posts: [],
      loading: true
    };
    this.grabPosts = this.grabPosts.bind(this);
    this.reset = this.reset.bind(this);
  }
  componentDidMount() {
    this.grabPosts();
  }
  grabPosts() {
    let { search, myPosts } = this.state;
    let url = '/api/posts/';
    if (myPosts && !search) {
      url += "?mine=true";
    } else if (!myPosts && search) {
      url += `?search=${search}`;
    } else if (myPosts && search) {
      url += `?mine=true&search=${search}`;
    }
    axios.get(url).then(res => {
      setTimeout(() => this.setState({ posts: res.data, loading: false }), 500);
    });
  }
  reset() {
    let { myPosts } = this.state;
    let url = '/api/posts';
    if (myPosts) {
      url += "?mine=true";
    }
    axios.get(url).then(res => {
      this.setState({ posts: res.data, loading: false, search: "" });
    });
  }
  render() {
    let posts = this.state.posts.map(el => {
      //console.log(el);
      return (
        <Link to={`/post/${el.id}`} key={el.id}>
          <div className="content_box dashboard__post_box">
            <h3>{el.title}</h3>
            <div className="author_box">
              <p>by {el.author_username}</p>
              <img src={el.profile_pic} alt="author" />
            </div>
          </div>
        </Link>
      );
    });
    return (
      <div className="dashboard">
        <div className="content_box dashboard__filter">
          <div className="dashboard__search_box">
            <input
              value={this.state.search}
              onChange={e => this.setState({ search: e.target.value })}
              className="dashboard__search_bar"
              placeholder="Search by Title"
            />
            <button
              onClick={this.grabPosts}
              className="dashboard__search_button"
              alt="search"
            >
              search
            </button>
            <button
              onClick={this.reset}
              className="dark_button"
              id="dashboard__reset"
            >
              Reset
            </button>
          </div>
          <div className="dashboard__check_box">
            <p>My Posts</p>
            <input
              checked={this.state.myPosts}
              onChange={() => {
                this.setState({ myPosts: !this.state.myPosts });
                this.grabPosts();
              }}
              type="checkbox"
            />
          </div>
        </div>
        <div className="content_box dashboard__posts_container">
          {!this.state.loading ? (
            posts
          ) : (
              <div className="load_box">loading...</div>
            )}
        </div>
      </div>
    );
  }
}

export default Dashboard;
