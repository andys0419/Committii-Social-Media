import React from "react";
import CanvasJSReact from '../canvasjs-3.2.11/canvasjs.react';
import {Link} from 'react-router-dom';
import "./poll-page.css";
import "./CommentForm.css"
import "../App.css"

import committiilogo from "../assets/logo.svg";
import backarrow from "../assets/back_arrow.svg";
import prof_pic from "../assets/profile-picture-holder.png";

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
      otheruser: -1,
      postid: postid,
      comment: "",
      comments: [],
      nickname: ""
    };
    this.submitHandler = this.submitHandler.bind(this);

  }

  myChangeHandler = event => {
    this.setState({
      comment: event.target.value
    });
  };

  goBack() {
    this.props.history.goBack();
  }
  updatePost(index, value) {
     //console.log(this.state.postData);
    var tempData = this.state.postData[index].split(":");
    var tempPost = this.state.postData;

    tempData[1] = value;
    tempPost[index] = tempData.join(":");

    this.setState({
      postData: tempPost
    });
    
     //console.log("This is " + value);
     //console.log("HERE" + this.state.postData + "\n");
     //console.log("HERE" + this.state.postData.join(",") + "\n");
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
           //console.log(results)
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
          this.loadComments(result.content);
        },
        error => {
          alert("error!"+error);
        }
      );
  }

  componentDidMount() {
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
             //console.log(result);

            this.setState({
              // IMPORTANT!  You need to guard against any of these values being null.  If they are, it will
              // try and make the form component uncontrolled, which plays havoc with react
              username: result.email || "",
              nickname: result.username || "",
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
           //console.log("yeet" + this.state.voter_list_first.length);
           //console.log("yote" + sessionStorage.getItem("user"));
          this.state.voter_list_first.push(sessionStorage.getItem("user"));
           //console.log("yeet" + this.state.voter_list_first.length);
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
     //console.log(this.state.postid);
    this.setState({
        likes: this.state.likes+1
    });
  }
  
  static contextTypes = {
    router: () => true, // replace with PropTypes.object if you use them
  }

  displayProfilePic(){
    fetch(process.env.REACT_APP_API_PATH+"/users/"+this.state.userid, {
      method: "get",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem("token")
      }
    })
    .then(res => res.json())
    .then(
      result => {
         //console.log(result)
        if (result.role === ""){
          document.getElementById("prof_pic_poll_page").src = prof_pic
        }else{
        var server = process.env.REACT_APP_API_PATH.slice(0, -4) + "/";
         //console.log(result.role)
        document.getElementById("prof_pic_poll_page").src = server + result.role
      }
      })
  }

  loadComments(postData) {
    let url = process.env.REACT_APP_API_PATH + "/posts?parentID=";
    console.log(postData)
    url += this.state.postid
    url += "&type=comments";

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
            var temp = []

            for (const comment of result[0]) temp.push(comment)
            this.setState({
              comments: temp,
              isLoaded: true,
            });
             console.log(result)
             //console.log("Got Posts");
          }
        },
        error => {
           //console.log("ERROR loading Posts")
        }
      );
  }


  deletePost(id) {
    let url = process.env.REACT_APP_API_PATH + "/posts/" + id;

    fetch(url, {
      method: "delete",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem("token")
      },
    })
      .then(res => res.json())
      .then(
        result => {
          if (result) {

             console.log(result)
             //console.log("Got Posts");
          }
        },
        error => {
           console.log("ERROR deleting Posts")
        }
      );
  }

  createComments(comment) {
    return (
      <div>
        <div className="comments_box">
          <text className="comment_title">{comment.author.email + " says: "}</text>
          <text className="comment_date">{"At: " + comment.createdAt}</text>
          <text className="comment_message">{comment.thumbnailURL}</text>

          <div class="commentLeft"/>
        <div class="commentRight"/>
        </div>
        
        <div id="poll_footer"/>
      </div>
    )
  }

  submitHandler() {
    //keep the form from actually submitting


    const postMsg = this.state.comment

    if (postMsg === '') {
      alert("Please enter a message.")
      return;
    } 

    //make the api call to the authentication page

    fetch(process.env.REACT_APP_API_PATH + "/posts", {
      method: "post",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem("token")
      },
      body: JSON.stringify({
        authorID: sessionStorage.getItem("user"),
        parentID: this.state.postid,
        content: sessionStorage.getItem("current_content"),
        type: "comments",
        thumbnailURL: postMsg
      })
    })
      .then(res => res.json())
      .then(
        result => {
          
          this.setState({
            errorMessage: "Your comment has been posted!"
          })

          // update the count in the UI manually, to avoid a database hit
          //this.props.onAddComment(this.props.commentCount + 1);
          this.loadComments(sessionStorage.getItem("current_content"));
          this.render();
        },
        error => {
          alert("error!");
        }
      );
  };

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    CanvasJS.addColorSet("white",["#ffffff"]);
    const Poll_Options = {
      maintainAspectRatio: false,
      responsive: false,
      axisY: {interval: 1, labelFontSize: 15},
      axisX: {labelFontSize: 16},
      colorSet: "white",
      theme: "dark1",
      backgroundColor: "black",
      data: [{		
        type: "column",
        colorSet: "white",
        dataPoints: [
          { label: this.state.poll_option_1,  y: this.state.vote_first  },
          { label: this.state.poll_option_2, y: this.state.vote_second  },
        ],
       }]
}
   
   if(this.state.post) {
    return (
      <div className="Poll_Page">
        <Link to="/feed"><img id="committii-logo" alt="Committii Logo" src={committiilogo}></img></Link>
        <div className="poll_page_white_box">
          <div class="pollLeft"/>
          <div class="pollRight"/>
          <Link to={"/profile/"+this.state.userid}><button class="user_button">View Profile</button></Link>
          <div className="poll_page_white_box_header">
            {/* <Link> <img id="backarrow-pollpage" onClick={this.goBack} src={backarrow}></img> </Link> */}
            <Link to={"/feed"}> <img id="backarrow-pollpage" alt="Back Arrow" src={backarrow}></img> </Link>
            <div className="poll_page_title_id">
              <text id="poll_page_poll_title">{this.state.poll_option_1 + " vs. " + this.state.poll_option_2}</text>
              <div id="poll_options"/>
            </div>
          </div>
          <div className="poll_page_chart_box">
              <CanvasJSChart alt="Poll Graph" options = {Poll_Options}></CanvasJSChart>
              <button className="poll_page_vote_option_1" onClick={()=>{this.updateVoteFirst()}}>{this.state.poll_option_1}</button>
              <button className="poll_page_vote_option_2" onClick={()=>{this.updateVoteSecond()}}>{this.state.poll_option_2}</button>
          </div>
          <div className="poll_page_white_box_footer">
            <text id="poll_page_poll_title">Comments:</text>
            <div id="poll_footer"/>
            <div>
              <div className="comments_box">
                <text className="comment_title"> Create New Comment: </text>
              </div>
                <input id="CommentBox" type="text" placeholder="Your comment here!" onChange={this.myChangeHandler} />
                <button className="submit_button" onClick={()=>{this.submitHandler()}}> Submit </button>
              <div id="poll_footer"/>
            </div>
            {this.state.comments.map(comment => this.createComments(comment))}
          </div>

          
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