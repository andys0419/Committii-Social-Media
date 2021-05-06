import React from "react";
import "../App.css";
import CanvasJSReact from '../canvasjs-3.2.11/canvasjs.react';
import { Link } from 'react-router-dom';
import committiilogo from "../assets/logo.svg";


var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class Feed extends React.Component {
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
      poll_option_1: "",
      poll_option_2: "",
      vote_first: 0,
      vote_second: 0,
      followers: [],
      following: [],
      ShowSearch: false,
      redir: false,
      privacy: false,
      theyprivate: false
    };
    this.showMenu = this.showMenu.bind(this)
    this.fieldChangeHandler = this.fieldChangeHandler.bind(this)
  }

  componentDidMount() {
    
    this.loadFollowers();
    this.loadFollowing();

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
            console.log(result.status)
            this.setState({
              // IMPORTANT!  You need to guard against any of these values being null.  If they are, it will
              // try and make the form component uncontrolled, which plays havoc with react
              username: result.username || "",
              email: result.email || "",
              privacy: result.status === "true",
              theyprivate: result.lastName === "true",
              //lastname: result.lastName || ""

            });
          }
        },
        error => {
          alert("error!");
        }
      );
  }

  loadFollowing() {
    console.log("HERE")
    fetch(process.env.REACT_APP_API_PATH+"/connections?userID="+sessionStorage.getItem("user")+"&type=isFollowing&status=active", {
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
            var temp = []
            for(const each of result[0]) {
              temp.push(each.connectedUser.id.toString())
            }
            temp.push(sessionStorage.getItem("user"))
            console.log(temp)
            this.setState({
              isLoaded: true,
              following: temp
            });
            
          }
        },
        error => {
          this.setState({
            isLoaded: true,
            following: 0
          });
        }
      );
  }
  
  loadFollowers() {
      fetch(process.env.REACT_APP_API_PATH+"/connections?userID="+sessionStorage.getItem("user")+"&type=follower&status=active", {
        method: "get",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+sessionStorage.getItem("token")
        }
       })
        .then(res => res.json())
        .then(
          result => {
            var temp = []
            for(const each of result[0]) {
              temp.push(each.connectedUser.id.toString())
            }
            temp.push(sessionStorage.getItem("user"))
            this.setState({
              isLoaded: true,
              followers: temp
            });
              
            
          },
          error => {
            this.setState({
              followers: 0
            });
          }
        ); 
  }
  
  loadPosts() {
    let url = process.env.REACT_APP_API_PATH + "/posts?type=post";
    // /posts/1
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
          console.log(result)
          if (result) {
            this.setState({
              isLoaded: true,
              posts: result[0]
            });
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
    let contentData = post.content.split(",");

    let votes1 = contentData[2].split(":")[1].split('-');
    let votes2 = contentData[3].split(":")[1].split('-');
    let votes = (votes1.length-1) + (votes2.length-1);

    let comments = post.commentCount;
    let id = "pollpage/" + post.id.toString();
    let userid = contentData[5].split(":")[1];

    console.log(this.state.following)
    if (this.state.privacy && !this.state.following.includes(userid) ) return;
    if (this.state.theyprivate && !this.state.followers.includes(userid) ) return;

    CanvasJS.addColorSet("black",
    ["#ffffff"]);
    const options = {
        responsive: true,
        maintainAspectRation: false,
        axisY: {interval: 1, labelFontSize: 15},
        axisX: {labelFontSize: 16},
        width: window.innerWidth / 3,
        height: 245,
        theme: "dark1",
        backgroundColor: "black",
        colorSet: "black",
        title: {
        text: ""

      },
      data: [{
                type: "column",
                dataPoints: [
                    { label: contentData[0].split(":")[1].trim(), y: votes1.length-1 },
                    { label: contentData[1].split(":")[1].trim(), y: votes2.length-1 },
                ]
       }]
   }
   return (
    <div key={post.id} class = "feedPosts">
      <div class = "post">
        <p class="likeButton">{votes} Votes</p>
        <p class="commentButton">{comments} Comments</p>
        <Link to={id}><button class="postButton">View Post</button></Link>
        <div class="chart">
          <CanvasJSChart alt="Poll Graph" options = {options}></CanvasJSChart>
        </div>
      </div>
    </div>
   )

  }
  fieldChangeHandler(field, e) {
    var sortedPost = []
    for (var post in this.state.posts){
      if (this.state.posts[post]['type'] === e.target.value){
        sortedPost.push(this.state.posts[post])
      }
    }
    if (sortedPost.length !== 0){
      this.setState({
        posts: sortedPost
      })
  }
  if (e.target.value === ""){
    this.loadPosts()
  }
  }

  showMenu(event){
    this.setState({
      ShowSearch: !this.state.ShowSearch
    });
  }

  render() {
    return (

      <div class = "feed">
        <Link to="/feed">
          <img id="committii-logo" alt="Committii Logo" src={committiilogo}></img>
        </Link>

        <div class="feedOptions">
          <div class="vLeft">
            <button class="feedSort">Sort</button>
            {/* <button class="feedSort" onClick={this.showMenu}>Sort</button> */}
            {
            this.state.ShowSearch
            ? (
              <div className="searchdropdown">
                <input className="searchContent"
                    type="text"
                    placeholder={"Enter Tag"}
                    onChange={e => this.fieldChangeHandler("search", e)}>
                </input>
                </div>
            ): (null)
          }
          </div>
          <div class="vRight">
            <Link to="/Messages"><button class="feedMessages">Messages</button></Link>
          </div>

          <Link to={"/profile/"+sessionStorage.getItem("user")}><button class="feedProfile">Profile</button></Link>
        </div>

        {this.state.posts.map(post => this.createPost(post))}

        <Link to="/createpoll"><button class="poll_button">Create Poll</button></Link>
      </div>

    );
  }
}
