import React from "react";
import "./styleguide.css";
import logo from "../assets/logo.svg";
import icon from "../assets/icon.svg";
import color from "../assets/color_palette.png";

export default class StyleGuide extends React.Component {
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
                alt="Committii Logo"
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
                alt="Committii Icon"
              />
            </div>
            
            <div id="colorpallete">
              <p id="SectionTitle">Color Palettes</p>
              <p id="genText">No color values other than those listed below should be used.
                              Variations of tints and shades of color is not permitted on our platform,
                              or in our web application.
                              <ul>
                                <li>#FFFFA should be used for general text within the platform.</li>
                                <li>#515052 and #333138 should be used for buttons that navigate to/from a page within the platform.</li>
                                <li>#000103 is the background color of the site.</li>
                                <li>#333138 should be used for important buttons that allow login, registration, resetting credientials, and closing an account.</li>
                                <li>#FF312E should be used for error messages/error handling.</li>
                              </ul> 
              </p>
              <img
                src={color}
                id="genPallete"
                alt="Color pallete"
              />
            </div>

            <div id="fonts">
              <p id="SectionTitle">Fonts:</p>
              <p id="oswaldTitles">Oswald</p>
              <p id="oswaldText">Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz.</p>
              <p id="poppinsTitles">Poppins</p>
              <p id="poppinsText">Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz.</p>
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
              <p id="genText">General pages which involve inputting into text fields and clicking a button will have error inline messages when the member either inputs nothing or an invalid input.
                  Inline error messages are to ensure that fields are filled in a complete manner, and will prompt in #FF312E (red) with an error message if it is not.
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
