// render all the blogs here
//jshint esversion:6
//the ablove line is to remove some warnings related to jshint
import React, { Component } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
//this is the blog id i want to get from the pade url.. the blog id of your database
import "bootstrap/dist/css/bootstrap.min.css";
export default class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      author: "",
      updated: ""
    };
    console.log(props);
  }

  componentDidMount() {
    axios
      .get(
        "/user/" + this.props.match.params.id + "/blogs"
      )
      .then(response => {
        console.log(this.props.match.params);
        console.log(response);
        //this sets the state and populates it by the array
        this.setState({
          title: response.data.title,
          content: response.data.content,
          author: response.data.author,
          updated: response.data.date
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    /* jshint ignore:start */
    return (
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4">{this.state.title}</h1>
          <p className="lead">{this.state.content}</p>
          <br />
          <p>{this.state.date}</p>
          <p>{this.state.author}</p>
        </div>
      </div>
    );
    /* jshint ignore:end */
  }
}
