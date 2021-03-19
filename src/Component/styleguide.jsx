import React from "react";
import "./styleguide.css";
import logo from "../assets/logo.svg";
import icon from "../assets/icon.svg";
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
          <div id="GeneralLayout">
            <div id="SectionTitle">Committii Style Guide</div>
            
            <div id="logo">
              <p id="SectionTitle">Logo</p>
              <p id="genText">Our company logo consist of a minimalistic microphone. 
                      It also features our brand name, <i>'Committi'</i> shown beside our icon in the Oswald font.
                      We take pride in this logo, and require that be presented as is. It should not be altered without
                      permission from Elmas Eugenia.
              </p>
              <img
                src={logo}
                id="genImage"
              />
            </div>
            
            <div id="icon">
              <p id="SectionTitle">Icon</p>
              <p id="genText">Our company logo consist of our signature microphone. It symbolizes our groups committment
                      to creating a platform for free thought, where the voice of the people can be heared. 
                      Elmas Eugenia permits the reuse of this icon, with the condition that the artwork itself
                      is not altered to damage the image of our platform.
              </p>
              <img
                src={icon}
                id="genIcon"
              />
            </div>
            
            <div id="colorpallete">
              <p id="SectionTitle">Color Palettes</p>
              <p id="genText">No color values other than those listed below should be used. 
                              Variations of tints and shades of color is not permitted on our platform,
                              or in our web application.
              </p>
              <img
                src={color}
                id="genPallete"
              />
            </div>

            <div id="fonts">
              <p id="SectionTitle">Fonts:</p>
              {/* INSERT FONT HEADER AND DESCRIPTION IN HERE! */}
              {/* LOOK AT EXAMPLES ABOVE FOR GUIDANCE */}
             
            </div>
          
          <div id="SectionTitle">General Layout:</div>
              <t id="genTitles">Transition Between Pages:</t>
              <p id="genText">Elmas Eugenia is dedicated to creating a friendly user interface that is easy to navigate.
                  Hence, we have simple navigation procedures through the Committii logo, message indicator, profile indicator,
                  and login button. The Committii logo will lead you back to your feed, or back to landing page if not logged in
                  Clicking the profile picture indicator will take you to your profile page.
                  Clicking on the messages indicator will open a dropdown messages menu.
                  The login button will appear when not logged in, and will open the login page.
              </p>
            <t id="genTitles">Positioning Guidelines:</t>
              <p id="genText">Sections as a whole are centered.
                  Content within a section is also centered.
                  Headers are centered.
                  Description text is left-aligned.
                  Any scroll bars are on the left hand side of the page.
              </p>
            <t id="genTitles">Styles for Popups:</t>
              <p id="genText">Entry Animation: Upon clicking a button, popups slide down the application, and typically to the right of the screen.
                  Exit Animation: Slide back in from where it arrived, or click on the button associated with the popup.
                  Messages pop up menu will slide down as it is a drop down.
              </p>
            <t id="genTitles">Inline Error Messages:</t>
              <p id="genText">Login and register will have error inline messages when the user does not enter a valid email address or an incorrect password.
                  Resetting a password will invoke an error if an invalid email format is entered.
		              Posts have inline error messages if poll creation fields are not filled in a complete manner.
              </p>
            <t id="genTitles">Feedback:</t>
              <p id="genText">On buttons, we switch to a hand cursor, to indicate the presence of a clickable event. 
              On text fields, we switch to an I-beam pointer. Any links will have intuitive cues; bold text, underlined, colored text. 
              Scroll bar will indicate there is more content to be scrolled through.
              </p>
          </div>
    );
  }
}
