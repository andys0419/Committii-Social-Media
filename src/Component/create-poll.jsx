import React from "react";
import "../App.css";
import PostingList from "./PostingList.jsx";
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
      redir: false
    };
    this.postListing = React.createRef();
    this.uploadImages = this.uploadImages.bind(this);
    this.makepostImage = this.makepostImage.bind(this);
  }

  // the handler for submitting a new post.  This will call the API to create a new post.
  // while the test harness does not use images, if you had an image URL you would pass it
  // in the thumbnailURL field.
  makepostImage(url1, url2){
    fetch(process.env.REACT_APP_API_PATH+"/posts", {
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
        type: JSON.stringify({"tag": this.state.poll_category, "images": [url1, url2]})
      })
    })
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            postmessage: result.Status,
            redir: true
          });
          console.log(result)
        },
        error => {
          alert("error!");
        }
      );
  }
  uploadImages(id1, id2){
    var server = process.env.REACT_APP_API_PATH.slice(0, -4) + "/"
    let url1 = ""
    var formData = new FormData();
    var fileInput = document.getElementById('imgUpload1');
    formData.append("file", fileInput.files[0]);
    fetch(process.env.REACT_APP_API_PATH + "/user-artifacts/" + String(id1) + "/upload", {
      method: "POST",
      body: formData,
      headers: {
        'Authorization': 'Bearer '+ sessionStorage.getItem("token")
      },
    }).then(res => res.json())
    .then(
      result => {
        url1 = server + result.url
        let url2 = ""
        formData = new FormData();
        fileInput = document.getElementById('imgUpload2');
        formData.append("file", fileInput.files[0]);
        fetch(process.env.REACT_APP_API_PATH + "/user-artifacts/" + String(id2) + "/upload", {
          method: "POST",
          body: formData,
          headers: {
            'Authorization': 'Bearer '+ sessionStorage.getItem("token")
          },
        }).then(res => res.json())
        .then(
          result => {
            url2 = server + result.url
            this.makepostImage(url1, url2)
          })
      })
  }
  submitHandler = event => {

    //keep the form from actually submitting via HTML - we want to handle it in react
    event.preventDefault();

    if (document.getElementById("imgUpload1").value == "" && document.getElementById("imgUpload2").value == ""){
    fetch(process.env.REACT_APP_API_PATH+"/posts", {
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
        type: JSON.stringify({"tag": this.state.poll_category, "images": []})
      })
    })
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            postmessage: result.Status,
            redir: true
          });
          console.log(result)
          // once a post is complete, reload the feed
          //this.postListing.current.loadPosts();
        },
        error => {
          alert("error!");
        }
      );
    }else{
      if (document.getElementById("imgUpload1").value == "" || document.getElementById("imgUpload2").value == ""){
        alert("Missing an Image")
      }else{
        let id1;
        fetch(process.env.REACT_APP_API_PATH + "/user-artifacts", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ sessionStorage.getItem("token")},
          body: JSON.stringify({
            "ownerID": sessionStorage.getItem("user"),
            "type": "Image",
            "url": "String",
            "category": "postpic"
          })
        })
        .then(res => res.json())
        .then(
          result => {
            var userArtifact = -1;
            userArtifact = result.id;
            if (userArtifact != -1){
              id1 = userArtifact
            }
            fetch(process.env.REACT_APP_API_PATH + "/user-artifacts", {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ sessionStorage.getItem("token")},
              body: JSON.stringify({
                "ownerID": sessionStorage.getItem("user"),
                "type": "Image",
                "url": "String",
                "category": "postpic"
              })
            })
            .then(res => res.json())
            .then(
              result => {
                var userArtifact = -1;
                userArtifact = result.id;
                let urls = []
                console.log(urls)
                if (userArtifact != -1){
                  this.uploadImages(id1, userArtifact);
                }
              })
          })
      }
    }
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
      post_text: this.state.poll_option_1+" vs. "+this.state.poll_option_2
    });
  }

  render() {
    if (this.state.redir) return <Redirect to='/profile'/>
    return (
      <div>
        {/* <PostingList ref={this.postListing} refresh={this.props.refresh} type="postlist" /> */}

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
            <form action="/action_page.php" id="image1">
              <label for="img1">Select Image:</label>
              <input type="file" id="imgUpload1" name="img" accept="image/*"></input>
            </form>
            <form action="/action_page.php" id="image2">
              <label for="img1">Select Image:</label>
              <input type="file" id="imgUpload2" name="img" accept="image/*"></input>
            </form>
            <p id="new_poll_title">{this.state.post_text}</p>
            <p id="new_poll_category">Category: {this.state.poll_category}</p>
            <form onSubmit={this.submitHandler}>
              <input id="create_poll" type="submit" value="Create Poll" />
            </form>
          </div>
      </div>
    );
  }
}
