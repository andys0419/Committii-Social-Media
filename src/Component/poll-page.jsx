import React from "react";
import CanvasJSReact from '../canvasjs-3.2.11/canvasjs.react';
import { Link } from 'react-router-dom';
import "./poll-page.css";
import committiilogo from "../assets/logo.svg";
import backarrow from "../assets/back_arrow.svg";
import prof_pic from "../assets/profile-picture-holder.png";
import hearticon from "../assets/heart-icon.svg";
import CommentForm from "./CommentForm.jsx";
import helpIcon from "../assets/delete.png";
import commentIcon from "../assets/comment.svg";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class PollPages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      poll_option_1: "",
      poll_option_2: "",
      post_text: "",
      poll_category: "",
      vote_first: 0,
      vote_second: 0,
      likes: 0
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
            <div className="comment-indicator-text">
              {this.getCommentCount()} Comments
            </div>
            <img
              src={commentIcon}
              className="comment-icon"
              onClick={e => this.showModal()}
              alt="View Comments"
            />
          </div>
          <div className={this.showHideComments()}>
            <CommentForm
              onAddComment={this.setCommentCount}
              parent={this.props.post.id}
              commentCount={this.getCommentCount()}
            />
          </div>
        </div>
      );
    //}

  }

  // we only want to expose the delete post functionality if the user is
  // author of the post
  showDelete(){
    if (this.props.post.author.id == sessionStorage.getItem("user")) {
      return(
      <img
        src={helpIcon}
        className="sidenav-icon deleteIcon"
        alt="Delete Post"
        title="Delete Post"
        onClick={e => this.deletePost(this.props.post.id)}
      />
    );
    }
    return "";
  }





  componentDidMount() {
    console.log("In profile");
    console.log(this.props);

    // first fetch the user data to allow update of username
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
              username: result.email || "",
              //firstname: result.firstName || "",
              //lastname: result.lastName || ""

            });
          }
        },
        error => {
          alert("error!");
        }
      );
      }
  
      clearState = (e) => {
        this.setState({
          username: "User",
          following: 0,
          followers: 0
        })

        sessionStorage.setItem("token", "");
        sessionStorage.setItem("user", "User");
      }

      updateVoteFirst = () => {
          this.setState({
              vote_first: this.state.vote_first+1
          });
      }

      updateVoteSecond = () => {
        this.setState({
            vote_second: this.state.vote_second+1
        });
    }

    updateLikes = () => {
      this.setState({
          likes: this.state.likes+1
      });
  }


  render() {
    CanvasJS.addColorSet("gray_color",
    ["#acacac"]);
    const options = {
        responsive: true,
        maintainAspectRation: false,
        axisY: {interval: 1, labelFontSize: 15},
        axisX: {labelFontSize: 16},
        colorSet: "gray_color",
        title: {
        text: ""
      },
      data: [{				
                type: "column",
                dataPoints: [
                    { label: this.state.poll_option_1,  y: this.state.vote_first  },
                    { label: this.state.poll_option_2, y: this.state.vote_second  },
                ]
       }]
   }
    return (
      <div className="App">
          <Link to="/"><img id="comiti_logo" src={committiilogo}></img></Link>
          <Link to="/profile"><img id="backarrow-pollpage" src={backarrow}></img></Link>
          <Link to="/profile"><img id="prof_pic_poll_page" src={prof_pic}></img></Link>
          <canvas id="white_box"></canvas>
          <p id="poll_name">{this.state.post_text}</p>
          <canvas id="poll_outline"></canvas>
          <button id="vote1" onClick={()=>{this.updateVoteFirst()}}>{this.state.poll_option_1}</button>
          <button id="vote2" onClick={()=>{this.updateVoteSecond()}}>{this.state.poll_option_2}</button>
          <p id="like_count">Likes: {this.state.likes}</p>
          <button id="comment_button" onClick={()=>{}}>Comments</button>
          <div id="test">
            <button id="like_button" onClick={()=>{this.updateLikes()}}>Like this Poll?</button>
            <img id="heart" src={hearticon}></img>
          </div>
          <div id="chart">
            <CanvasJSChart options = {options}></CanvasJSChart>
          </div>
      </div>
    );
  }
}