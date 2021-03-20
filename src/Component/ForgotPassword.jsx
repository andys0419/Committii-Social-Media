import React from "react";
import "../App.css";

export default class ForgotPassword extends React.Component {

    constructor() {
        super();

        this.state = {
            email: "",
            errorMessage: "",
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
      console.log("Submitting Emails");
      //email must be used in the checkemail page, so it must be stored
      // localStorage.setItem('user_email', email)
      
      // API call to fetch request for a password reset
      let options = {
        method: "POST",
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
        })
      };

      let res = await fetch(process.env.REACT_APP_API_PATH+"/auth/request-reset", options);

      if(res.ok) {
        localStorage.setItem('user_email', email);
        document.location.href = '/checkemail';
      }
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
              {this.state.errorMessage !== "" ? <p>You have entered a nonvalid email.</p> : <div/>}
              {this.state.errorMessage == ""}
              <br/>
              <input name="button" type="submit" value="Submit"  onClick={()=>{this.submitEmail()}}></input>
          </div>
        );
    }
}