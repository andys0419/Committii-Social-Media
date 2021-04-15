import React from "react";
import Post from "./Post.jsx";
import CanvasJSReact from '../canvasjs-3.2.11/canvasjs.react';
import { Link } from 'react-router-dom';
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
    this.state = {
      error: null,
      isLoaded: false,
      posts: [],
      listType: props.listType,
      username: 'User',
      email: '',
      following: 0,
      followers: 0,
    };
    this.postingList = React.createRef();
    this.loadPosts = this.loadPosts.bind(this);
    this.displayProfilePic = this.displayProfilePic.bind(this);
  }

  componentDidMount() {
    this.loadPosts();
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
           console.log(result)
           if (result.role == ""){
             document.getElementById("prof_pic").src = prof_pic
           }else{
           var server = "https://webdev.cse.buffalo.edu"
           console.log(server + result.role)
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
        <div className="posts">
          {posts.map(post => (
            <Post key={post.id} post={post} type={this.props.type} loadPosts={this.loadPosts}/>
          ))}
        <img src={this.displayProfilePic()} id="prof_pic" alt="logo" />
        <div class="welcome_id">
        <p id="welcome">Hello, {this.state.username}</p>
        </div>
        <p id="following">{this.state.following} Following</p>
        <p id="followers">{this.state.followers} Followers</p>

        <Link to="/profilesettings"><button id="edit_prof">Edit Profile</button></Link>
        <Link to="/privacy-settings"><button id="edit_priv">Privacy Settings</button></Link>
        <Link to="/feed">
          <img id="committii-logo" src={committiilogo}></img>
        </Link>
        <Link to="/createpoll"><button class="create_poll_button">Create Poll</button></Link>
        <div class="white_box">
          <div class="current_polls">
            <p id="curr_polls_label">Current Polls:</p>
            {/* <p id="poll1">Dogs vs. Cats</p>
            <button id="del_post">Delete</button> */}
          </div>
          <Link to="/"><button id="logout_button" onClick={()=>{this.clearState()}}>Log Out</button></Link>
        </div>
        <div class="space">
          <p>.</p>
        </div>
        </div>
      );
    }
    else {
      return (
        <div className="posts">
          {posts.map(post => (
            <Post key={post.id} post={post} type={this.props.type} loadPosts={this.loadPosts}/>
          ))}
        <img src={this.displayProfilePic()} id="prof_pic" alt="logo" />
        <div class="welcome_id">
          <p id="welcome">Hello, {this.state.username}</p>
        </div>
        <p id="following">{this.state.following} Following</p>
        <p id="followers">{this.state.followers} Followers</p>

        <Link to="/profilesettings"><button id="edit_prof">Edit Profile</button></Link>
        <Link to="/privacy-settings"><button id="edit_priv">Privacy Settings</button></Link>
        <Link to="/">
          <img id="committii-logo" src={committiilogo}></img>
        </Link>
        <Link to="/createpoll"><button class="create_poll_button">Create Poll</button></Link>
        <div class="white_box">
          <div class="current_polls">
            <p id="curr_polls_label">Current Polls:</p>
          </div>
          <Link to="/"><button id="logout_button" onClick={()=>{this.clearState()}}>Log Out</button></Link>
        </div>
        <div class="space">
          <p>.</p>
        </div>
        </div>
      )}
  }
}
}
