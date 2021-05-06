import React from "react";
import "../App.css";
import { Link } from 'react-router-dom';
import committiilogo from "../assets/logo.svg";
import backarrow from "../assets/back_arrow.svg";
import create_message from "../assets/compose.png";



export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      messages: [],
      authors: [],
      currentauthor: "",
      username: "",
      password: "",
      confirm: "",
      listType: props.listType,
      alanmessage: "",
      errormessage: "",
      sessiontoken: "",
      redir: false,
      email: sessionStorage.getItem("username")
    };
  }

  componentDidMount() {
      fetch(process.env.REACT_APP_API_PATH + "/messages?recipientUserID=" + sessionStorage.getItem("user"), {
          method: "get",
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + sessionStorage.getItem("token")
          }
      })
          .then(res => res.json())
          .then(
            result => {
              this.loadPosts();
            }
          )
      ;
  }
  loadPosts() {
    let url = process.env.REACT_APP_API_PATH+"/messages?authorID="+sessionStorage.getItem("currentauthorID")+"&recipientUserID="+sessionStorage.getItem("user");
    // /posts/1
    if (this.props && this.props.parentid){
      url += this.props.parentid;
    }
    fetch(url, {
      method: "get",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(
        result => {
          if (result[0]) {
            let resultarr = result[0].map(a => a.content);
            let uniqueItems = [...new Set(resultarr)]
            console.log(uniqueItems)
            this.setState({
              isLoaded: true,
              authors: uniqueItems
            });
            this.render()
            console.log("Got SPECIFIC");
            console.log(result[0]);
          }
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
          console.log("ERROR loading Messages")
        }
      );
  }

  createPost(post) {
   return (
    <div class = "messageFeed">
      <div class = "messageInd">
        <p class='viewMessage2'>{post}</p>
      </div>
    </div>
   )

  }

  funt1(post){
      sessionStorage.setItem("currentauthor",post)
  }




  render() {
    if (this.state.authors.length === 0) this.loadPosts()
    return (
      <div class = "feed">
        <Link to="/feed">
          <img id="committii-logo" alt="Committii Logo" src={committiilogo}></img>
        </Link>

        <div class="feedOptions">
          <div class="vLeft">
            <button class="feedSort2"><Link to="/messages">
                    <img id="backarrow" alt="Back arrow" src={backarrow}></img>
            </Link></button>
          </div>
            <div className="vRight">
                <p className="feedProfile6"> Compose New Message  </p>
                <button className="feedSort2"><Link to="/createmessage">
                    <img alt="Send Message" id="create_message"  src={create_message}></img>
                </Link></button>
            </div>

          <p class="feedProfile2"> Messages from {sessionStorage.getItem("currentauthor")} </p>

        </div>

        {this.state.authors.map(authors => this.createPost(authors))}
      </div>

    );
  }
}