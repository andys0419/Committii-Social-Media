import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import "./profile-page.css";
import "./profilesettings.css";
import prof from "./prof.png";
import logo from "../assets/logo.svg";
import backarrow from "../assets/back_arrow.svg";
import Post from "./Post";
import committiilogo from "../assets/logo.svg";



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
            posts: [],
            art: []
    };
    this.handleClick = this.handleClick.bind(this)
      this.changeAvatarButton = this.changeAvatarButton.bind(this);
    this.changeAvatarButtonBack = this.changeAvatarButtonBack.bind(this);
    this.changeCloseButton = this.changeCloseButton.bind(this);
    this.changeCloseButtonBack = this.changeCloseButtonBack.bind(this);
    this.fieldChangeHandler.bind(this);
    this.deleteaction = this.deleteaction.bind(this);
    this.loadPosts = this.loadPosts.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.deleteArt = this.deleteArt.bind(this);
    this.deleteAll = this.deleteAll.bind(this);


  }

  fieldChangeHandler(field, e) {
    console.log("field change");
    this.setState({
      [field]: e.target.value
    });
  }

  loadPosts() {
    let url = process.env.REACT_APP_API_PATH+"/posts?authorID="+sessionStorage.getItem("user");
    url += "&type=post";

    fetch(url, {
      method: "get",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem("token")
      },

    })
      .then(res => res.json())
      .then(
        result => {
          if (result) {
            this.setState({
              isLoaded: true,
              posts: result[0]
            });
            console.log("Got Posts");
          }
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
          console.log("ERROR loading Posts")
        }
      );


    fetch(process.env.REACT_APP_API_PATH+"/user-artifacts?ownerID="+sessionStorage.getItem("user"), {
      method: "get",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem("token")
      },

    })
      .then(res => res.json())
      .then(
        result => {
          if (result) {
            let arr = []
            for (let k of result[0]){
                arr.push(k.id)
            }
                this.setState({
                     isLoaded: true,
                     art: arr
            })
            console.log("Got Artfinal");
            console.log(this.state.art);

          }
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
          console.log("ERROR loading Posts")
        }
      );
  }

  componentDidMount() {
    this.loadPosts();
    console.log("In profile");
    console.log(this.props);

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
          if (result) {
            console.log(result);

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
            console.log(result);
            let favoritecolor = "";

            // read the user preferences and convert to an associative array for reference



            console.log(favoritecolor);


          }
        },
        error => {
          alert("error!");
        }
      );
  }

  submitHandler = event => {
    //keep the form from actually submitting
    event.preventDefault();

    //make the api call to the user controller
    fetch(process.env.REACT_APP_API_PATH+"/users/"+sessionStorage.getItem("user"), {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem("token")
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



    //make the api call to the user prefs controller



  }
  ///////////////

    deleteaction2(){
    //make the api call to the user controller
    fetch(process.env.REACT_APP_API_PATH+"/users/"+sessionStorage.getItem("user"), {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem("token")
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



    //make the api call to the user prefs controller

  }


  ///

  deleteaction(userID){
    //make the api call to post
    fetch(process.env.REACT_APP_API_PATH+"/users/"+sessionStorage.getItem("user"), {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem("token")
      }
      })

  }

  /////

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

  changeAvatarButton(){
      this.setState({avatarbutton:"Feature Coming Soon"})
  }
  changeAvatarButtonBack(){
      this.setState({avatarbutton:"Change Avatar"})
  }
   changeCloseButton(){
      this.setState({closebutton:"Feature Coming Soon"})
  }
  changeCloseButtonBack(){
      this.setState({closebutton:"Close Account"})
  };


  deletePost(postID) {
    //make the api call to post
    fetch(process.env.REACT_APP_API_PATH+"/posts/"+postID, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem("token")
      }
      })
      .then(
        result => {
          this.loadPosts();
        },
        error => {
          alert("error!"+error);
        }
      );
  }


  deleteArt(artID) {
    //make the api call to post
    fetch(process.env.REACT_APP_API_PATH+"/user-artifacts/"+artID, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem("token")
      }
      })
      .then(
        result => {
          this.loadPosts();
        },
        error => {
          alert("error!"+error);
        }
      );
  }

  deleteAll() {
    //make the api call to post
    for (let x of this.state.posts) {
        console.log(x[0]);
        console.log(x.id);
        this.deletePost(x.id)
}
    for (let p of this.state.art){
        console.log(p);
        this.deleteArt(p);
       }
  }

  render() {
      const {error, isLoaded, posts} = this.state;
      if (posts.length > 0){
      return (
                   <div id="Login">
            <Link to="/profilesettings">
                <img id="backarrow" src={backarrow}></img>
            </Link>
          <a id="HeaderLabel">Are you sure you want to close your account?</a>
            <a id="ProfileHeading">This action cannot be undone and all data associated with your account will be deleted. Would you like to proceed?</a>
                <Link to="/closeaccountfeedback"><button>Yes, Close My Account</button></Link>
                <Link to="/profilesettings"><button>No, Take Me Back</button></Link>
                       <button onClick={this.deleteAll()}></button>

            <Link to="/profile">
            <img id="settingslogo" src={logo}></img>
            </Link>


              <div className="space">
                  <p>.</p>
              </div>
          </div>

      );
    }
    else {
      return (
           <div id="Login">
            <Link to="/profilesettings">
                <img id="backarrow" src={backarrow}></img>
            </Link>
          <a id="HeaderLabel">Are you sure you want to close your account?</a>
            <a id="ProfileHeading">This action cannot be undone and all data associated with your account will be deleted. Would you like to proceed?</a>
                <Link to="/closeaccountfeedback"><button>Yes, Close My Account</button></Link>
                <Link to="/profilesettings"><button>No, Take Me Back</button></Link>

            <Link to={"/profile/"+sessionStorage.getItem("user")}>
            <img id="settingslogo" src={logo}></img>
            </Link>
        </div>
      )}
    const LoginFormStyle = {
      width: "96%",
      height: "3em"
    };

  }
}