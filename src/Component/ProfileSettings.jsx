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
    this.handleClick = this.handleClick.bind(this)
    this.changeCloseButton = this.changeCloseButton.bind(this);
    this.changeCloseButtonBack = this.changeCloseButtonBack.bind(this);
    this.fieldChangeHandler.bind(this);

    this.fieldChangeHandler2.bind(this);
    this.fieldChangeHandler3.bind(this);
    this.fieldChangeHandler4.bind(this);
    this.fieldChangeHandler5.bind(this);
    this.fieldChangeHandler6.bind(this);

    this.displayProfilePic = this.displayProfilePic.bind(this);
    this.uploadProfileImage = this.uploadProfileImage.bind(this);

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

  submitHandler = async (event) =>  {
    //keep the form from actually submitting
    event.preventDefault();
    console.log(this.state.privacy)
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
            privacy: this.state.privacy

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


  handleClick(){
    // Changing state


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
          <div id="ProfileInput">
            <input id="dob" style={LoginFormStyle} type="text" placeholder={"Date of Birth: "+this.state.lastName} onChange={e => this.fieldChangeHandler5("lastName", e)}
            value={this.state.lastName}/>
          </div>
          <a id="ProfileHeading">Privacy Settings</a>
            <div id="ProfileInput">
            <Checkbox id="checkA" value={this.state.privacy} onChange={e => this.fieldChangeHandler6("privacy", e)}/>
            <a id="ProfileSub"> Only show posts from followed users?</a>
          </div>
          


            <div className='container'>
                <Link to="/forgotpassword"><button>Change Password</button></Link>
                <Link to="/privacy-settings"><button>Privacy Settings</button></Link>
                <button onClick={this.submitHandler} input type="submit" value="save" >Save</button>
                <Link to="/closeaccount"><button>Close Account</button></Link>
            </div>

            <Link to={"/profile/"+sessionStorage.getItem("user")}>
            <img id="settingslogo" src={logo}></img>
            </Link>
        </div>
        {this.state.responseMessage}
      </form> );


  }
}
