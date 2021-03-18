import React from "react";
import { Link } from "react-router-dom";

import "../App.css";
import "./profile-page.css";
import "./profilesettings.css";
import prof from "./prof.png";
import logo from "../assets/logo.svg";
import backarrow from "../assets/back_arrow.svg";



// the login form will display if there is no session token stored.  This will display
// the login form, and call the API to authenticate the user and store the token in
// the session.

export default class ProfileSettings extends React.Component {
  constructor() {
    super();
    this.state =
        {
            username: 'John Smith',
            email: 'test@test.edu',
            password: '12345',
            bio:'Tell us something about you',
            dob:'X/XX/XXXX',
            blockedUsers: ["No Blocked Users"],
            avatarbutton:"Change Avatar",
            closebutton:"Close Account"
    };
    this.handleClick = this.handleClick.bind(this)
      this.changeAvatarButton = this.changeAvatarButton.bind(this);
    this.changeAvatarButtonBack = this.changeAvatarButtonBack.bind(this);
    this.changeCloseButton = this.changeCloseButton.bind(this);
    this.changeCloseButtonBack = this.changeCloseButtonBack.bind(this);
  }

  handleClick(){
    // Changing state
      if(document.getElementById('username').value != "") {
          this.setState({username: document.getElementById('username').value});
          document.getElementById('username').value = '';
      }
      if(document.getElementById('password').value != "") {
          this.setState({password: document.getElementById('password').value})
          document.getElementById('password').value = ''
      }
      if(document.getElementById('email').value != "") {
          this.setState({email: document.getElementById('email').value});
          document.getElementById('email').value = '';
      }
      if(document.getElementById('bio').value != "") {
          this.setState({bio: document.getElementById('bio').value})
          document.getElementById('bio').value = ''
      }
      if(document.getElementById('dob').value != "") {
          this.setState({dob: document.getElementById('dob').value})
          document.getElementById('dob').value = ''
      }

      if(document.getElementById('blocked').value != "") {
          if (this.state.blockedUsers[0] == "No Blocked Users"){
              this.setState({blockedUsers: [document.getElementById('blocked').value]})
          }else{
              this.setState({blockedUsers: [...this.state.blockedUsers ," ", document.getElementById('blocked').value]})
          }
          document.getElementById('blocked').value = ''
      }
  }

  changeAvatarButton(){
      this.setState({avatarbutton:"Feature Coming Soon"})
  }
  changeAvatarButtonBack(){
      this.setState({avatarbutton:"Change Avatar"})
  }
   changeCloseButton(){
      this.setState({closebutton:"Feature Coming Soon"})
  }
  changeCloseButtonBack(){
      this.setState({closebutton:"Close Account"})
  }

  render() {
    const LoginFormStyle = {
      width: "96%",
      height: "3em"
    };
      return (
        <div id="Login">
          <a id="HeaderLabel">Hello, {this.state.username}</a>
            <div className='container'>
                <button id="avatarbutton" onMouseLeave={this.changeAvatarButtonBack} onMouseOver={this.changeAvatarButton}>{this.state.avatarbutton}</button>
                <img src={prof} className="prof_pic" alt="logo" />
            </div>
            <a id="ProfileHeading">Account Information</a>
          <div id="ProfileInput">
            <input id="username" style={LoginFormStyle} type="text" placeholder={"Username: "+this.state.username} />
          </div>
            <div id="ProfileInput">
            <input id="password" style={LoginFormStyle} type="password" placeholder={"Password: "+this.state.password} />
          </div>
            <div id="ProfileInput">
            <input id="email" style={LoginFormStyle} type="text" placeholder={"Email: "+this.state.email}/>
          </div>
            <a id="ProfileHeading">Social Information</a>
            <div id="ProfileInput">
            <input id="bio" style={LoginFormStyle} type="text" placeholder={"Short Bio: "+this.state.bio}/>
          </div>
          <div id="ProfileInput">
            <input id="dob" style={LoginFormStyle} type="text" placeholder={"Date of Birth: "+this.state.dob}/>
          </div>
            <a id="ProfileHeading">Blocked Users</a>
            <div id="BlockedResults">
            <p>{this.state.blockedUsers}</p>
            </div>
          <div id="ProfileInput">
            <input id="blocked" style={LoginFormStyle} type="text" placeholder={"Block: Johe Doe"}/>
          </div>

            <div className='container'>
                <Link to="/privacy-settings"><button>Privacy Settings</button></Link>
                <button onClick={this.handleClick}>Save</button>
                <button onMouseLeave={this.changeCloseButtonBack} onMouseOver={this.changeCloseButton}>{this.state.closebutton}</button>
                <Link to="/profile">
                <img id="backarrow" src={backarrow}></img>
                </Link>
            </div>

            <img id="settingslogo" src={logo}></img>

          <p>{this.state.alanmessage}</p>
        </div>
      );
  }
}
