import React from "react";
import "../App.css";
import {
    Redirect
} from 'react-router';
//import Autocomplete from "./Autocomplete.jsx";

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      confirm: "",
      alanmessage: "",
      sessiontoken: "",
      redir: false
    };
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

  confirmPasswordChangeHandler = event => {
      this.setState({
        confirm: event.target.value
      });
    
  };

  // when the user hits submit, process the Register through the API
  submitHandler = event => {
    //keep the form from actually submitting
    event.preventDefault();
    if (this.state.password !== this.state.confirm)
    {
      this.setState({
        alanmessage: "Error: Passwords do not match"
      });
      
      return;
    }
    //make the api call to the authentication page
    fetch(process.env.REACT_APP_API_PATH+"/auth/signup", {
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
          alert("error!");
        }
      );
  };

  render() {
    const LoginFormStyle = {
      width: "96%",
      height: "3em"
    }; 

    if (this.state.redir) return <Redirect to='/'/>
    else return (
    <div>
        <form id = "Login" onSubmit={this.submitHandler} className="profileform">
          <h1 id="LoginLabel">REGISTER</h1>
          <div id="LoginUsername">    
              <input id="LoginForm" type="text" placeholder="Username" onChange={this.myChangeHandler} />
          </div>
          <div id="LoginUsername">
              <input id="LoginForm" type="password" placeholder="Password" onChange={this.passwordChangeHandler} />
          </div>
          <div id="LoginPassword">
              <input id="LoginForm" type="password" placeholder="Password (Confirm)" onChange={this.confirmPasswordChangeHandler} />
          </div>
          <input id="SubmitButton" type="Submit" value="submit" className/>
          {this.state.responseMessage}
        </form>
      </div>
    );
  }
}
