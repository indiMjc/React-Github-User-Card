import React, { Component } from "react";
import axios from "axios";
import Followers from "./Followers";

class Usercard extends Component {
  state = {
    pic: {},
    name: "",
    login: "",
    profileLink: "",
    followers: []
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

  render() {
    return (
      <div className="card-contain">
        <img src={this.state.pic} alt="User" />
        <h1>Name: {this.state.name}</h1>
        <h2>Login: {this.state.login}</h2>
        <a href={this.state.profileLink}>Github</a>
        <Followers followers={this.state.followers} />
        {/* <h2>Followers:</h2>
        {this.state.followers.map(follower => (
          <div className="followers" key={follower.id}>
            <a href={follower.html_url}>{follower.login}</a>
            <br />
          </div>
        ))} */}
      </div>
    );
  }
}

export default Usercard;
