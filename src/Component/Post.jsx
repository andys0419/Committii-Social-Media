import React from "react";
import "../App.css";
import CommentForm from "./CommentForm.jsx";
import helpIcon from "../assets/delete.png";
import commentIcon from "../assets/comment.svg";
import "./post.css";
import { Link } from 'react-router-dom';

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      comments: this.props.post.commentCount
    };
    this.post = React.createRef();

  }

  showModal = e => {
    this.setState({
      showModal: !this.state.showModal
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


//  we only want to display comment information if this is a post that accepts comments
  // conditionalDisplay() {
  //   console.log("Comment count is " + this.props.post.commentCount);
  //     return (
  //       <div className="comment-block">

  //         <div className="comment-indicator">
  //           <div className="comment-indicator-text">
  //             {this.getCommentCount()} Comments
  //           </div>
  //           <img
  //             src={commentIcon}
  //             className="comment-icon"
  //             onClick={e => this.showModal()}
  //             alt="View Comments"
  //           />
  //         </div>
  //         <div className={this.showHideComments()}>
  //           <CommentForm
  //             onAddComment={this.setCommentCount}
  //             parent={this.props.post.id}
  //             commentCount={this.getCommentCount()}
  //           />
  //         </div>
  //       </div>
  //     );
  // }

  // we only want to expose the delete post functionality if the user is
  // author of the post
  showDelete(){
    if (this.props.post.author.id == sessionStorage.getItem("user")) {
      return(
        <div>
          <button id={"del-post-button"} onClick={e => this.deletePost(this.props.post.id)}>Delete</button>
        </div>
    );
    }
    return "";
  }

  render() {

    return (
      <div>

      <div
        key={this.props.post.id}
        className={[this.props.type, "postbody"].join(" ")}
      >
      <div className="posts">
        <div className="deletePost">
          {this.props.post.author.username} ({this.props.post.createdAt})
          <p id="poll-name">{this.props.post.content}</p>
          {this.showDelete()}
        </div>
        {/* {this.conditionalDisplay()} */}
        {this.props.post.content}
        <Link to="/pollpage"><button id="view-res">View Results</button></Link>
        </div>
      </div>
      </div>
    );
  }
}
