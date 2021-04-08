import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import "./profile-page.css";
import "./profilesettings.css";
import logo from "../assets/logo.svg";
import backarrow from "../assets/back_arrow.svg";
import profilepicture from "./prof.png"

// the login form will display if there is no session token stored.  This will display
// the login form, and call the API to authenticate the user and store the token in
// the session.

export default class ProfileSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state =
        {
            username: '',
            email: 'test@test.edu',
            password: '12345',
            bio:'Tell us something about you',
            dob:'X/XX/XXXX',
            blockedUsers: ["No Blocked Users"],
            avatarbutton:"Change Avatar",
            closebutton:"Close Account",
            firstname: "",
            lastname: "",
            favoritecolor: "",
            responseMessage: "",
            prof: profilepicture
    };
    this.handleClick = this.handleClick.bind(this)
    this.changeCloseButton = this.changeCloseButton.bind(this);
    this.changeCloseButtonBack = this.changeCloseButtonBack.bind(this);
    this.fieldChangeHandler.bind(this);
    this.displayProfilePic = this.displayProfilePic.bind(this);
    this.uploadProfileImage = this.uploadProfileImage.bind(this);

  }

  fieldChangeHandler(field, e) {
    this.setState({
      [field]: e.target.value
    });
  }


  componentDidMount() {

    // first fetch the user data to allow update of username
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

            this.setState({
              // IMPORTANT!  You need to guard against any of these values being null.  If they are, it will
              // try and make the form component uncontrolled, which plays havoc with react
              username: result.username || "",
              firstname: result.firstName || "",
              lastname: result.lastName || ""

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
       console.log(result)
       if (result.role == ""){
         document.getElementById("profilepic").src = "./prof.png"
       }else{
       var server = process.env.REACT_APP_API_PATH.slice(0, -4) + "/";
       console.log(result.role)
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

  submitHandler = event => {
    //keep the form from actually submitting
    event.preventDefault();

    //make the api call to the user controller
    fetch(process.env.REACT_APP_API_PATH+"/users/"+sessionStorage.getItem("user"), {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ sessionStorage.getItem("token")
      },
      body: JSON.stringify({

        username: this.state.username,

      })
    })
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            responseMessage: result.Status
          });
        },
        error => {
          alert("error!");
        }
      );

    let url = process.env.REACT_APP_API_PATH+"/user-preferences";
    let method = "POST";

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

  handleClick(){
    // Changing state
      if(document.getElementById('username').value != "") {
          this.setState({username: document.getElementById('username').value});
          document.getElementById('username').value = '';
      }
      if(document.getElementById('password').value != "") {
          this.setState({password: document.getElementById('password').value})
          document.getElementById('password').value = ''
      }
      if(document.getElementById('email').value != "") {
          this.setState({email: document.getElementById('email').value});
          document.getElementById('email').value = '';
      }
      if(document.getElementById('bio').value != "") {
          this.setState({bio: document.getElementById('bio').value})
          document.getElementById('bio').value = ''
      }
      if(document.getElementById('dob').value != "") {
          this.setState({dob: document.getElementById('dob').value})
          document.getElementById('dob').value = ''
      }

      if(document.getElementById('blocked').value != "") {
          if (this.state.blockedUsers[0] == "No Blocked Users"){
              this.setState({blockedUsers: [document.getElementById('blocked').value]})
          }else{
              this.setState({blockedUsers: [...this.state.blockedUsers ," ", document.getElementById('blocked').value]})
          }
          document.getElementById('blocked').value = ''
      }
  }
   changeCloseButton(){
      this.setState({closebutton:"Feature Coming Soon"})
  }
  changeCloseButtonBack(){
      this.setState({closebutton:"Close Account"})
  };

  render() {
    const LoginFormStyle = {
      width: "96%",
      height: "3em"
    };
      return (
          <form onSubmit={this.submitHandler} className="profileform">
        <div id="Login">
             <Link to="/profile">
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
            <input id="password" style={LoginFormStyle} type="password" placeholder={"Password: XXXXXXXX"} />
          </div>
            <div id="ProfileInput">
            <input id="email" style={LoginFormStyle} type="text" placeholder={"Email: "+this.state.email}/>
          </div>
            <a id="ProfileHeading">Social Information</a>
            <div id="ProfileInput">
            <input id="bio" style={LoginFormStyle} type="text" placeholder={"Short Bio: "+this.state.bio}/>
          </div>
          <div id="ProfileInput">
            <input id="dob" style={LoginFormStyle} type="text" placeholder={"Date of Birth: "+this.state.dob}/>
          </div>
            <a id="ProfileHeading">Blocked Users</a>
            <div id="BlockedResults">
            <p>{this.state.blockedUsers}</p>
            </div>
          <div id="ProfileInput">
            <input id="blocked" style={LoginFormStyle} type="text" placeholder={"Block: Johe Doe"}/>
          </div>

            <div className='container'>
                <Link to="/privacy-settings"><button>Privacy Settings</button></Link>
                <button onClick={this.handleClick} input type="submit" value="save" >Save</button>
                <button onMouseLeave={this.changeCloseButtonBack} onMouseOver={this.changeCloseButton}>{this.state.closebutton}</button>
            </div>

            <Link to="/profile">
            <img id="settingslogo" src={logo}></img>
            </Link>
        </div>
        {this.state.responseMessage}
      </form>
      );
  }
}
