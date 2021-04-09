import React from "react";
import {Redirect} from 'react-router-dom';
import "../App.css";


export default class ForgotPassword extends React.Component {

    constructor() {
        super();

        this.state = {
            email: "",
            errorMessage: "",
            redirect: false
        }
    }

    updateEmail = (e) => {
      this.setState({
        email: e.currentTarget.value
      })
    }

    submitEmail = async (e) => {
      const email = this.state.email;
      var email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (email == '') {
          this.setState({
            errorMessage: "Field cannot be left blank."
          })
          return;
      } else if (!email.match(email_pattern)) {
          this.setState({
            errorMessage: "Please enter a valid email."
          })
          return;
      } else {
      //console.log("Submitting Emails");
      //email must be used in the checkemail page, so it must be stored
      // localStorage.setItem('user_email', email)
      
      // API call to fetch request for a password reset
      let res = await fetch(process.env.REACT_APP_API_PATH + "/auth/request-reset", {
          body: JSON.stringify({'email': this.state.email}),
          headers: {
            'Accept': "*/*",
            "Content-Type": "application/json"
          },
          method: "POST"
      });

      if (res.ok) {
        sessionStorage.setItem('user_email', email);
        
        this.setState({
          redirect: true
        })
        
      }

    }
  }
    
    render() {

        if (this.state.redirect) {
          return <Redirect to='/checkemail' />
        }

        return (
          <div id="base_rectangle" className="reset-component">
              <div id="forgot_content">
              <h3>Please enter your email address.</h3>
              <br/>
              <input id="name" name="email" placeholder="elmas@buffalo.edu" type="text" size="35" onChange={this.updateEmail} value={this.state.email} required></input>
              <br/>
              {this.state.errorMessage !== "" ? this.state.errorMessage : <div/>}
              {this.state.errorMessage == ""}
              <br/>
              <br/>
              <input name="button" type="submit" value="Submit"  onClick={()=>{this.submitEmail()}}></input>
              </div>
          </div>
        );
    }
}
