import React from "react";
import "../App.css";
import CanvasJSReact from '../canvasjs-3.2.11/canvasjs.react';
import { Link } from 'react-router-dom';
import committiilogo from "../assets/logo.svg";
import backarrow from "../assets/back_arrow.svg";
import create_message from "../assets/compose.png";
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
var i = -1;

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      messages: [],
      authors: [],
      currentauthor: "",
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
              authors: uniqueItems
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
      i += 1;
      console.log(this.state.currentauthor)
   return (
    <div class = "messageFeed">
      <div class = "messageInd">
        <p class="likeButton">{post}</p>
        <Link to="/messagedetails"><button class="viewMessage" onClick={() => this.funt1(post)}>View Message</button> </Link>
      </div>
    </div>
   )

  }

  funt1(post){
      sessionStorage.setItem("currentauthor",post)

      fetch(process.env.REACT_APP_API_PATH+"/users?email="+post, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem("token")
      }

    })
      .then(res => res.json())
      .then(
        result => {
          if (result) {

            //result[0].forEach(element => {if (element.username){names.push(element)}});

             sessionStorage.setItem("currentauthorID",result[0][0].id)

            //console.log(result[0][0].id);
            console.log("EMAILID");
            console.log(result[0][0].id);
          }
        },
        error => {
          alert("error!");
        }
      )
  }




  render() {
    const {authors, currentauthor} = this.state;
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
                <p className="feedProfile6"> Compose New Message  </p>
                <button className="feedSort2"><Link to="/createmessage">
                    <img id="create_message" src={create_message}></img>
                </Link></button>
            </div>

          <p class="feedProfile4">Messages</p>

        </div>

        {this.state.authors.map(authors => this.createPost(authors))}
      </div>

    );
  }
}