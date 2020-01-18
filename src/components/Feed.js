import React from "react";
import Sidebar from "react-sidebar";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Blog = props => {
  return (
    <div className="col" style={{paddingBottom:20}}>
      <Card
        border="primary"
        bg="primary"
        text="white"
        style={{ width: "18rem" }}
      >
        <Card.Header>{props.blog.title}</Card.Header>
        <Card.Body>
          <Card.Text>{props.blog.content.substring(0, 30) + " ..."}</Card.Text>
        </Card.Body>
        <Card.Body>
        Date : {props.blog.date.substring(0,10)}
        </Card.Body>
      </Card>
    </div>
  );
};

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.state = {
      name: "",
      blogs: []
    };
  }

  componentDidMount() {
    axios
      .get("user/blogs")
      .then(response => {
        const user = response.data;
        // const [{ name, blogs }] = user;
        var blogsarr =[];
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

  nameList() {
    return this.state.name;
  }
  blogList() {
    const length = this.state.blogs.length;
    return this.state.blogs.map(function(currentBlog, i) {
        return <Blog blog={currentBlog} key={i} />;
    });
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  render() {
    return (
      <div>
        <Sidebar
          sidebar={
            <a href="#" className="btn " style={{}}>
              Profile
            </a>
          }
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          styles={{ sidebar: { background: "white" } }}
        >
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => this.onSetSidebarOpen(true)}
          >
            Toggle
          </button>
        </Sidebar>
        <ListGroup>
          <ListGroup.Item>
            <div className="row" style={{
                    margin: 5,
                    fontSize: 30,
                    paddingBottom:20
                  }}>
              <div className="col-10">
                <div
                  style={{
                    margin: 5,
                    fontSize: 30,
                  }}
                >
                  {this.state.name}
                </div>
              </div>
            </div>
            <hr></hr>
            <div className="row">{this.blogList()}
            <br />
            </div>
          </ListGroup.Item>
        </ListGroup>
      </div>
    );
  }
}

export default Feed;
