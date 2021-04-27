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
    Redirect, useHistory
} from 'react-router';
//import Autocomplete from "./Autocomplete.jsx";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class Register extends React.Component {
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
      poll_option_1: "",
      poll_option_2: "",
      vote_first: 0,
      vote_second: 0,
      redir: false
    };
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

  createPost(post) {
    let contentData = post.content.split(",");

    let votes1 = contentData[2].split(":")[1].split('-');
    let votes2 = contentData[3].split(":")[1].split('-');
    let votes = (votes1.length-1) + (votes2.length-1);

    let comments = post.commentCount;
    let id = "pollpage/" + post.id.toString();

    CanvasJS.addColorSet("gray_color",
    ["#acacac"]);
    const options = {
        responsive: true,
        maintainAspectRation: false,
        axisY: {interval: 1, labelFontSize: 15},
        axisX: {labelFontSize: 16},
        width: window.innerWidth / 3,
        height: 245,
        colorSet: "gray_color",
        title: {
        text: ""
        
      },
      data: [{				
                type: "column",
                dataPoints: [
                    { label: contentData[0].split(":")[1].trim(), y: votes1.length-1 },
                    { label: contentData[1].split(":")[1].trim(), y: votes2.length-1 },
                ]
       }]
   }
   return (
    <div class = "feedPosts">
      <div class = "post">
        <p class="likeButton">{votes} Vote(s)</p>
        <Link to="/pollpage"><button class="commentButton">{comments} Comments</button></Link>
        <Link to={id}><button class="postButton">View Post</button></Link>
        <div class="chart">
          <CanvasJSChart options = {options}></CanvasJSChart>
        </div>
      </div>
    </div>
   )

  }

  render() {
    CanvasJS.addColorSet("gray_color",
    ["#acacac"]);
    return (
      
      <div class = "feed">
        <Link to="/feed">
          <img id="committii-logo" src={committiilogo}></img>
        </Link>

        <div class="feedOptions">
          <div class="vLeft">

            <button class="feedSort">Sort</button>
          </div>
          <div class="vRight">
            <button class="feedMessages">Messages</button>
          </div>
          
          <Link to={"/profile/"+sessionStorage.getItem("user")}><button class="feedProfile">Profile</button></Link>
        </div>

        {this.state.posts.map(post => this.createPost(post))}

        <Link to="/createpoll"><button class="poll_button">Create Poll</button></Link>
      </div>
      
    );
  }
}