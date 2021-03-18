import React from "react";
import "../App.css";

export default class CheckEmail extends React.Component {

    constructor() {
        super();
    }

    login = (e) => {
        document.location.href = '/login'
    }

    retry = (e) => {
        document.location.href = '/forgotpassword'
    }


    render() {
        return (
          <div id="base_rectangle" className="reset-component">
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <h1>{localStorage.getItem('user_email')}</h1>
              <h4>Please check your email for <br/> further instructions.</h4>
              <br/>
              <input name="button" type="submit" value="Proceed to Login"  onClick={this.login}></input>
              {/* <button onClick={this.login}>Proceed to Login</button> */}
              <br/>
              <br/>
              <br/>
              <input name="button" type="submit" value="Didn't Receive an Email?"  onClick={this.retry}></input>
              {/* <button onClick={this.retry}>Didn't Receive an Email?<br/>Click here.</button> */}
          </div>
        );
    }

}