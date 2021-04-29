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
      isCurrentUser: userid === sessionStorage.getItem("user")
    };
    this.postingList = React.createRef();
    this.loadPosts = this.loadPosts.bind(this);
    this.displayProfilePic = this.displayProfilePic.bind(this);
  }

  componentDidMount() {
    this.loadFollowing();
    this.loadFollowers();
    this.loadPosts();
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
            <Link to="/privacy-settings"><button id="edit_priv">Privacy Settings</button></Link>
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
            <button id="follow_button">Follow {this.state.username}</button>
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
              following: result[0].length
            });
          }
        },
        error => {
          this.setState({
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
    
  

  loadPosts() {
    let url = process.env.REACT_APP_API_PATH+"/posts?authorID="+this.state.userid;
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

  displayProfilePic() {
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
           console.log(result)
           if (result.role == ""){
             document.getElementById("prof_pic").src = prof_pic
           }else{
           var server = process.env.REACT_APP_API_PATH.slice(0, -4) + "/";
           console.log(result.role)
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
