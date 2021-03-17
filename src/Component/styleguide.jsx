import React from "react";
import "./styleguide.css";
import logo from "../assets/logo.svg";

export default class StyleGuide extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
            <p id="title">Committii Style Guide</p>
        </header>
        <p id="logo_title">The <i>Committii</i> Logo</p>
        <p id="logo_desc">The logo is formed by Committi's icon, the microphone as well as our brand name, Committi shown beside our icon in the Oswald font.</p>
        <img
              src={logo}
              className="logo_photo"
            />
      </div>
    );
  }
}