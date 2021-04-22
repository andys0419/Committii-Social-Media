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
   return (
    <div class = "messageFeed">
      <div class = "messageInd">
        <p class="likeButton">John Doe</p>
        <Link to="/messagedetails">><button class="viewMessage">View Message</button></Link>
      </div>
    </div>
   )

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
        <Link to="/feed">
          <img id="committii-logo" src={committiilogo}></img>
        </Link>

        <div class="feedOptions">
          <div class="vLeft">
            <button class="feedSort"><Link to="/feed">
                <img id="backarrow" src={backarrow}></img>
            </Link></button>
          </div>

          <Link to="/profile"><button class="feedProfile">Messages</button></Link>
        </div>

        {this.state.posts.map(post => this.createPost(post))}

      </div>

    );
  }
}