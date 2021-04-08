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
  constructor(props) {
    super(props);
    this.state =
        {
            username: '',
            email: '',
            password: '',
            bio: '',
            dob: '',
            blockedUsers: "",
            avatarbutton:"Change Avatar",
            closebutton:"Close Account",
            firstName: "",
            lastname: "",
            favoritecolor: "",
            responseMessage: "",
            status: ""
    };
    this.handleClick = this.handleClick.bind(this)
      this.changeAvatarButton = this.changeAvatarButton.bind(this);
    this.changeAvatarButtonBack = this.changeAvatarButtonBack.bind(this);
    this.changeCloseButton = this.changeCloseButton.bind(this);
    this.changeCloseButtonBack = this.changeCloseButtonBack.bind(this);
    this.fieldChangeHandler.bind(this);
    this.fieldChangeHandler2.bind(this);
    this.fieldChangeHandler3.bind(this);
    this.fieldChangeHandler4.bind(this);
    this.fieldChangeHandler5.bind(this);
    this.fieldChangeHandler6.bind(this);
    this.updatePassword.bind(this);

  }

  fieldChangeHandler(field, e) {
    console.log("field change");
    this.setState({
      [field]: e.target.value
    });
  }

  fieldChangeHandler2(field, e) {
    console.log("field change");
    this.setState({
      [field]: e.target.value
    });
  }
  fieldChangeHandler3(field, e) {
    console.log("field change");
    this.setState({
      [field]: e.target.value
    });
  }
  fieldChangeHandler4(field, e) {
    console.log("field change");
    this.setState({
      [field]: e.target.value
    });
  }
  fieldChangeHandler5(field, e) {
    console.log("field change");
    this.setState({
      [field]: e.target.value
    });
  }

  fieldChangeHandler6(field, e) {
    console.log("field change");
    this.setState({
      [field]: e.target.value
    });
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

                username: result.username || "",
                firstName: result.firstName || "",
                lastName: result.lastName || "",
                password: result.password || "",
                bio: result.bio || "",
                dob: result.dob || "",
                blockedUsers: result.blockedUsers || "",
                email: result.email || "",
                status: result.status || ""

            });
          }
        },
        error => {
          alert("error!");
        }
      );

    //make the api call to the user API to get the user with all of their attached preferences
    fetch(process.env.REACT_APP_API_PATH+"/user-preferences?userID="+sessionStorage.getItem("user"), {
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
            let favoritecolor = "";

            // read the user preferences and convert to an associative array for reference



            console.log(favoritecolor);


          }
        },
        error => {
          alert("error!");
        }
      );
  }

  submitHandler = event => {
    //keep the form from actually submitting
    event.preventDefault();

    //make the api call to the user controller
    fetch(process.env.REACT_APP_API_PATH+"/users/"+sessionStorage.getItem("user"), {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem("token")
      },
      body: JSON.stringify({

            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            blockedUsers: this.state.blockedUsers,
            status: this.state.status

      })
    })
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            responseMessage: result.Status
          });
        },
        error => {
          alert("error!");
        }
      );

    let url = process.env.REACT_APP_API_PATH+"/user-preferences";
    let method = "POST";


    //make the api call to the user prefs controller

    let res = fetch("https://webdev.cse.buffalo.edu/hci/elmas/api/api/auth/reset-password", {
                body: JSON.stringify({'password': this.state.password}),
                headers: {
                    'Accept': "*/*",
                    "Content-Type": "application/json"
                },
                method: "POST"
            });

  }
  ///////////////


  handleClick(){
    // Changing state


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
  };



  render() {
    const LoginFormStyle = {
      width: "96%",
      height: "3em"
    };
      return (
          <form onSubmit={this.submitHandler} className="profileform">
        <div id="Login">
             <Link to="/profile">
                <img id="backarrow" src={backarrow}></img>
            </Link>
          <a id="HeaderLabel">Hello, {this.state.username}</a>
            <div className='container'>
                <img src={prof} className="prof_pic" alt="logo" />
                <button id="avatarbutton" onMouseLeave={this.changeAvatarButtonBack} onMouseOver={this.changeAvatarButton}>{this.state.avatarbutton}</button>
            </div>

            <a id="ProfileHeading">Account Information</a>
          <div id="ProfileInput">
            <input id="username" style={LoginFormStyle} type="text" placeholder={"Username: "+this.state.username} onChange={e => this.fieldChangeHandler("username", e)}
            value={this.state.username} />
          </div>
            <div id="ProfileInput">
            <input id="password" style={LoginFormStyle} type="password" placeholder={"Password: XXXXXXXX"}onChange={this.updatePassword} value={this.state.password}/>
          </div>
            <div id="ProfileInput">
            <input id="email" style={LoginFormStyle} type="text" placeholder={"Email: "+this.state.email} onChange={e => this.fieldChangeHandler2("email", e)}
            value={this.state.email}/>
          </div>
            <a id="ProfileHeading">Social Information</a>
            <div id="ProfileInput">
            <input id="bio" style={LoginFormStyle} type="text" placeholder={"Short Bio: "+this.state.firstName} onChange={e => this.fieldChangeHandler4("firstName", e)}
            value={this.state.firstName}/>
          </div>
          <div id="ProfileInput">
            <input id="dob" style={LoginFormStyle} type="text" placeholder={"Date of Birth: "+this.state.lastName} onChange={e => this.fieldChangeHandler5("lastName", e)}
            value={this.state.lastName}/>
          </div>
            <a id="ProfileHeading">Blocked Users</a>
            <div id="BlockedResults">
            <p>{this.state.status}</p>
            </div>
          <div id="ProfileInput">
            <input id="blocked" style={LoginFormStyle} type="text" placeholder={"Block: Johe Doe"} onChange={e => this.fieldChangeHandler6("blockedUsers", e)}/>
            <button onClick={e => this.setState({status:this.state.status +" | "+ this.state.blockedUsers})} input type="submit" value="blocked" >Add</button>

          </div>

            <div className='container'>
                <Link to="/privacy-settings"><button>Privacy Settings</button></Link>
                <button onClick={this.handleClick} input type="submit" value="save" >Save</button>
                <Link to="/closeaccount"><button>Close Account</button></Link>
            </div>

            <Link to="/profile">
            <img id="settingslogo" src={logo}></img>
            </Link>
        </div>
        {this.state.responseMessage}
      </form> );


  }
}
