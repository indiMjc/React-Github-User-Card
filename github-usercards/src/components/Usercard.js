import React, { Component } from "react";
import axios from "axios";

class Usercard extends Component {
  componentDidMount() {
    axios
      .get("https://api.github.com/users/indiMjc")
      .then(res => {
        console.log(res);
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
