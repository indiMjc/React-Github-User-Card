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

  //   getNewUser = () => {
  //     const [searchRes, searchFollowerRes] = [
  //       axios.get(`https://api.github.com/users/${this.state.searchUser}`),
  //       axios.get(
  //         `https://api.github.com/users/${this.state.searchUser}/followers`
  //       )
  //     ];
  //     console.log(searchRes);
  //     console.log(searchFollowerRes);
  //     // this.setState({
  //     //   pic: searchRes.data.avatar_url,
  //     //   name: searchRes.data.name,
  //     //   login: searchRes.data.login,
  //     //   profileLink: searchRes.data.html_url,
  //     //   followers: searchFollowerRes.data
  //     // });
  //   };

  getNewUser = () => {
    axios
      .get(`https://api.github.com/users/${this.state.searchUser}`)
      .then(res => {
        this.setState({
          pic: res.data.avatar_url,
          name: res.data.name,
          login: res.data.login,
          profileLink: res.data.html_url
          //   followers: followerRes.data
        });
        axios
          .get(
            `https://api.github.com/users/${this.state.searchUser}/followers`
          )
          .then(res => {
            console.log(res);
            this.setState({
              followers: res.data
            });
          });
      });
  };

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
          <button onClick={this.getNewUser}>Search github</button>
        </div>
      </div>
    );
  }
}

export default Usercard;
