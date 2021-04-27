import React from "react";
import CanvasJSReact from '../canvasjs-3.2.11/canvasjs.react';
import { Link, useHistory, useParams } from 'react-router-dom';
import "./poll-page.css";
import "./CommentForm.css"

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
    let { postid } = this.props.match.params;
    this.post = React.createRef();
    this.goBack = this.goBack.bind(this);
    this.state = {
      posts: [],
      postData: [],
      poll_option_1: "",
      poll_option_2: "",
      post_text: "",
      poll_category: "",
      vote_first: 0,
      vote_second: 0,
      voter_list_first: [],
      voter_list_second: [],
      likes: 0,
      userid: -1,
      postid: postid
    };

  }

  goBack() {
    this.props.history.goBack();
  }
  updatePost(index, value) {
    console.log(this.state.postData);
    var tempData = this.state.postData[index].split(":");
    var tempPost = this.state.postData;

    tempData[1] = value;
    tempPost[index] = tempData.join(":");

    this.setState({
      postData: tempPost
    });
    
    console.log("This is " + value);
    console.log("HERE" + this.state.postData + "\n");
    console.log("HERE" + this.state.postData.join(",") + "\n");
    //make the api call to patch
    fetch(process.env.REACT_APP_API_PATH+"/posts/"+this.state.postid, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem("token")
      },
      body: JSON.stringify({
        content: this.state.postData.join(","),
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
  }

  getPost(postID) {
    fetch(process.env.REACT_APP_API_PATH+"/posts/"+postID, {
      method: "get",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem("token")
      }
      })
      .then(res => res.json())
      .then(
        result => {
          var results = result.content.split(",");
          console.log(results)
          this.setState({
            isLoaded: true,
            post: result,
            postData: results,
            poll_option_1: results[0].split(":")[1],
            poll_option_2: results[1].split(":")[1], 
            vote_first: results[2].split(":")[1].split('-').length-1,
            vote_second: results[3].split(":")[1].split('-').length-1,
            voter_list_first: results[2].split(":")[1].split('-'),
            voter_list_second: results[3].split(":")[1].split('-'),
            userid: results[5].split(":")[1],
          });
          
          //stores the title of the poll for use with grabbing relevant comments
          sessionStorage.setItem("current_content", result.content);
        },
        error => {
          alert("error!"+error);
        }
      );
  }

  componentDidMount() {
    console.log("In profile");
    console.log(this.props);

    this.getPost(this.state.postid);
    //this.state.poll_option_1 = this.state.post.content.substring(0, 4);

    // first fetch the user data to allow update of username
    fetch(process.env.REACT_APP_API_PATH + "/users/"+sessionStorage.getItem("user"), {
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
  
      // clearState = (e) => {
      //   this.setState({
      //     username: "User",
      //     following: 0,
      //     followers: 0
      //   })

      //   sessionStorage.setItem("token", "");
      //   sessionStorage.setItem("user", "User");
      // }

      updateVoteFirst = () => {
        if (this.state.voter_list_first.includes(sessionStorage.getItem("user"))) {
          this.state.voter_list_first.splice(
            this.state.voter_list_first.indexOf(sessionStorage.getItem("user")),
            1
          )
          this.updatePost(2, this.state.voter_list_first.join('-'))
          this.setState({
            vote_first: this.state.vote_first-1
          });
        }
        else if (this.state.voter_list_second.includes(sessionStorage.getItem("user"))) {
          this.state.voter_list_second.splice(
            this.state.voter_list_second.indexOf(sessionStorage.getItem("user")),
            1
          )
          this.updatePost(3, this.state.voter_list_second.join('-'))
          this.state.voter_list_first.push(sessionStorage.getItem("user"));
          this.updatePost(2, this.state.voter_list_first.join('-'))
          this.setState({
            vote_first: this.state.vote_first+1,
            vote_second: this.state.vote_second-1
          });
        }
        else {
          console.log("yeet" + this.state.voter_list_first.length);
          console.log("yote" + sessionStorage.getItem("user"));
          this.state.voter_list_first.push(sessionStorage.getItem("user"));
          console.log("yeet" + this.state.voter_list_first.length);
          this.updatePost(2, this.state.voter_list_first.join('-'))
          this.setState({
            vote_first: this.state.vote_first+1
          });
        }
      }

      updateVoteSecond = () => {
        if (this.state.voter_list_second.includes(sessionStorage.getItem("user"))) {
          this.state.voter_list_second.splice(
            this.state.voter_list_second.indexOf(sessionStorage.getItem("user")),
            1
          )
          this.updatePost(3, this.state.voter_list_second.join('-'))
          this.setState({
            vote_second: this.state.vote_second-1
          });
        }
        else if (this.state.voter_list_first.includes(sessionStorage.getItem("user"))) {
          this.state.voter_list_first.splice(
            this.state.voter_list_first.indexOf(sessionStorage.getItem("user")),
            1
          )
          this.updatePost(2, this.state.voter_list_first.join('-'))
          this.state.voter_list_second.push(sessionStorage.getItem("user"));
          this.updatePost(3, this.state.voter_list_second.join('-'))
          this.setState({
            vote_second: this.state.vote_second+1,
            vote_first: this.state.vote_first-1
          });
        }
        else {
          this.state.voter_list_second.push(sessionStorage.getItem("user"));
          this.updatePost(3, this.state.voter_list_second.join('-'))
          this.setState({
            vote_second: this.state.vote_second+1
          });
        }
    }

    updateLikes = () => {
      console.log(this.state.postid);
      this.setState({
          likes: this.state.likes+1
      });
    }


    static contextTypes = {
      router: () => true, // replace with PropTypes.object if you use them
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
   
   if(this.state.post) {
    return (
      
      <div className="App">
          <Link to="/feed"><img id="comiti_logo" src={committiilogo}></img></Link>
          <Link> <img id="backarrow-pollpage" onClick={this.goBack} src={backarrow}></img> </Link>
          <Link to={"/profile/"+this.state.userid}><img id="prof_pic_poll_page" src={prof_pic}></img></Link>
          <canvas id="white_box"></canvas>
          <p id="poll_name">{this.state.poll_option_1 + " vs. " + this.state.poll_option_2}</p>
          <canvas id="poll_outline"></canvas>
          <button id="vote1" onClick={()=>{this.updateVoteFirst()}}>{this.state.poll_option_1}</button>
          <button id="vote2" onClick={()=>{this.updateVoteSecond()}}>{this.state.poll_option_2}</button>
          <p id="like_count">Likes: {this.state.likes}</p>
          <Link to={"/pollpage/"+ this.state.postid + "/comments"}><button id="comment_button">Comments</button></Link>
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
   else {
     return (
    <div className="App">
      <p id="testing12">Loading...</p>
    </div>
     )
   }
  }
}