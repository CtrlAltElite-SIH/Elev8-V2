import React, { Component } from "react";

class Home extends Component {
  constructor() {
    super();
  }

  render() {
    const imageStyle = {
      width: 400
    };
    return (
      <div>
        <div className="row">
          <div className="col-lg-6">
            <h1>
              “Don’t worry about failure; you only have to be right once.”
            </h1>
            <h2>– Drew Houston</h2>
            <h5>
              A common platform for start-ups/founders, mentors/experts and
              students to collaborate and grow.
            </h5>
            <button type="button" className="btn btn-primary btn-lg b2">
              Get started
            </button>
          </div>
        </div>
        <div className="jumbotron jumbotron-fluid jf">
          <div className="container">
            <h1 className="display-4 in">
              Don't let any idea fade away, "<span className="jh">Elev8</span>"
              your idea!
            </h1>
            <p className="lead th1">
              We help startups collaborate with some of the best mentoring
              experts to steer towards the right direction addressing the key
              business challenges and creating value for founders and their
              startups.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
