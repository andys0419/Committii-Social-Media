import React from "react";
import "./styleguide.css";
import logo from "../assets/logo.svg";
import color from "../assets/color_palette.png";
import backarrow from "../assets/back_arrow.svg";
import {
  Link
} from 'react-router-dom';


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
          <div id="Logo">
            <p id="logo_title">The <i>Committii</i> Logo</p>
            <p id="logo_desc">The logo is formed by Committi's icon, the microphone as well as our brand name, Committi shown beside our icon in the Oswald font.</p>
            <img
              src={logo}
              className="logo_photo"
            />
          </div>
          <div id="GeneralLayout">
            <div id="SectionTitle">General Layout:</div>
            <t id="genTitles">Transition Between Pages:</t>
              <p id="genText">Based on the sidebar is the logo, messages, and your profile picture/login button.
		The logo will lead you back to your feed, or back to landing page if not logged in
		Clicking the profile picture will take you to your profile page.
		Clicking on the messages icon will open a dropdown messages menu.
		The login button will appear when not logged in, and will open the login page.</p>
            <t id="genTitles">Positioning Guidelines:</t>
              <p id="genText">Sections as a whole are centered.
		Content within a section is also centered.
		Headers are centered.
		Description text is left-aligned.
		Any scroll bars are on the left hand side of the page.
</p>
            <t id="genTitles">Styles for Popups:</t>
              <p id="genText">Entry Animation: Slide in pop ups from the right hand side of end location
		Exit Animation: Slide back in from where it arrived.
		Messages pop up menu will slide down as it is a drop down.
</p>
            <t id="genTitles">Inline Error Messages:</t>
              <p id="genText">Login and register will have error inline messages when the user does not enter   a valid email address or an incorrect password
		Posts will have inline error messages if there are not enough options for poll or missing a title
</p>
            <t id="genTitles">Feedback:</t>
              <p id="genText">On buttons, we switch to a cursor. On text fields, we switch to an I-beam pointer. Any links will have intuitive cues; blue text or underlined. Scroll bar will indicate there is more content to be scrolled through.
</p>
          </div>
      </div>
    );
  }
}
