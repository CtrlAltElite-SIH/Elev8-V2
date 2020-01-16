// render all the blogs here
//jshint esversion:6
//the ablove line is to remove some warnings related to jshint
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { about: {}, blogs: [], username: "", skills: [] , };
    console.log(props);
  }

  componentDidMount() {
    axios
      .get("/user/profile")
      .then(response => {
        console.log(response);
        const user = response.data;
        console.log(user);
        const { about, blogs, team } = user;
        const {weblink ,skills} = about;
        console.log(blogs);
        console.log(about);
        console.log(weblink);
        this.setState({
          blogs: blogs,
          about: about,
          skills: skills,
          username: user.username
        });
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  render() {
    /* jshint ignore:start */
    return (
      <div>
        <h3>Profile</h3>
      </div>
    );
    /* jshint ignore:end */
  }
}
