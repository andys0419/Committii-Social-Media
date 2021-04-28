import React from "react";
import "./privacy-settings.css";
import backarrow from "../assets/back_arrow.svg";
import {
  Link
} from 'react-router-dom';

const Checkbox = props => (
  <input type="checkbox" {...props} />
)

export default class PrivacySettings extends React.Component {
    constructor() {
        super();
      }
      render() {
        return (
          <div className="App">
            <canvas id="Box"></canvas>
            <p id="priv">Privacy Settings</p>
            <Link to={"/profile/"+sessionStorage.getItem("user")}>
            <img id="back"
              src={backarrow}
              className="back-arrow"
            />
            </Link>
            <p id="text">Only share content with:</p>
            <p id="text1">Followers</p>
            <p id="text2">Followers and Non-Followers</p>
            <Checkbox id="check1"/>
            <Checkbox id="check2"/>
            <Link to={"/profile/"+sessionStorage.getItem("user")}><button id="save-button">Save</button></Link>
          </div>
        );
      }
}