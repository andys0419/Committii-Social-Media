import React from "react";
import "../App.css";
import CommentForm from "./CommentForm.jsx";
import ReplyForm from "./ReplyForm.jsx"
import helpIcon from "../assets/delete.png";
import commentIcon from "../assets/comment.svg";
import "./post.css";
import { Link } from 'react-router-dom';

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      comments: this.props.post.commentCount,
    };
    this.post = React.createRef();
  }

  showModal = e => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  setCommentCount = newcount => {
    this.setState({
      comments: newcount
    });
  };

  getCommentCount() {
    if (!this.state.comments || this.state.comments === "0") {
      return 0;
    }
    return parseInt(this.state.comments);
  }

  showHideComments() {
    
    if (this.state.showModal) {
      return "comments show";
    }

    return "comments hide";
  }

  deletePost(postID) {
    //make the api call to post
    fetch(process.env.REACT_APP_API_PATH+"/posts/"+postID, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem("token")
      }
      })
      .then(
        result => {
          this.props.loadPosts();
        },
        error => {
          alert("error!"+error);
        }
      );
  }


  // we only want to display comment information if this is a post that accepts comments
  conditionalDisplay() {
    console.log("Comment count is " + this.props.post.commentCount);
    
    //if (this.props.post.commentCount <= 0) {
    //  return "";
    //  }

    //else {
      return (
        <div className="comment-block">

          <div className="comment-indicator">
            <img
              src={commentIcon}
              className="comment-icon"
              onClick={e => this.showModal()}
              alt="View Comments"
            />
            <div className="comment-indicator-text">
              {this.getCommentCount()} Reply
            </div>
          </div>
          <div className={this.showHideComments()}>
            <ReplyForm 
              onAddComment={this.setCommentCount}
              parent={this.props.post.id}
              commentCount={this.getCommentCount()}
            />

            {/* <CommentForm
              onAddComment={this.setCommentCount}
              parent={this.props.post.id}
              commentCount={this.getCommentCount()}
            /> */}
          </div>
        </div>
      );
  }

showPolls() {
  var results = this.props.post.content.split(",");
  var option1 = results[0].split(":")[1];
  var option2 = results[1].split(":")[1];
  var isUser = results[5].split(":")[1] === sessionStorage.getItem("user");
  return(
    <div class="poll_list">
      <p id="poll-name">{option1 + " vs. " + option2}</p>
      {isUser && <button id={"del-post-button"} onClick={e => this.deletePost(this.props.post.id)}>Delete</button>}
      <Link to={"/pollpage/"+this.props.post.id}><button id="view-res">View Results</button></Link>
    </div>
  );
}

  render() {
    return (
      <div className="posts">
      {/* {this.props.post.author.email} ({this.props.post.createdAt}) */}
      {this.showPolls()}
      </div>
    );
  }
}
