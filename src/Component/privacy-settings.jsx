import React from "react";
import "./privacy-settings.css";
import backarrow from "../assets/back_arrow.svg";

export default class PrivacySettings extends React.Component {
    constructor() {
        super();
      }
      render() {
        return (
          <div className="App">
            <canvas id="Box"></canvas>
            <p id="priv">Privacy Settings</p>
            <img id="back"
              src={backarrow}
              className="back-arrow"
            />
          </div>
        );
      }
}