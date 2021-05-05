import React from "react";
import { Link } from "react-router-dom";
import {
  Redirect
} from 'react-router';
import "../App.css";

// the login form will display if there is no session token stored.  This will display
// the login form, and call the API to authenticate the user and store the token in
// the session.

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      alanmessage: "",
      sessiontoken: "",
      errorMessage: "",
      redir: false
    };
    //this.refreshPostsFromLogin = this.refreshPostsFromLogin.bind(this);
  }

  // once a user has successfully logged in, we want to refresh the post
  // listing that is displayed.  To do that, we'll call the callback passed in
  // from the parent.
  // refreshPostsFromLogin(){
  //   this.props.refreshPosts();
  // }

  // change handlers keep the state current with the values as you type them, so
  // the submit handler can read from the state to hit the API layer
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
    
    //check fields aren't empty
    if (this.state.username == "" || this.state.password == "") {
        this.setState({
          errorMessage: "Please fill in all required fields."
        });
        return;
    }

    //check for valid email
    var email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!this.state.username.match(email_pattern)) {
      this.setState({
        errorMessage: "Please enter a valid email format."
      })
      return;
    }

    //make the api call to the authentication page
    fetch(process.env.REACT_APP_API_PATH+"/auth/login", {
      method: "POST",
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

            // set the auth token, user ID, and username in the session state
            sessionStorage.setItem("token", result.token);
            sessionStorage.setItem("user", result.userID);
            sessionStorage.setItem("username", this.state.username);
            
            this.setState({
              sessiontoken: result.token,
              alanmessage: result.token,
              redir: true
            });

            // call refresh on the posting list
            //this.refreshPostsFromLogin();
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
        _error => {
          this.setState({
            errorMessage: "Incorrect email or password. Please try again.",
          });
        }
      );
  };

  render() {
    // console.log("Rendering login, token is " + sessionStorage.getItem("token"));
    if (this.state.redir) return <Redirect to='/feed'/>

    if (!sessionStorage.getItem("token")) {
      return (
        <form id="Login" onSubmit={this.submitHandler}>
          <h1 id="LoginLabel">SIGN IN</h1>
          {this.state.errorMessage !== "" ? <a id="ForgotP">{this.state.errorMessage}</a> : <div/>}
          {this.state.errorMessage == ""}
          <div id="LoginUsername">
            <input id="LoginForm" type="text" placeholder="*Username" onChange={this.myChangeHandler} />
          </div>
          <div id="LoginPassword">
            <input id="LoginForm" type="password" placeholder="*Password" onChange={this.passwordChangeHandler} />
          </div>
          <a id="ForgotP">*required</a>
          <Link to="/forgotpassword"><a id="ForgotP">Forget your password? Click here.</a></Link>
          <Link to="/register" id="RegisterinLog">New? Register here.</Link>
          <input id="SubmitButton" type="submit" value="Submit" />
          <p>{this.state.alanmessage}</p>
        </form>
      );
    } else {
      return <Redirect to='/feed'/>
    }
  }
}
