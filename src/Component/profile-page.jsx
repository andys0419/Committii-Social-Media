import React from "react";
import Post from "./Post.jsx";
import CanvasJSReact from '../canvasjs-3.2.11/canvasjs.react';
import { Link, useHistory, useParams  } from 'react-router-dom';
import "./poll-page.css";
import committiilogo from "../assets/logo.svg";
import backarrow from "../assets/back_arrow.svg";
import prof_pic from "../assets/profile-picture-holder.png";
import hearticon from "../assets/heart-icon.svg";
import CommentForm from "./CommentForm.jsx";
import helpIcon from "../assets/delete.png";
import commentIcon from "../assets/comment.svg";
import "./PostingList.css";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class PostingList extends React.Component {
  constructor(props) {
    super(props);
    let { userid } = this.props.match.params;
    this.state = {
      error: null,
      isLoaded: false,
      posts: [],
      listType: props.listType,
      username: 'User',
      email: '',
      following: 0,
      followers: 0,
      userid: userid,
      isCurrentUser: userid === sessionStorage.getItem("user"),
      follow_text: 'Follow Member'
    };
    this.postingList = React.createRef();
    this.loadPosts = this.loadPosts.bind(this);
    this.displayProfilePic = this.displayProfilePic.bind(this);
    this.showUserButtons = this.showUserButtons.bind(this);
    this.createFollow = this.createFollow.bind(this);
  }

  componentDidMount() {
    this.loadFollowing();
    this.loadFollowers();
    this.loadPosts();
    this.checkIsFollowing();
    fetch(process.env.REACT_APP_API_PATH+"/users/"+this.state.userid, {
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
              email: result.email || "",
              //lastname: result.lastName || ""

            });
          }
        },
        error => {
          alert("error!");
        }
      );
  }

  componentDidUpdate(prevProps) {
    console.log("PrevProps "+prevProps.refresh);
    console.log("Props "+this.props.refresh);
    if (prevProps.refresh !== this.props.refresh){
      this.loadPosts();
    }
  }

  showUserButtons() {
    if (this.state.isCurrentUser) {
      return (
        <header class="white_box_header">
          <div class="follow_info">
            <Link to={this.state.userid + "/following"}><button id="following">{this.state.following} Following</button></Link>
            <Link to={this.state.userid + "/followers"}><button id="followers">{this.state.followers} Followers</button></Link>
          </div>
          <div class="profile_settings">
            <Link to="/profilesettings"><button id="edit_prof">Edit Profile</button></Link>
          </div>
          <div class="create_poll_div">
            <Link to="/createpoll"><button class="create_poll_button">Create Poll</button></Link>
          </div>
          <div class="logout_botton_id">
          <Link to="/"><button id="logout_button" onClick={()=>{this.clearState()}}>Log Out</button></Link>
          </div>  
        </header>   
      )
    }
    else {
      return (
        <header class="white_box_header">
          <div class="follow_info">
            <Link to={this.state.userid + "/following"}><button id="following">{this.state.following} Following</button></Link>
            <Link to={this.state.userid + "/followers"}><button id="followers">{this.state.followers} Followers</button></Link>
          </div>
          <div class="follow_button_class">
            <button id="follow_button" onClick={()=>this.createFollow()}>{this.state.follow_text}</button>
          </div>
        </header>   
      )
    }

  }

  loadFollowing() {

    fetch(process.env.REACT_APP_API_PATH+"/connections?userID="+this.state.userid+"&type=isFollowing&status=active", {
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
            this.setState({
              isLoaded: true,
              following: result[0].length
            });
          }
        },
        error => {
          this.setState({
            isLoaded: true,
            following: 0
          });
        }
      );
  }
  
  loadFollowers() {
      fetch(process.env.REACT_APP_API_PATH+"/connections?userID="+this.state.userid+"&type=follower&status=active", {
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
              this.setState({
                followers: result[0].length
              });
            }
          },
          error => {
            this.setState({
              followers: 0
            });
          }
        ); 
  }

  checkIsFollowing() {

    /* Check the following status - is the visiting member a follower? */

    fetch(process.env.REACT_APP_API_PATH+"/connections?userID="+this.state.userid+ "&connectedUserID=" +sessionStorage.getItem("user")+ "&type=follower&status=active", {
      method: "get",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(
        result => {

          if (result[0].length > 0) {
            console.log("There is a follow!")

            this.setState({
              follow_text: 'Unfollow Member'
            });
          } 
          
          else {
            this.setState({
              follow_text: 'Follow Member'
            });
          }
        },
      );
}
  
  createFollow = (e) => {

    /* First thing to do is check the following status - is the visiting member a follower? */

    fetch(process.env.REACT_APP_API_PATH+"/connections?userID="+this.state.userid+ "&connectedUserID=" +sessionStorage.getItem("user")+ "&type=follower&status=active", {
      method: "get",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(
        result => {

          let isFollowing = false;
          let followID = -1;

          if (result[0].length > 0) {
            console.log("There is a follow!")

            isFollowing = true;
            followID = result[0][0].id;

            console.log(isFollowing);
            console.log(followID);

            console.log("Visiting member wants to unfollow!")

            fetch(process.env.REACT_APP_API_PATH+"/connections/"+  followID, {
              method: "PATCH",
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+sessionStorage.getItem("token")
              },
              body: JSON.stringify({
                status: "unfollow"
              })
            })
              .then(res => res.json())
              .then(
                result => {
                  console.log("Successfully unfollowed!")
                  this.setState({
                    follow_text: 'Follow Member'
                  });
                  this.state.follow_text = 'Follow Member';
                  // window.location.reload();
                },
                _error => {
                  alert("An errored occured while trying to unfollow!");
                }
              );

              fetch(process.env.REACT_APP_API_PATH+"/connections?userID="+sessionStorage.getItem("user")+ "&connectedUserID=" +this.state.userid+ "&type=isFollowing&status=active", {
                method: "get",
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer '+sessionStorage.getItem("token")
                }
              }) 
                .then(res => res.json())
                .then(
                  result => {
                    console.log("Attempting to update following count!")
                    
                    followID = result[0][0].id;

                    fetch(process.env.REACT_APP_API_PATH+"/connections/"+  followID, {
                      method: "PATCH",
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+sessionStorage.getItem("token")
                      },
                      body: JSON.stringify({
                        status: "not_active"
                      })
                    })
                    .then(res => res.json())
                    .then(
                      result => {
                        console.log("Successfully updated following count!")
                        window.location.reload();
                      },
                      _error => {
                        alert("An errored occured while updating following count!");
                      }
                    );

                  },
                  _error => {
                    alert("An errored occured while trying to update following count!");
                  }
                );

          }

          else {
            /* If the member visiting is not following, and wants to follow */
            
            console.log("Visiting member is not already following this user!")

             /* Grab the userID of the member profile being viewed, and use this ID to add the follower of the visiting userID */
            fetch(process.env.REACT_APP_API_PATH+"/connections", {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+sessionStorage.getItem("token")
              },
              body: JSON.stringify({
                userID: this.state.userid,
                connectedUserID: sessionStorage.getItem("user"),
                type: "follower",
                status: "active"
              })
            })
              .then(res => res.json())
              .then(
                result => {
                  console.log("Follow created successfully!")
                  this.setState({
                    follow_text: 'Unfollow Member'
                  });
                  this.state.follow_text = 'Unfollow Member';
                  window.location.reload();
                },
                _error => {
                  alert("An errored occured while trying to follow!");
                  window.location.reload();
                }
              );
            
            /* Update the following count of the visiting member */
            fetch(process.env.REACT_APP_API_PATH+"/connections", {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+sessionStorage.getItem("token")
              },
              body: JSON.stringify({
                userID: sessionStorage.getItem("user"),
                connectedUserID: this.state.userid,
                type: "isFollowing",
                status: "active"
              })
            })
              .then(res => res.json())
              .then(
                result => {
                  console.log("Updated visiting member following!")
                },
                _error => {
                  alert("An errored occured while trying to follow!");
                }
              );
            }
        },
      ); 
    }

  loadPosts() {
    let url = process.env.REACT_APP_API_PATH+"/posts?type=post&authorID="+this.state.userid;

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
  }

  clearState = (e) => {
    this.setState({
      username: "User",
      following: 0,
      followers: 0
    })

    sessionStorage.setItem("token", "");
    sessionStorage.setItem("user", "User");
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
         document.getElementById("prof_pic").src = prof_pic
       }else{
       var server = "https://webdev.cse.buffalo.edu"

       document.getElementById("prof_pic").src = server + result.role
     }
     })
  }

  render() {
    const {error, isLoaded, posts} = this.state;

    if (error) {
      return <div> Error: {error.message} </div>;
    } else if (!isLoaded) {
      return <div> Loading... </div>;
    } else if (posts) {
      
      if (posts.length > 0){
      return (
        <div class="ProfilePage">
          <header>
            <Link to="/feed">
              <img id="committii-logo" src={committiilogo}></img>
              <div className="nav_bar">
                <Link to="/"><text id="nav_feed">Home</text></Link>
                <Link to="/feed"><text id="nav_home">Feed</text></Link>
                <Link to={"/profile/"+sessionStorage.getItem("user")}><text id="nav_profile">Profile</text></Link>
                <Link to="/profilesettings"><text id="nav_settings">Settings</text></Link>
              </div>
            </Link>
            <div class="profile_pic_id">
              <img src={this.displayProfilePic()} className="prof_pic" alt="Profile Picture" id="prof_pic"/>
            </div>
            <div class="welcome_id">
              <p id="welcome">
                {this.state.isCurrentUser
                  ? 'Hello, ' + this.state.username
                  : 'Welcome to ' + this.state.username + '\'s page!'
                }
              </p>
            </div>
          </header>
          <div class="white_box">
            {this.showUserButtons()}
            <div class="polls_label_id">
              <p id="polls_label">Polls</p>
            </div>
            <div>
              {posts.map(post => (
                <Post key={post.id} post={post} type={this.props.type} loadPosts={this.loadPosts}/>))}
            </div>
          </div>
        </div>
      );
    }
    else {
      return (
        <div class="ProfilePage">
          <header>
            <Link to="/feed">
              <img id="committii-logo" src={committiilogo}></img>
              <div className="nav_bar">
                <Link to="/"><text id="nav_feed">Home</text></Link>
                <Link to="/feed"><text id="nav_home">Feed</text></Link>
                <Link to={"/profile/"+sessionStorage.getItem("user")}><text id="nav_profile">Profile</text></Link>
                <Link to="/profilesettings"><text id="nav_settings">Settings</text></Link>
              </div>
            </Link>
            <div class="profile_pic_id">
              <img src={this.displayProfilePic()} id="prof_pic" alt="logo" />
            </div>
            <div class="welcome_id">
              <p id="welcome">
                {this.state.isCurrentUser
                  ? 'Hello, ' + this.state.username
                  : 'Welcome to ' + this.state.username + '\'s page!'
                }
              </p>
            </div>
          </header>
          <div class="white_box">
            {this.showUserButtons()}
            <div class="polls_label_id">
              <p id="polls_label">Polls</p>
            </div>
            <div class="no_polls_id">
              {this.state.isCurrentUser
                ? <p id="no_polls">You have not created any Polls yet. <br></br>Create a new Poll with the 'Create Poll' button above!</p>
                : <p id="no_polls">This member currently does not have any Polls.</p>
              }
            </div>
          </div>
        </div>
      )}
  }
}
}
