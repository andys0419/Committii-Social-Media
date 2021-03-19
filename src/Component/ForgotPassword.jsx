import React from "react";
import "../App.css";

export default class ForgotPassword extends React.Component {

    constructor() {
        super();

        this.state = {
            email: "",
            errorMessage: "",
            resetToken: false
        }
    }

    updateEmail = (e) => {
      this.setState({
        email: e.currentTarget.value
      })
    }

    submitEmail = (e) => {
      const email = this.state.email;
      var email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (email == '') 
      {
        this.setState({
          errorMessage: "Field cannot be left blank."
        })
        return;
      } else if (!email.match(email_pattern)) 
      {
        this.setState({
          errorMessage: "Please enter a valid email."
        })
        return;
      } else {
      
      //email must be used in the checkemail page, so it must be stored
      localStorage.setItem('user_email', email)

      
      // API call to fetch request for a password reset
      fetch("https://webdev.cse.buffalo.edu/hci/elmas/api/api"+"/auth/request-reset", {
        method: "post",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email
        })
      })
        .then(res => res.json())
        .then(
          result => {
            //response handling needs to be checked
            console.log("Request sent, getting reset token of a valid email.");
            if (result.Status !== 200) {
              alert("There was an error with your request. Please try again.")
            }
          },
          document.location.href = '/checkemail'
        )
      }
    }
    
    render() {
        return (
          <div id="base_rectangle" className="reset-component">
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <h3>Please enter your email address.</h3>
              <br/>
              <input id="name" name="email" placeholder="elmas@buffalo.edu" type="text" size="35" onChange={this.updateEmail} value={this.state.email} required></input>
              {this.state.errorMessage !== "" ? <p>Not a valid email or bad request.</p> : <div/>}
              {this.state.errorMessage == ""}
              <br/>
              <input name="button" type="submit" value="Submit"  onClick={this.submitEmail}></input>
          </div>
        );
    }
}