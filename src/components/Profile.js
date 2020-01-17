// render all the blogs here
//jshint esversion:6
//the ablove line is to remove some warnings related to jshint
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeGithub = this.onChangeGithub.bind(this);
    this.onChangeLinkedin = this.onChangeLinkedin.bind(this);
    this.onChangeUserType = this.onChangeUserType.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeBio = this.onChangeBio.bind(this);
    this.state = {
      bio: "",
      blogs: [],
      username: "",
      userType :"",
      skills: [
        {
          name: ""
        }
      ],
      requirement: "",
      github: "",
      linkedIn: "",
      weblink: [],
      team: [{
          name: ""
      }]
    };
    console.log(this.state);
  }
  onChangeBio(e) {
    this.setState({
      bio: e.target.value
    });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }
  onChangeUserType(e) {
    this.setState({
      userType: e.target.value
    });
  }
  onChangeGithub(e) {
    this.setState({
      github: e.target.value
    });
  }
  onChangeLinkedin(e) {
    this.setState({
      linkedIn: e.target.value
    });
  }
  handleSkillNameChange = idx => evt => {
    const newSkills = this.state.skills.map((skills, sidx) => {
      if (idx !== sidx) return skills;
      return { ...skills, name: evt.target.value };
    });

    this.setState({ skills: newSkills });
  };

  handleSubmit = evt => {
    const { name, skills } = this.state;
    alert(`Incorporated: ${name} with ${skills.length} skills`);
  };

  handleAddSkill = () => {
    this.setState({
      skills: this.state.skills.concat([{ name: "" }])
    });
  };

  handleRemoveSkill = idx => () => {
    this.setState({
      skills: this.state.skills.filter((s, sidx) => idx !== sidx)
    });
  };

  handleSkillChanged(key, event) {
    var skills = this.state.skills.slice();
    skills[key] = event.target.value;
    this.setState({ skills: skills });
  }
  handleTeamNameChange = idx => evt => {
    const newTeam = this.state.team.map((team, sidx) => {
      if (idx !== sidx) return team;
      return { ...team, name: evt.target.value };
    });

    this.setState({ team: newTeam });
  };

  handleSubmitTeam = evt => {
    const { name, team } = this.state;
    alert(`Incorporated: ${name} with ${team.length} team`);
  };

  handleAddTeam = () => {
    this.setState({
      team: this.state.team.concat([{ name: "" }])
    });
  };

  handleRemoveTeam = idx => () => {
    this.setState({
      team: this.state.team.filter((s, sidx) => idx !== sidx)
    });
  };

  handleTeamChanged(key, event) {
    var team = this.state.team.slice();
    team[key] = event.target.value;
    this.setState({ team: team });
  }
  onSubmit(e) {
    e.preventDefault();
    
    console.log(`Form submitted:`);

    const payload = {
        bio: this.state.bio,
        blogs: this.state.blogs,
        username: this.state.username,
        userType: this.state.userType,
        skills: this.state.skills,
        requirement: this.state.requirement,
        github: this.state.github,
        linkedIn: this.state.linkedIn,
        weblink: this.state.weblink,
        team: this.state.team
    };
    
    axios.post("/user/profile" , payload)
    .then(res => console.log(res.data));

    this.setState({
        bio: this.state.bio,
        blogs: this.state.blogs,
        username: this.state.username,
        userType: this.state.userType,
        skills: this.state.skills,
        requirement: this.state.requirement,
        github: this.state.github,
        linkedIn: this.state.linkedIn,
        weblink: this.state.weblink,
        team: this.state.team
    });
}

  componentDidMount() {
    axios
      .get("/user/profile")
      .then(response => {
        console.log(response);
        const user = response.data;
        console.log(user);
        const { weblink, blogs, team, skills } = user;
        console.log(blogs);
        console.log(team);
        console.log(weblink);
        this.setState({
          bio: user.bio,
          blogs: blogs,
          username: user.username,
          userType: user.userType,
          skills: skills,
          requirement: user.requirement,
          github: user.github,
          linkedIn: user.linkedIn,
          weblink: weblink,
          team: team
        });
        console.log(skills);
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  render() {
    /* jshint ignore:start */
    return (
      <div>
      <form onSubmit={this.onSubmit}>
        <h3>Profile</h3>
        <div className="row">
        <div className="form-group col-md-6">
          <label className="form-label">Username: </label>
          <input
            type="text"
            className="form-control"
            value={this.state.username}
            onChange={this.onChangeUsername}
          />
        </div>
        <div className="form-group col-md-6">
          <label className="form-label">UserType: </label>
          <input
            type="text"
            className="form-control"
            value={this.state.userType}
            onChange={this.onChangeUserType}
          />
        </div>
        </div>
        <div className="form-group">
          <label>Bio: </label>
          <textarea
            name="Bio"
            id="post"
            className="form-control"
            placeholder="bio"
            rows="5"
            value={this.state.bio}
            onChange={this.onChangeBio}
          ></textarea>
        </div>
        <h4>Skills</h4>

        {this.state.skills.map((skills, idx) => (
          <div className="skills row">
          <div className="col-md-6">
            <input
              type="text"
              placeholder={`Skill #${idx + 1} name`}
              value={skills.name}
              onChange={this.handleSkillNameChange(idx)}
            />
            <button
              type="button"
              onClick={this.handleRemoveSkill(idx)}
              className="small"
            >-
            </button>
            </div>
          </div>
        ))}
        <button type="button" onClick={this.handleAddSkill} className="small">
          Add SKills
        </button>
        <div className="row">
        <div className="form-group col-md-6">
          <label>Github: </label>
          <input
            type="text"
            className="form-control"
            value={this.state.github}
            onChange={this.onChangeGithub}
          />
        </div>
        <div className="form-group col-md-6">
          <label>LinkedIn: </label>
          <input
            type="text"
            className="form-control"
            value={this.state.linkedIn}
            onChange={this.onChangeLinkedin}
          />
        </div>
        </div>
        <h4>Team</h4>

        {this.state.team.map((team, idx) => (
        <div className="skills col-md-6">
            <input
            type="text"
            placeholder={`Team #${idx + 1} name`}
            value={team.name}
            onChange={this.handleTeamNameChange(idx)}
            />
            <button
            type="button"
            onClick={this.handleRemoveTeam(idx)}
            className="small"
            >-
            </button>
        </div>
        ))}
        <button type="button" onClick={this.handleAddTeam} className="small">
        Add Team
        </button>
        <div className="form-group">
            <input type="submit" value="Update Profile" className="btn btn-primary btn-dark" />
        </div>

        </form>
      </div>
    );
    /* jshint ignore:end */
  }
}
