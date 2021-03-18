import React from "react";
import {
  Link
} from 'react-router-dom';
import prof_pic from "../assets/profile-picture-holder.png";
import "./profile-page.css";
import committiilogo from "../assets/logo.svg";

export default class ProfilePage extends React.Component {
  constructor() {
    super();

    this.state = {
      username: 'User',
      following: 0,
      followers: 0
    };
  }

  componentDidMount() {
    console.log("In profile");
    console.log(this.props);

    // first fetch the user data to allow update of username
    fetch(process.env.REACT_APP_API_PATH+"/users/"+sessionStorage.getItem("user"), {
      method: "get",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(
        result => {
          if (result) {
            console.log(result);

            this.setState({
              // IMPORTANT!  You need to guard against any of these values being null.  If they are, it will
              // try and make the form component uncontrolled, which plays havoc with react
              username: result.email || "",
              //firstname: result.firstName || "",
              //lastname: result.lastName || ""

            });
          }
        },
        error => {
          alert("error!");
        }
      );
      }


  render() {
    return (
      <div className="App">
        <img src={prof_pic} id="prof_pic" alt="logo" />
        <p id="welcome">Hello, {this.state.username}</p>
        <p id="following">{this.state.following} Following</p>
        <p id="followers">{this.state.followers} Followers</p>

        <Link to="/profilesettings"><button id="edit_prof">Edit Profile</button></Link>
        <Link to="/privacy-settings"><button id="edit_priv">Privacy Settings</button></Link>
        <Link to="/">
          <img id="committii-logo" src={committiilogo}></img>
        </Link>
        <canvas id="Polls"></canvas>
        <p id="curr_polls">Current Polls:</p>
        <p id="prev_polls">Previous Polls:</p>
        <p id="poll1">Cats vs. Dogs</p>
        <button id="view_res">View Results</button>
        <button id="del_post">Delete</button>
        <p id="poll2">Cats vs. Dogs</p>
        <button id="view_res2">View Results</button>
        <button id="del_post2">Delete</button>
      </div>
    );
  }
}