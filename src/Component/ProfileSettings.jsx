import React from "react";
import { Link } from "react-router-dom";

import "../App.css";
import "./profile-page.css";
import "./profilesettings.css";
import prof from "./prof.png";


// the login form will display if there is no session token stored.  This will display
// the login form, and call the API to authenticate the user and store the token in
// the session.

export default class ProfileSettings extends React.Component {
  constructor() {
    super();

    this.state =
        {
            username: 'Ryan',
            email: 'jtdilapo',
            password: '12345',
            bio:'Hello I am a senior',
            dob:'12/23/2034',
            allUsers: [],
            blockedUsers: [],
    };

  }

  componentDidMount() {
  // make a request to our API and get all of the users
  fetch("http://stark.cse.buffalo.edu/hci/usercontroller.php", {
    method: "POST",
    body: JSON.stringify({
      action: "getUsers"
    })
  })
    .then(response => response.json())
    .then(json => {
      // when we recieve a response, set the users state to our return value.
      this.setState({
        allUsers: json.users
      })
    });
}


myChangeHandler = event => {
    this.setState({
      username: event.target.value
    });
  };

  passwordChangeHandler = event => {
    this.setState({
      password: event.target.value
    });
  };

  // when the user hits submit, process the login through the API
  submitHandler = event => {
    //keep the form from actually submitting
    event.preventDefault();

    //make the api call to the authentication page
    fetch(process.env.REACT_APP_API_PATH+"/auth/login", {
      method: "post",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.username,
        password: this.state.password
      })
    })
      .then(res => res.json())
      .then(
        result => {
          console.log("Testing");
          if (result.userID) {

            // set the auth token and user ID in the session state
            sessionStorage.setItem("token", result.token);
            sessionStorage.setItem("user", result.userID);

            this.setState({
              sessiontoken: result.token,
              alanmessage: result.token
            });

            // call refresh on the posting list
            this.refreshPostsFromLogin();
          } else {

            // if the login failed, remove any infomation from the session state
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");
            this.setState({
              sessiontoken: "",
              alanmessage: result.message
            });
          }
        },
        error => {
          alert("error!");
        }
      );
  };

  render() {
    // console.log("Rendering login, token is " + sessionStorage.getItem("token"));
    const LoginFormStyle = {
      width: "96%",
      height: "3em"
    };

    const allUsers = this.state.allUsers;
      return (
        <form id="Login" onSubmit={this.submitHandler}>
          <a id="HeaderLabel">Hello, {this.state.username}</a>
            <div className='container'>
                <button>Change Avatar</button>
                <img src={prof} className="prof_pic" alt="logo" />
            </div>
            <a id="ProfileHeading">Account Information</a>
          <div id="ProfileInput2">
            <input name = "hi" style={LoginFormStyle} type="text" placeholder={"Username: "+this.state.username} />
          </div>
            <div id="ProfileInput">
            <input style={LoginFormStyle} type="password" placeholder={"Password: "+this.state.password} />
          </div>
            <div id="ProfileInput">
            <input style={LoginFormStyle} type="text" placeholder={"Email: "+this.state.email}/>
          </div>
            <a id="ProfileHeading">Social Information</a>
            <div id="ProfileInput">
            <input style={LoginFormStyle} type="text" placeholder={"Short Bio: "+this.state.bio}/>
          </div>
          <div id="ProfileInput">
            <input style={LoginFormStyle} type="text" placeholder={"Date of Birth: "+this.state.dob}/>
          </div>

            <div className='container'>
                <button>Privacy Settings</button>
                <button onClick={this.myChangeHandler}>Save</button>
                <button>Close Account</button>
            </div>


          <p>{this.state.alanmessage}</p>
        </form>

      );
  }
}