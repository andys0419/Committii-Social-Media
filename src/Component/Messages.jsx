import React from "react";
import "../App.css";
import CanvasJSReact from '../canvasjs-3.2.11/canvasjs.react';
import { Link } from 'react-router-dom';
import committiilogo from "../assets/logo.svg";
import backarrow from "../assets/back_arrow.svg";
import create_message from "../assets/create_message.png";
import prof_pic from "../assets/profile-picture-holder.png";
import hearticon from "../assets/heart-icon.svg";
import Post from "./Post.jsx";

import {
    Redirect
} from 'react-router';
import CommentLayout from "./CommentLayout";
//import Autocomplete from "./Autocomplete.jsx";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      messages: [],
      username: "",
      password: "",
      confirm: "",
      listType: props.listType,
      alanmessage: "",
      errormessage: "",
      sessiontoken: "",
      redir: false,
      email: sessionStorage.getItem("username")
    };
  }

  componentDidMount() {
    this.loadPosts();
    fetch(process.env.REACT_APP_API_PATH + "/messages?recipientUserID="+sessionStorage.getItem("user"), {
      method: "get",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem("token")
      }
    })
      .then(res => res.json())
      ;
  }

  loadPosts() {
    let url = process.env.REACT_APP_API_PATH+"/messages?recipientUserID="+sessionStorage.getItem("user");
    // /posts/1
    if (this.props && this.props.parentid){
      url += this.props.parentid;
    }
    fetch(url, {
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
            let resultarr = result[0].map(a => a.author.email);
            let uniqueItems = [...new Set(resultarr)]
            console.log(uniqueItems)
            this.setState({
              isLoaded: true,
              messages: uniqueItems
            });
            ;
            console.log("Got Messages");
            console.log(result[0]);
          }
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
          console.log("ERROR loading Messages")
        }
      );
  }

  createPost(post) {
   return (
    <div class = "messageFeed">
      <div class = "messageInd">
        <p class="likeButton">{post}</p>
        <Link to="/messagedetails">><button class="viewMessage">View Message</button></Link>
      </div>
    </div>
   )

  }

  render() {
    const {messages} = this.state;
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
            <div className="vRight">
                <button className="feedSort"><Link to="/createmessage">
                    <img id="create_message" src={create_message}></img>
                </Link></button>
            </div>

          <Link to="/profile"><button class="feedProfile2">Messages for {this.state.email}</button></Link>

        </div>

        {this.state.messages.map(messages => this.createPost(messages))}
      </div>

    );
  }
}