import React from "react";
import "../App.css";
import CanvasJSReact from '../canvasjs-3.2.11/canvasjs.react';
import { Link } from 'react-router-dom';
import committiilogo from "../assets/logo.svg";
import backarrow from "../assets/back_arrow.svg";
import prof_pic from "../assets/profile-picture-holder.png";
import hearticon from "../assets/heart-icon.svg";

import {
    Redirect
} from 'react-router';
//import Autocomplete from "./Autocomplete.jsx";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      confirm: "",
      alanmessage: "",
      errormessage: "",
      sessiontoken: "",
      redir: false
    };
  }

  render() {
    CanvasJS.addColorSet("gray_color",
    ["#acacac"]);
    const options = {
        responsive: true,
        maintainAspectRation: false,
        axisY: {interval: 1, labelFontSize: 15},
        axisX: {labelFontSize: 16},
        width: 600,
        height: 245,
        colorSet: "gray_color",
        title: {
        text: ""
        
      },
      data: [{				
                type: "column",
                dataPoints: [
                    { label: "Dogs",  y: 2  },
                    { label: "Cats", y: 4  },
                ]
       }]
   }
    return (
      <div class = "feed">
        <Link to="/">
          <img id="committii-logo" src={committiilogo}></img>
        </Link>
        <div class="feedOptions">
          <div class="vLeft">

            <button class="feedSort">Sort</button>
          </div>
          <div class="vRight">
            <button class="feedMessages">Messages</button>
        </div>
          
          <Link to="/profile"><button class="feedProfile">Profile</button></Link>
          
          <div class = "feedPosts">
            <div class = "post">
              <p class="likeButton">Likes: 20</p>
              <Link to="/pollpage"><button class="commentButton">8 Comments</button></Link>
              <div class="chart">
                <CanvasJSChart options = {options}></CanvasJSChart>
              </div>
            </div>
            <div class = "post">
            </div>
          </div>
        </div>
      </div>
    );
  }
}