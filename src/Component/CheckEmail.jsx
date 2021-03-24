import React from "react";
import "../App.css";

export default class CheckEmail extends React.Component {

    constructor() {
        super();

        this.state = {
            token: "",
            password: "",
            confirm: "",
            errorMessage: "",
        };
    }

    updateToken = (e) => {
        this.setState({
          token: e.currentTarget.value
        })
    };

    updatePassword = (e) => {
        this.setState({
          password: e.currentTarget.value
        })
    };

    updateConfirm = (e) => {
        this.setState({
          confirm: e.currentTarget.value
        })
    };

    retry = (e) => {
        document.location.href = 'https://webdev.cse.buffalo.edu/hci/elmas/forgotpassword'
    };


    resetLogin = async (e) => {
        const token = this.state.token;
        const password = this.state.password;

        //validate the token 
        if (token  == '' || password == '') {
            this.setState({
                errorMessage: "Fields cannot be left blank."
            })
            return;
        }
        else if (token.length !== 188) {
            this.setState({
                errorMessage: "Invalid token length."
            })
            return;
        }
        else if (this.state.password !== this.state.confirm) {
            this.setState({
                errorMessage: "Password fields do not match."
            })
            return;
        }
        else {
            
            let res = await fetch("https://webdev.cse.buffalo.edu/hci/elmas/api/api/auth/reset-password", {
                body: JSON.stringify({'token': this.state.token, 'password': this.state.password}),
                headers: {
                    'Accept': "*/*",
                    "Content-Type": "application/json"
                },
                method: "POST"
            });

            if (res.ok) {
                // sessionStorage.setItem('resetPassword', true);
                document.location.href = 'https://webdev.cse.buffalo.edu/hci/elmas/forgotpassword';
            }
        }
        
    }

    showOrHide = (e) => {
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');

        if (password.type == 'password') {
            password.type = 'text';
            confirmPassword.type = 'text';
        } 
        else {
            password.type = 'password';
            confirmPassword.type = 'password';
        }
        
    };


render() {
        return (
          <div id="base_rectangle" className="reset-component">
              <br/>
              <br/>
              <br/>
              <br/>
              <h1>{sessionStorage.getItem('user_email')}</h1>
              <h2>Please check your email.</h2>
              <br/>
              <input type="text" placeholder="Enter your password reset token" type="text" size="40" onChange={this.updateToken} value={this.state.token} required></input>
              <br/>
              <br/>
              <input type="password" id="password" placeholder="Enter your new password" size="40" onChange={this.updatePassword} value={this.state.password} required></input>
              <br/>
              <br/>
              <input type="password" id="confirmPassword" placeholder="Confirm your new password" size="40" onChange={this.updateConfirm} value={this.state.confirm} required></input>
              <br/>
              <br/>
              <input type="checkbox" id="togglePassword" onClick={this.showOrHide}></input>
              <label for="togglePassword">Show password</label>
              <br/>
              <br/>
              {this.state.errorMessage !== "" ? this.state.errorMessage : <div/>}
              {this.state.errorMessage == ""}
              <br/>
              <br/>
              <input name="button" type="submit" value="Login"  onClick={this.resetLogin}></input>
              <br/>
              <br/>
              <input name="button" type="submit" value="Didn't Receive an Email?"  onClick={this.retry}></input>
          </div>
        );
    }

}
