import React from "react";
import "../App.css";
import { Link } from 'react-router-dom';
import committiilogo from "../assets/logo.svg";
import backarrow from "../assets/back_arrow.svg";
import "./create-poll.css"
import {
  Redirect
} from 'react-router';

//The post form component holds both a form for posting, and also the list of current posts in your feed
export default class PostForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      postmessage: "",
      poll_option_1: "",
      poll_option_2: "",
      post_text: "",
      poll_category: "",
      vote_first: 0,
      vote_second: 0,
      likes: 0,
      redir: false,
    };
    this.postListing = React.createRef();
  }

  // the handler for submitting a new post.  This will call the API to create a new post.
  // while the test harness does not use images, if you had an image URL you would pass it
  // in the thumbnailURL field.
  submitHandler = event => {

    //keep the form from actually submitting via HTML - we want to handle it in react
    event.preventDefault();

    //make the api call to post
    let url = process.env.REACT_APP_API_PATH + "/posts";

    fetch(url, {
      method: "post",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem("token")
      },
      body: JSON.stringify({
        authorID: sessionStorage.getItem("user"),
        content: this.state.post_text,
        parentID: this.props.parent,
        thumbnailURL: "",
        type: "post"
      })
    })
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            postmessage: result.Status,
            redir: true
          });
          // once a post is complete, reload the feed
          //this.postListing.current.loadPosts();
        },
        error => {
          alert("error!");
        }
      );
  };

  // this method will keep the current post up to date as you type it,
  // so that the submit handler can read the information from the state.
  myChangeHandler = event => {
    this.setState({
      post_text: event.target.value
    });
  };

  fieldChangeHandler(field, e) {
    console.log("field change");
    this.setState({
      [field]: e.target.value,
      post_text: "choice1:" + this.state.poll_option_1 + ",choice2:" + this.state.poll_option_2 + ",votes1:, votes2:, comments:0, user:" + sessionStorage.getItem("user")
    });
  }
  
  render() {
    if (this.state.redir) return <Redirect to={"/profile/"+sessionStorage.getItem("user")}/>
    else return (
      <div class="CreatePollPage">
        <header>
          <Link to="/feed"><img id="committii-logo" alt="Committii Logo" src={committiilogo}></img></Link>
        </header>
        <div class="create_poll_white_box">
          <header class="create_poll_white_box_header">
            <Link to={"/profile/"+sessionStorage.getItem("user")}><img id="create_backarrow" alt="Back arrow" src={backarrow}></img></Link>
            <div class="create_id">
              <p id="create_label">Create Poll</p>
            </div>
          </header>
          <div class="poll_inputs">
          <form onSubmit={this.submitHandler}>
            <input id="option_1_field"
                type="text"
                placeholder={" Option #1"}
                onChange={e => this.fieldChangeHandler("poll_option_1", e)}/>
            <input id="option_2_field"
                type="text"
                placeholder={" Option #2"}
                onChange={e => this.fieldChangeHandler("poll_option_2", e)}/>
            <input id="category_field"
                type="text"
                placeholder={" Category (Ex. Animals, Photos, Classes, etc.)"}
                onChange={e => this.fieldChangeHandler("poll_category", e)}/>
                
              <input id="create_poll" type="submit" value="Create Poll" />              
            </form>
            </div>
            <div class="new_poll_data">
              <p id="new_poll_title">{this.state.poll_option_1 + " vs. " + this.state.poll_option_2}</p>
              <p id="new_poll_category">Category: {this.state.poll_category}</p>
            </div>
            
          </div>
      </div>
    );
  }
}
