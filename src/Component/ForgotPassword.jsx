import React from "react";
import "../App.css";

export default class ForgotPassword extends React.Component {

    constructor() {
        super();

        this.state = {
            email: "",
            errorMessage: ""
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
      fetch(process.env.REACT_APP_API_PATH+"/auth/request-reset", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email
        })
      })
        .then(result => result.json())
        .then(
          result => {
            //response handling needs to be checked
            if (result.Status == 400) {
              this.setState({
              errorMessage: "Bad request. Please try again!"
              })
              return;
            }

            if (result.Status == 401) {
              this.setState({
              errorMessage: "Authentication token is invalid. Please try again!"
              })
              return;
            }
            
            // if (result.Status == 200) {
            //   document.location.href = '/checkemail'
            //   return;
            // }
            
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
              {/* {this.state.email.includes("@") && this.state.email.includes(".") ? <div/> : <p>Please enter a valid email.</p>} */}
              {this.state.errorMessage !== "" ? <p>Not a valid email or bad request.</p> : <div/>}
              <br/>
              <br/>
              <button onClick={this.submitEmail}>Submit</button>
          </div>
        );
    }
}