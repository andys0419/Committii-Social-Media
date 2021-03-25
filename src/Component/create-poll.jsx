import React from "react";
import CanvasJSReact from '../canvasjs-3.2.11/canvasjs.react';
import { Link } from 'react-router-dom';
import "./create-poll.css";
import committiilogo from "../assets/logo.svg";
import backarrow from "../assets/back_arrow.svg";
import prof_pic from "../assets/profile-picture-holder.png";
import hearticon from "../assets/heart-icon.svg";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class ProfilePage extends React.Component {
  constructor() {
    super();

    this.state = {
        poll_option_1: "test",
        poll_option_2: "",
        poll_category: "",
        post_text: ''
    };
  }

  submitHandler = event => {

    //keep the form from actually submitting via HTML - we want to handle it in react
    event.preventDefault();

    //make the api call to post
    fetch(process.env.REACT_APP_API_PATH+"/posts", {
      method: "post",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem("token")
      },
      body: JSON.stringify({
        authorID: sessionStorage.getItem("user"),
        content: this.state.post_text,
        thumbnailURL: "",
        type: "post"
      })
    })
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            postmessage: result.Status
          });
          // once a post is complete, reload the feed
          this.postListing.current.loadPosts();
        },
        error => {
          alert("error!");
        }
      );
  };

  // this method will keep the current post up to date as you type it,
  // so that the submit handler can read the information from the state.
  fieldChangeHandler(field, e) {
    console.log("field change");
    this.setState({
      [field]: e.target.value
    });
  }


  render() {
    return (
      <div className="App">
          <Link to="/"><img id="comiti_logo" src={committiilogo}></img></Link>
          <Link to="/profile"><img id="create_backarrow" src={backarrow}></img></Link>
          <div class="create_poll_box">
            <p id="create_label">Create Poll</p>
            <input id="option_1_field"
                type="text"
                placeholder={" Option #1"}
                onChange={e => this.fieldChangeHandler("poll_option_1", e)}
            />
            <input id="option_2_field"
                type="text"
                placeholder={" Option #2"}
                onChange={e => this.fieldChangeHandler("poll_option_2", e)}
            />
            <input id="category_field"
                type="text"
                placeholder={" Category"}
                onChange={e => this.fieldChangeHandler("poll_category", e)}
            />
            <p id="new_poll_title">{this.state.poll_option_1} vs. {this.state.poll_option_2}</p>
            <p id="new_poll_category">Category: {this.state.poll_category}</p>
            <Link to="/pollpage"><button class="create_poll">Create Poll!</button></Link>
          </div>
      </div>
    );
  }
}