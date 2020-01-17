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
    <td>{props.blog.author}</td>
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
        const blogsarr = [];
        var i = 0;
        for (i = 0; i < user.length; i++) {
          console.log(user[i]);
          const { blogs } = user[i];
          var j=0;
          for(j=0;j<blogs.length;j++){
              const blog = blogs[j]
              console.log(blog);
                blogsarr.push(blog);
          }
          
        }
        console.log(blogsarr);
        this.setState({ blogs: blogsarr });
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  blogList() {
    return this.state.blogs.map(function(currentBlog, i) {
      console.log(currentBlog.author);
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
              <th>Author</th>
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
