import React from "react";
import Sidebar from "react-sidebar";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";

const Blog = props => {
  return (
    <div className="col">
      <Card
        border="primary"
        bg="primary"
        text="white"
        style={{ width: "18rem" }}
      >
        <Card.Header>{props.blog.title}</Card.Header>
        <Card.Body>
          <Card.Text>{props.blog.content}</Card.Text>
        </Card.Body>
        <Card.Body>
        Data : {props.blog.date.substring(0,10)}
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
      .get("http://localhost:4000/elev8/blogs")
      .then(response => {
        const user = response.data;
        const [{ name, blogs }] = user;
        this.setState({
          name: name,
          blogs: blogs
        });
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
      if (i > length - 4) {
        return <Blog blog={currentBlog} key={i} />;
      }
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
            <div className="row">
              <div className="col-10">
                <div
                  style={{
                    margin: 5,
                    fontSize: 30
                  }}
                >
                  {this.state.name}
                </div>
              </div>
            </div>
            <hr></hr>
            <div className="row">{this.blogList()}</div>
          </ListGroup.Item>
        </ListGroup>
      </div>
    );
  }
}

export default Feed;
