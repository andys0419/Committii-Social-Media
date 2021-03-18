import React from "react";
import "./styleguide.css";
import logo from "../assets/logo.svg";
import color from "../assets/color_palette.png";


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
        <img src={logo} className="logo_photo"/>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        <p id="color_title"><i>COLOR PALETTES</i></p>
        <p id="color_desc">No color values other than those listed in this section should be used. Various tints and shades of color is not permitted in our web application.</p>
        <img src={color} className="color_photo"/>

      </div>
    );
  }
}