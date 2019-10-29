import React, { Component } from "react";
import axios from "axios";
import Followers from "./Followers";
import "./usercard.css";

class Usercard extends Component {
  state = {
    pic: {},
    name: "",
    login: "",
    profileLink: "",
    followers: [],
    searchUser: ""
  };
  async componentDidMount() {
    const [userRes, followerRes] = await Promise.all([
      axios.get("https://api.github.com/users/indiMjc"),
      axios.get("https://api.github.com/users/indiMjc/followers")
    ]);
    this.setState({
      pic: userRes.data.avatar_url,
      name: userRes.data.name,
      login: userRes.data.login,
      profileLink: userRes.data.html_url,
      followers: followerRes.data
    });
  }

  handleChanges = e => {
    this.setState({
      searchUser: e.target.value
    });
  };

  getNewUser = () => {};

  render() {
    return (
      <div className="main">
        <div className="card-contain">
          <img src={this.state.pic} alt="User" />
          <h1>Name: {this.state.name}</h1>
          <h2>Login: {this.state.login}</h2>
          <a href={this.state.profileLink}>Github</a>
          <hr />
          <Followers followers={this.state.followers} />
        </div>
        <div className="search">
          <input
            onChange={this.handleChanges}
            type="text"
            placeholder="Enter username"
          />
          <button>Search github</button>
        </div>
      </div>
    );
  }
}

export default Usercard;
