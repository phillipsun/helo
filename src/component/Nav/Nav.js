import React, { Component } from "react";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import { updateUser, logout } from "./../../ducks/reducer";
import "./Nav.css";

class Nav extends Component {
  constructor(props) {
    super(props);
  }

  logoutHandler() {
    axios.post("/api/logout").then(res => this.props.logout());
  }

  render() {
    if (this.props.location.pathname !== "/") {
      console.log("nav", this.props);
      return (
        <div className="nav">
          <div className="nav__profile-container">
            <div
              className="nav__profile-pic"
              style={{ backgroundImage: `url('${this.props.profilePic}')` }}
            />
            <p>{this.props.username}</p>
          </div>
          <div className="nav__links">
            <Link to="/dashboard">
              Home
            </Link>
            <Link to="/new">
              New Post
            </Link>
          </div>
          <Link to="/" onClick={this.logoutHandler}>
            Log Out
          </Link>
        </div>
      );
    } else {
      return null;
    }
  }
}

function mapStateToProps(state) {
  return state;
}

export default withRouter(connect(mapStateToProps, { updateUser, logout })(Nav));
