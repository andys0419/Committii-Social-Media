import React from "react";
import "./privacy-settings.css";
import backarrow from "../assets/back_arrow.svg";
import {
  Link
} from 'react-router-dom';

export default class PrivacySettings extends React.Component {
    constructor() {
        super();
      }
      render() {
        return (
          <div className="App">
            <canvas id="Box"></canvas>
            <p id="priv">Privacy Settings</p>
            <Link to="/profile">
            <img id="back"
              src={backarrow}
              className="back-arrow"
            />
            </Link>
          </div>
        );
      }
}