import React from "react";
import "../App.css";
import CanvasJSReact from '../canvasjs-3.2.11/canvasjs.react';
import { Link } from 'react-router-dom';
import committiilogo from "../assets/logo.svg";
import backarrow from "../assets/back_arrow.svg";
import prof_pic from "../assets/profile-picture-holder.png";
import hearticon from "../assets/heart-icon.svg";
import Post from "./Post.jsx";

import {
    Redirect
} from 'react-router';
//import Autocomplete from "./Autocomplete.jsx";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      username: "",
      password: "",
      confirm: "",
      listType: props.listType,
      alanmessage: "",
      errormessage: "",
      sessiontoken: "",
      redir: false,
      ShowSearch: false
    };
    this.showMenu = this.showMenu.bind(this)
    this.fieldChangeHandler = this.fieldChangeHandler.bind(this)
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

  loadPosts() {
    let url = process.env.REACT_APP_API_PATH+"/posts?ParentID="+sessionStorage.getItem("user");
    // /posts/1
    if (this.props && this.props.parentid){
      url += this.props.parentid;
    }
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

  createPost(post) {
    let content = post.content.split("vs.");
    let likes = 0;
    let comments = post.commentCount;
    let id = "pollpage/" + post.id.toString();

    if (content.length < 2) {
      content[0] = "Undefined"
      content[1] = "Undefined"
    }

    CanvasJS.addColorSet("gray_color",
    ["#acacac"]);
    const options = {
        responsive: true,
        maintainAspectRation: false,
        axisY: {interval: 1, labelFontSize: 15},
        axisX: {labelFontSize: 16},
        width: 600,
        height: 245,
        colorSet: "gray_color",
        title: {
        text: ""

      },
      data: [{
                type: "column",
                dataPoints: [
                    { label: content[0].trim(), y: Math.floor(Math.random() * 10) },
                    { label: content[1].trim(), y: Math.floor(Math.random() * 10)  },
                ]
       }]
   }
   if (JSON.parse(post['type'])["images"].length == 0){
   return (
    <div class = "feedPosts">
      <div class = "post">
        <p class="likeButton">{likes} Likes</p>
        <Link to="/pollpage"><button class="commentButton">{comments} Comments</button></Link>
        <Link to={id}><button class="postButton">View Post</button></Link>
        <div class="chart">
          <CanvasJSChart options = {options}></CanvasJSChart>
        </div>
      </div>
    </div>
   )
 }else{
   console.log(JSON.parse(post['type'])["images"])
   let image1 = JSON.parse(post['type'])["images"][0]
   let image2 = JSON.parse(post['type'])["images"][1]
   return(
   <div class = "feedPosts">
     <div class = "post">
       <p class="likeButton">{likes} Likes</p>
       <Link to="/pollpage"><button class="commentButton">{comments} Comments</button></Link>
       <Link to={id}><button class="postButton">View Post</button></Link>
       <div class="chart">
         <CanvasJSChart options = {options}></CanvasJSChart>
       </div>
          <img src={image1} id='image1'></img>
          <img src={image2} id='image2'></img>
     </div>
   </div>
 )
 }

  }
  fieldChangeHandler(field, e) {
    var sortedPost = Array()
    for (var post in this.state.posts){
      var tag = JSON.parse(this.state.posts[post]['type'])
      if (tag["tag"] == e.target.value){
        sortedPost.push(this.state.posts[post])
      }
    }
    if (sortedPost.length != 0){
      this.setState({
        posts: sortedPost
      })
  }
  if (e.target.value == ""){
    this.loadPosts()
  }
  }

  showMenu(event){
    this.setState({
      ShowSearch: !this.state.ShowSearch
    });
  }

  render() {
    const {posts} = this.state;
    CanvasJS.addColorSet("gray_color",
    ["#acacac"]);
    const options = {
        responsive: true,
        maintainAspectRation: false,
        axisY: {interval: 1, labelFontSize: 15},
        axisX: {labelFontSize: 16},
        width: 600,
        height: 245,
        colorSet: "gray_color",
        title: {
        text: ""

      },
      data: [{
                type: "column",
                dataPoints: [
                    { label: "Dogs",  y: 2  },
                    { label: "Cats", y: 4  },
                ]
       }]
   }
    return (


      <div class = "feed">
      <div className="navbar">
        <Link to="/feed">
          <cz id="MicImage">
            <img src="Images/committii logo.JPG"></img>
            <c>COMMITTII</c>
          </cz>
        </Link>
        <div class="feedOptions">
          <div class="vLeft">
            <button class="feedSort" onClick={this.showMenu}>Sort</button>
            {
            this.state.ShowSearch
            ? (
              <div id="searchdropdown">
                <input id="search"
                    type="text"
                    placeholder={"Enter Tag"}
                    onChange={e => this.fieldChangeHandler("search", e)}>
                  </input>
                </div>
            ): (null)
          }
          </div>
          <div class="vRight">
            <button class="feedMessages">Messages</button>
          </div>

          <Link to="/profile"><button class="feedProfile">Profile</button></Link>
        </div>
      </div>

        <div id="listposts">
          {this.state.posts.map(post => this.createPost(post))}
        </div>

        <Link to="/createpoll"><button class="poll_button">Create Poll</button></Link>
      </div>

    );
  }
}
