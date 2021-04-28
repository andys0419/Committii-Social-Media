import React from "react";
import { Link } from 'react-router-dom';
import committiilogo from "../assets/logo.svg";
import CommentsList from "./CommentsList.jsx";
import "./CommentForm.css"

export default class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post_text: "",
      comment_holder: "You are commenting as: " + sessionStorage.getItem("username"),
      errorMessage: "",
    };
    this.postListing = React.createRef();
  }

  submitHandler = event => {
    //keep the form from actually submitting
    event.preventDefault();

    const postMsg = this.state.post_text;

    if (postMsg == '') {
      this.setState({
        errorMessage: "Please enter a message."
      })
      return;
    } else {

      this.setState({
        errorMessage: ""
      })
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
        parentID: this.props.parent,
        content: sessionStorage.getItem("current_content"),
        type: "comments",
        thumbnailURL: this.state.post_text
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
          this.postListing.current.loadPosts();
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

  updatePostText = (e) => {
    this.setState({
      post_text: e.currentTarget.value
    })
  }

  render() {
    
    return (

        <div class="site">
          
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <header class="masthead">
              <Link to="/feed"><img id="committi_logo" src={committiilogo}></img></Link>
            </header>

            <main id="content" class="main-content">
              <h2>Comments</h2>
              <br/>
              <CommentsList
                ref={this.postListing}
                parentid={this.props.parent}
                type="commentlist"
              />
            </main>

            <aside class="sidebar">
                <br/>
                <br/>
                <h3>Add a comment to this Poll.{this.props.parent}</h3>
                <textarea rows="5" cols="35" placeholder={this.state.comment_holder} onChange={this.myChangeHandler} value={this.state.post_text}/>
                <br/><br/>
                <form onSubmit={this.submitHandler}>
                    <input type="submit" value="Comment"/>
                    <br/>
                    {this.state.errorMessage !== "" ? this.state.errorMessage : <div/>}
                    <br />
                </form>
            </aside>
            
        </div>
      );
  }
}
