import React from "react";
import Post from "./Post.jsx";
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
import "./PostingList.css"

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class PostingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      posts: [],
      listType: props.listType,
      username: 'User',
      email: '',
      following: 0,
      followers: 0,
    };
    this.post = React.createRef();
    this.postingList = React.createRef();
    this.loadPosts = this.loadPosts.bind(this);
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

  componentDidUpdate(prevProps) {
    console.log("PrevProps "+prevProps.refresh);
    console.log("Props "+this.props.refresh);
    if (prevProps.refresh !== this.props.refresh){
      this.loadPosts();
    }
  }

  loadPosts() {
    let url = process.env.REACT_APP_API_PATH+"/posts?ParentID=";
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

  clearState = (e) => {
    this.setState({
      username: "User",
      following: 0,
      followers: 0
    })

    sessionStorage.setItem("token", "");
    sessionStorage.setItem("user", "User");
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
    //this.loadPosts();
    const {error, isLoaded, posts} = this.state;
    if (error) {
      return <div> Error: {error.message} </div>;
    } else if (!isLoaded) {
      return <div> Loading... </div>;
    } else if (posts) {

      if (posts.length > 0){
      return (
        <div className="posts">
          {posts.map(post => (
            <Post key={post.id} post={post} type={this.props.type} loadPosts={this.loadPosts}/>
          ))}
          <Link to="/"><img id="comiti_logo" src={committiilogo}></img></Link>
          <Link to="/profile"><img id="backarrow" src={backarrow}></img></Link>
          <Link to="/profile"><img id="prof_pic_poll_page" src={prof_pic}></img></Link>
          <canvas id="white_box"></canvas>
          <p id="poll_name">{this.props.post}Test</p>
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
    else{
      return (
        <p></p>
      )
    }
  }
}
}
