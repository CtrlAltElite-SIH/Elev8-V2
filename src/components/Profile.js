// render all the blogs here
//jshint esversion:6
//the ablove line is to remove some warnings related to jshint
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        bio: '',
        blogs: [],
        username: "",
        skills: [] ,
        requirement:'',
        github :'',
        linkedIn:'',
        weblink: [],
        team: []
    
    };
    console.log(props);
  }

  onChangeUsername(e) {
    this.setState({
        username: e.target.value
    });
}
onChangeSkills(e) {
    this.setState({
        content: e.target.value
    });
}


  componentDidMount() {
    axios
      .get("/user/profile")
      .then(response => {
        console.log(response);
        const user = response.data;
        console.log(user);
        const { weblink, blogs, team ,skills} = user;
        console.log(blogs);
        console.log(team);
        console.log(weblink);
        this.setState({
            bio: user.bio,
            blogs: blogs,
            username: user.username,
            skills: skills ,
            requirement:user.requirement,
            github :user.github,
            linkedIn:user.linkedIn,
            weblink: weblink,
            team: team
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
