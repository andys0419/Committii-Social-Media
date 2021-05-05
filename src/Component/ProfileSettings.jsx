import React from "react";
import { Link } from "react-router-dom";

import "../App.css";
import "./profile-page.css";
import "./profilesettings.css";
import logo from "../assets/logo.svg";
import backarrow from "../assets/back_arrow.svg";
import prof_pic from "./prof.png"

const Checkbox = props => (
  <input type="checkbox" {...props} />
)

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
            status: "",
            token: "",
            privacy: false,

    };



  }

    statusOFstatus() {
        if(this.state.status == 'false'){
        return false;
        }
        if(this.state.status == 'true'){
        return true;
        }
      }
      statusOFstatus2() {
        if(this.state.lastName == 'false'){
        return false;
        }
        if(this.state.lastName == 'true'){
        return true;
        }
      }
  fieldChangeHandler(field, e) {
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
    this.setState({
      [field]: e.target.checked
    });
  }

  updatePassword = (e) => {
        this.setState({
          password: e.currentTarget.value
        })
    };

  updateToken = (e) => {
        this.setState({
          token: e.currentTarget.value
        })
    };

  updateToken = (e) => {
      this.setState({
        token: e.currentTarget.value
      })
  };



  componentDidMount() {

    // first fetch the user data to allow update of username
    console.log("HERE")
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
          if (result) {;
            console.log(result.bio)
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
                status: result.status || "",
                token: result.token || "",
                privacy: result.privacy || false

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
            console.log(result)
            let favoritecolor = "";

            // read the user preferences and convert to an associative array for reference


          }
        },
        error => {
          alert("error!");
        }
      );
  }


  displayProfilePic(){
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
       if (result.role == ""){
         document.getElementById("profilepic").src = prof_pic
       }else{
       var server = "https://webdev.cse.buffalo.edu"

       document.getElementById("profilepic").src = server + result.role
     }
     })
  }

  uploadProfileImage(userArtifact){
    const formData = new FormData();
    const fileInput = document.querySelector('input[type="file"]');
    formData.append("file", fileInput.files[0]);
    fetch(process.env.REACT_APP_API_PATH + "/user-artifacts/" + String(userArtifact) + "/upload", {
      method: "POST",
      body: formData,
      headers: {
        'Authorization': 'Bearer '+ sessionStorage.getItem("token")
      },
    }).then(res => res.json())
    .then(
      result => {
        fetch(process.env.REACT_APP_API_PATH+"/users/"+sessionStorage.getItem("user"), {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+sessionStorage.getItem("token")
          },
          body: JSON.stringify({
            "role": result.url
          })
        }).then(res => res.json())
        .then(
          result => {console.log(result)})
        this.displayProfilePic()
        document.getElementById("imgUpload").value = ""
      })
  }

    submitHandler = async (event) =>  {
        //keep the form from actually submitting
        event.preventDefault();
        console.log(this.state.status)
        //make the api call to the user controller
        fetch(process.env.REACT_APP_API_PATH+"/users/"+sessionStorage.getItem("user"), {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ sessionStorage.getItem("token")
          },
          body: JSON.stringify({
    
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                blockedUsers: this.state.blockedUsers,
                status: this.state.status,
                token: this.state.token,
                status: this.state.status
    
          })
        })
          .then(res => res.json())
          .then(
            result => {
              this.setState({
                responseMessage: result.status
              });
              alert("Saved!");
            },
            error => {
              alert("error!");
            }
          );
    
        let url = process.env.REACT_APP_API_PATH+"/user-preferences";
        let method = "POST";
    
    
    
        //make the api call to the user prefs controller
    
        const token = this.state.token;
        const password = this.state.password;
    
                let res = await fetch("https://webdev.cse.buffalo.edu/hci/elmas/api/api/auth/reset-password", {
                    body: JSON.stringify({'token': this.state.token, 'password': this.state.password}),
                    headers: {
                        'Accept': "*/*",
                        "Content-Type": "application/json"
                    },
                    method: "POST"
                });
    
    
        //fetch calls for profile Image
        if(document.getElementById("imgUpload").value != ""){
        fetch(process.env.REACT_APP_API_PATH + "/user-artifacts", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ sessionStorage.getItem("token")},
          body: JSON.stringify({
            "ownerID": sessionStorage.getItem("user"),
            "type": "Image",
            "url": "String",
            "category": "profilepic"
          })
        })
        .then(res => res.json())
        .then(
          result => {
            var userArtifact = -1;
            userArtifact = result.id;
            if (userArtifact != -1){
              this.uploadProfileImage(userArtifact);
            }
          })
        }
    
      }
  ///////////////
  render() {
    const LoginFormStyle = {
      width: "96%",
      height: "3em"
    };
    var check = false;
      return (
          <form onSubmit={this.submitHandler} className="profileform">
        <div id="Login">
             <Link to={"/profile/"+sessionStorage.getItem("user")}>
                <img id="backarrow" src={backarrow}></img>
            </Link>
          <a id="HeaderLabel">Hello, {this.state.username}</a>
            <div className='container'>
                <img src={this.displayProfilePic()} className="prof_pic" alt="Profile Picture" id="profilepic"/>
                <form action="/action_page.php" id="avatarbutton">
                  <label for="img1">Select Image:</label>
                  <input type="file" id="imgUpload" name="img" accept="image/*"></input>
                </form>
            </div>
            <a id="ProfileHeading">Account Information</a>
          <div id="ProfileInput">
            <input id="username" style={LoginFormStyle} type="text" placeholder={"Username: "+this.state.username} onChange={e => this.fieldChangeHandler("username", e)}
            value={this.state.username} />
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

          <a id="ProfileHeading">Privacy Settings</a>
          <div id="ProfileInput">
            <Checkbox id="checkA" checked={this.statusOFstatus()} value={this.state.status} onChange={e => this.fieldChangeHandler6("status", e)}/>
            <a id="ProfileSub"> Only show posts from followed users?</a>
          </div>
          <div id="ProfileInput">
            <Checkbox id="checkA" checked={this.statusOFstatus2()} value={this.state.lastName} onChange={e => this.fieldChangeHandler6("lastName", e)}/>
            <a id="ProfileSub"> Show my posts to my followers only?</a>
          </div>
            <div className='container'>
                <Link to="/forgotpassword"><button className="bottomButton">Change Password</button></Link>
                <Link to="/privacy-settings"><button className="bottomButton">Privacy Settings</button></Link>
                <button onClick={this.submitHandler}  className="bottomButton" input type="submit" value="save" >Save Settings</button>
                <Link to="/closeaccountposts"><button className="bottomButton">Close Account</button></Link>

            </div>

          <Link to="/feed"><img id="committii-logo" src={logo}></img></Link>
        </div>
        {this.state.responseMessage}
      </form> );


  }
}
