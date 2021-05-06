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
      nickname: "",
      password: "",
      confirm: "",
      alanmessage: "",
      errorMessage: "",
      sessiontoken: "",
      redir: false
    };
  }

  myChangeHandler = event => {
    this.setState({
      username: event.target.value
    });
  };

  userChangeHandler = event => {
    this.setState({
      nickname: event.target.value
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
        errorMessage: "Error, passwords don't match!",
      });
      return;
    }
    //check empty
    if (this.state.username == "" || this.state.password == "" || this.state.nickname == ""  || this.state.confirm == "") {
      this.setState({
        errorMessage: "Please fill in all required fields."
      })
      return;
    }

    //check email format is valid
    var email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!this.state.username.match(email_pattern)) {
      this.setState({
        errorMessage: "Please enter a valid email format."
      })
      return;
    }

    //check password fields are matching
    if (this.state.password !== this.state.confirm){
      this.setState({
        errorMessage: "Error: Passwords do not match"
      })
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

            this.setUserName()

            // call refresh on the posting list
            //this.refreshPostsFromLogin();
          } else {

            // if the login failed, remove any infomation from the session state
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");
            this.setState({
              sessiontoken: "",
              alanmessage: result.message,
              errormessage: "Error: Invalid Email or Password"
            });
          }
        },
        _error => {
          this.setState({
            errorMessage: "This account is already taken!",
          });
        }
      );
  };

  setUserName() {
    fetch(process.env.REACT_APP_API_PATH+"/users/"+sessionStorage.getItem("user"), {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ sessionStorage.getItem("token")
      },
      body: JSON.stringify({
            username: this.state.nickname,
      })
    })
      .then(res => res.json())
      .then(
        result => {
          console.log("Saved!");
        },
        error => {
          console.log("error!");
        }
      );
  }
  render() {
    if (this.state.redir) return <Redirect to='/feed'/>
    else return (
    <div>
        <form id = "Login" onSubmit={this.submitHandler} className="profileform">
          <h1 id="LoginLabel">REGISTER</h1>
          {this.state.errorMessage !== "" ? <a id="ForgotP">{this.state.errorMessage}</a> : <div/>}
          {this.state.errorMessage == ""}
          <div id="LoginUsername">    
              <input id="LoginForm" type="text" placeholder="*Email" onChange={this.myChangeHandler} />
          </div>
          <div id="LoginUsername">    
              <input id="LoginForm" type="text" placeholder="*Username" onChange={this.userChangeHandler} />
          </div>
          <div id="LoginUsername">
              <input id="LoginForm" type="password" placeholder="*Password" onChange={this.passwordChangeHandler} />
          </div>
          <div id="LoginPassword">
              <input id="LoginForm" type="password" placeholder="*Password (Confirm)" onChange={this.confirmPasswordChangeHandler} />
          </div>
          <a id="ForgotP">*required</a>
          <input id="SubmitButton" type="Submit" value="submit" className/>
          {this.state.responseMessage}
        </form>
      </div>
    );
  }
}
