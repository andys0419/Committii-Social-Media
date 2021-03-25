import React from "react";
import CanvasJSReact from '../canvasjs-3.2.11/canvasjs.react';
import { Link } from 'react-router-dom';
import "./poll-page.css";
import committiilogo from "../assets/logo.svg";
import backarrow from "../assets/back_arrow.svg";
import prof_pic from "../assets/profile-picture-holder.png";
import hearticon from "../assets/heart-icon.svg";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class ProfilePage extends React.Component {
  constructor() {
    super();

    this.state = {
        poll_option_1: "",
        poll_option_2: "",
        poll_category: ""
    };
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
    return (
      <div className="App">
          <Link to="/"><img id="comiti_logo" src={committiilogo}></img></Link>
          <Link to="/profile"><img id="backarrow" src={backarrow}></img></Link>
      </div>
    );
  }
}