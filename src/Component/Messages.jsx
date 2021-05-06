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
    fetch(process.env.REACT_APP_API_PATH + "/messages?recipientUserID="+sessionStorage.getItem("user"), {
      method: "get",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(
        result => {
          this.loadPosts();
        }
      )
  }

  loadPosts() {
    let url = process.env.REACT_APP_API_PATH+"/messages?recipientUserID="+sessionStorage.getItem("user");
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
          if (result) {
            let resultarr = result[0].map(a => a.author.email);
            let uniqueItems = [...new Set(resultarr)]
            console.log(uniqueItems)
            this.setState({
              isLoaded: true,
              authors: uniqueItems
            });
            ;
            console.log("Got Messages");
            console.log(result[0]);
            this.render()
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
        <p class="likeButton">{post}</p>
        <Link to="/messagedetails"><button class="viewMessage" onClick={() => this.funt1(post)}>View Message</button> </Link>
      </div>
    </div>
   )

  }

  funt1(post){
      sessionStorage.setItem("currentauthor",post)

      fetch(process.env.REACT_APP_API_PATH+"/users?email="+post, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem("token")
      }

    })
      .then(res => res.json())
      .then(
        result => {
          if (result) {

            //result[0].forEach(element => {if (element.username){names.push(element)}});

             sessionStorage.setItem("currentauthorID",result[0][0].id)

            //console.log(result[0][0].id);
            console.log("EMAILID");
            console.log(result[0][0].id);
          }
        },
        error => {
          alert("error!");
        }
      )
  }




  render() {
    return (
      <div class = "feed">
        <Link to="/feed">
          <img id="committii-logo" alt="Committii Logo" src={committiilogo}></img>
        </Link>

        <div class="feedOptions">
          <div class="vLeft">
            <button class="feedSort2"><Link to="/feed">
                    <img id="backarrow" alt="Back arrow" src={backarrow}></img>
            </Link></button>
          </div>
            <div className="vRight">
                <p className="feedProfile6"> Compose New Message  </p>
                <button className="feedSort2"><Link to="/createmessage">
                    <img id="create_message" alt="Create message button" src={create_message}></img>
                </Link></button>
            </div>

          <p class="feedProfile4">Messages</p>

        </div>

        {this.state.authors.map(authors => this.createPost(authors))}
      </div>

    );
  }
}