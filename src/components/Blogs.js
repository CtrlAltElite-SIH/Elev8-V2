// render all the blogs here
//jshint esversion:6
//the ablove line is to remove some warnings related to jshint
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Blog = props => (
  <tr>
    <td>{props.blog.title}</td>
    <td>{props.blog.content.substring(0, 100) + " ..."}</td>
    <td>{props.blog.date}</td>
    <td>
      {/* {if(props.blog._id==req.user._id){
            <Link to={"/edit/"+ props.blog._id} >Edit</Link>
        }else{
            <Link to={"/edit/"+ props.blog._id} >Edit</Link>
        }
        } */}
      <Link to={"/blog/" + props.blog._id}>View</Link>
    </td>
  </tr>
);
export default class Blogs extends Component {
  constructor(props) {
    super(props);
    this.state = { blogs: [] };
    console.log(props);
  }

  componentDidMount() {
    axios
      .get("/user/blogs")
      .then(response => {
        console.log(response);
        const user = response.data;
        console.log(user);
        const [{ blogs }] = user;
        console.log(blogs);
        this.setState({ blogs: blogs });
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  blogList() {
    return this.state.blogs.map(function(currentBlog, i) {
      console.log(currentBlog);
      return <Blog blog={currentBlog} key={i} />;
    });
  }
  render() {
    /* jshint ignore:start */
    return (
      <div>
        <h3>Blogs</h3>
        <table className="table table-striped" style={{ margin: 20 }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Content</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.blogList()}</tbody>
        </table>
      </div>
    );
    /* jshint ignore:end */
  }
}
