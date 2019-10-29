import React, { Component } from "react";
import axios from "axios";

class Usercard extends Component {
  state = {
    name: "",
    login: "",
    profileLink: ""
  };
  componentDidMount() {
    axios
      .get("https://api.github.com/users/indiMjc")
      .then(res => {
        console.log(res);
        console.log(res.data.avatar_url);
        console.log(res.data.name);
        console.log(res.data.login);
        console.log(res.data.html_url);
        this.setState({
          name: res.data.name,
          login: res.data.login,
          profileLink: res.data.html_url
        });
      })
      .catch(err => {
        console.log("The data was not returned", err);
      });
  }

  render() {
    return (
      <div>
        <h1>test div</h1>
      </div>
    );
  }
}

export default Usercard;
