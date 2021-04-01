import React from "react";
import { Link } from 'react-router-dom';
import committiilogo from "../assets/logo.svg";
import PostingList from "./PostingList.jsx";
import "./CommentForm.css"

export default class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post_text: "",
      postmessage: "",
      comment_holder: "You are commenting as: " + sessionStorage.getItem("username"),
      errorMessage: ""
    };
    this.postListing = React.createRef();
  }

  submitHandler = event => {
    //keep the form from actually submitting
    event.preventDefault();

    const postMsg = this.state.postmessage;

    if (postMsg == '') {
      this.setState({
        errorMessage: "Please enter a message."
      })
    }

    //make the api call to the authentication page

    fetch("https://webdev.cse.buffalo.edu/hci/elmas/api/api/"+"/posts", {
      method: "POST",
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
          // update the count in the UI manually, to avoid a database hit
          this.props.onAddComment(this.props.commentCount + 1);
          this.postListing.current.loadPosts();
        },
        error => {
          alert("error!");
        }
      );
  };

  myChangeHandler = event => {
    this.setState({
      post_text: event.target.value
    });
  };

  updatePostMessage = (e) => {
    this.setState({
      postmessage: e.currentTarget.value
    })
  }

  render() {
    return (

      <div id="logo">
        <Link to="/pollpage"><img id="committi_logo" src={committiilogo}></img></Link>

        <div id="current_user">
        Add A Comment to this Poll.{this.props.parent}
            <br/>
            <br/>

            <div id="comment_box">
                 <textarea onChange={this.updatePostMessage} value={this.state.postmessage} rows="8" cols="43" placeholder={this.state.comment_holder} onChange={this.myChangeHandler}/>
            </div>
            <br/>

            <div id="line">
                <div id="comments">
                    <text>Current Comments</text>
                    <br/>
                    <text1>(No Comments currently exist!)</text1>
                </div>
            </div>
            
            
            <form onSubmit={this.submitHandler}>
            <input type="submit" value="Comment"/>
            {/* {this.state.postmessage} */}
            <br/>
            {this.state.errorMessage !== "" ? this.state.errorMessage : <div/>}
            {this.state.errorMessage == ""}
            <br />
            </form>

            {/* <PostingList
                 ref={this.postListing}
                 parentid={this.props.parent}
                 type="commentlist"
            /> */}
        </div>
    </div>
    );
  }
}
