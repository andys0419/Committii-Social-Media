import React from "react";
import { Link } from 'react-router-dom';
import committiilogo from "../assets/logo.svg";
import CommentsList from "./CommentsList.jsx";
import "./CommentForm.css"
import backarrow from "../assets/back_arrow.svg";
import "../App.css";

export default class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post_text: "",
      comment_holder: "You are messaging as: " + sessionStorage.getItem("username"),
      errorMessage: "",
      recipientUserID: "",
    };
    this.postListing = React.createRef();
  }

  submitHandler = event => {
    let i = 0;
    let k = 0;
    while (k < 2) {
        while (i < 10) {
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
            fetch(process.env.REACT_APP_API_PATH + "/users?email=" + this.state.recipientUserID, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem("token")
                }

            })
                .then(res => res.json())
                .then(
                    result => {
                        if (result) {

                            //result[0].forEach(element => {if (element.username){names.push(element)}});

                            this.setState({
                                //users: names,
                                errorMessage: result[0][0].id,
                                responseMessage: result.Status
                            });
                            //console.log(result[0][0].id);
                            console.log("EMAIL");
                            console.log(this.state.recipientUserID);

                        }
                    },
                    error => {
                        alert("error!");
                    }
                )


            fetch(process.env.REACT_APP_API_PATH + "/messages", {
                method: "post",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem("token")
                },
                body: JSON.stringify({
                    authorID: sessionStorage.getItem("user"),
                    content: postMsg,
                    recipientUserID: this.state.errorMessage
                })
            })
                .then(res => res.json())
                .then(
                    result => {
                        //console.log("ID");
                        //console.log(this.state.errorMessage);
                        this.setState({
                            errorMessage: "Your message has been sent!"
                        })

                        // update the count in the UI manually, to avoid a database hit
                        //this.props.onAddComment(this.props.commentCount + 1);
                        //this.postListing.current.loadPosts();
                    },
                    error => {
                        alert("error!");
                    }
                );
            i = i + 1;
        } k = k + 1;
    }
  };

  // this method will keep the current post up to date as you type it,
  // so that the submit handler can read the information from the state.

  myChangeHandler = event => {
    this.setState({
      post_text: event.target.value

    });
  };

  myChangeHandler2 = event => {
    this.setState({
        recipientUserID: event.currentTarget.value
    });
  };


  updatePostText = (e) => {
    this.setState({
      post_text: e.currentTarget.value
    })
  }

  //updatePostText = (e) => {
  //  this.setState({
  //    post_text: e.currentTarget.value
  //  })
  //}

  render() {

    return (

        <div class="site">

            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <header class="masthead">
              <Link to="/profile"><img id="committi_logo" src={committiilogo}></img></Link>
                <div className="messageOptions">
                    <Link to="/messages">
                        <img id="backarrow" src={backarrow}></img>
                    </Link>
                    <h2 className="messageName2">Send Message</h2>
                    </div>

            </header>

            <main id="content" class="message-content">

              <br/>
              {/*
               <CommentsList
                ref={this.postListing}
                parentid={this.props.parent}
                type="commentlist"
              />*/}
                <br></br>
                <h3>Enter the Email of the person you want to message</h3>
                <textarea rows="1" cols="50" placeholder="name@email.com" onChange={this.myChangeHandler2} value={this.state.recipientUserID}/>

                <h3>Type in message below</h3>


                <textarea rows="5" cols="115" placeholder={this.state.comment_holder} onChange={this.myChangeHandler} value={this.state.post_text}/>
                <br/><br/>
                 <p> Please click "Send Message" 5-6 times to guarantee message delivery</p>
                <form onSubmit={this.submitHandler}>
                    <input type="submit" value="Send Message"/>
                    <br/>
                    {this.state.errorMessage !== "" ? this.state.errorMessage : <div/>}
                    <br />
                </form>
            </main>

        </div>
      );
  }
}
