import React from "react";
import {
  Link
} from 'react-router-dom';
import prof from './prof.png';
import "./profile-page.css";

export default class ProfilePage extends React.Component {
  constructor() {
    super();

    this.state = {
      username: 'Ryan Doohan',
      following: 0,
      followers: 0
    };
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={prof} className="prof_pic" alt="logo" />
          <p id="welcome">Hello, {this.state.username}</p>
          <p id="following">{this.state.following} Following</p>
          <p id="followers">{this.state.followers} Followers</p>

          <Link to="/profilesettings"><button id="edit_prof">Edit Profile</button></Link>
          <Link to="/privacy-settings"><button id="edit_priv">Privacy Settings</button></Link>

          <svg id="logo" width="82" height="82" viewBox="0 0 82 82" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M45.4441 39.9534L36.3011 49.0965C35.3631 50.0343 33.8425 50.0345 32.9043 49.0965C31.9663 48.1586 31.9663 46.6377 32.9043 45.6997L42.0473 36.5566C39.8248 33.8673 38.2458 30.8216 37.3119 27.6255L2.61194 64.4013C-0.953099 68.2066 -0.857344 74.0754 2.82955 77.7623L4.23881 79.1716C7.92586 82.859 13.7951 82.9538 17.6059 79.3834L54.3751 44.6888C51.179 43.755 48.1334 42.1759 45.4441 39.9534Z" fill="#FFFCFC"/>
          <path d="M45.432 7.77734L74.2242 36.5682C70.7287 39.3384 66.3092 40.9926 61.5039 40.9926C50.1846 40.9926 41.0078 31.8157 41.0078 20.4963C41.0078 15.691 42.6619 11.2729 45.432 7.77734Z" fill="#FFFCFC"/>
          <path d="M82 20.4963C82 25.2793 80.3603 29.6796 77.6158 33.1672L48.8332 4.38429C52.3208 1.6397 56.721 0 61.5039 0C72.8232 0 82 9.1769 82 20.4963Z" fill="#FFFCFC"/>
          </svg>
          <svg id="logo_text" width="150" height="30" viewBox="0 0 150 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.22 29.42C6.14 29.42 3.94667 28.615 2.64 27.005C1.35667 25.3717 0.715 23.0267 0.715 19.97V9.75C0.715 6.62333 1.35667 4.26667 2.64 2.68C3.92333 1.07 6.11667 0.264999 9.22 0.264999C12.1833 0.264999 14.2833 0.976665 15.52 2.4C16.7567 3.82333 17.375 5.84167 17.375 8.455V10.905H11.25V8.07C11.25 6.97333 11.1333 6.13333 10.9 5.55C10.6667 4.96667 10.1067 4.675 9.22 4.675C8.33333 4.675 7.75 4.99 7.47 5.62C7.19 6.22667 7.05 7.07833 7.05 8.175V21.51C7.05 22.63 7.19 23.4933 7.47 24.1C7.77333 24.6833 8.35667 24.975 9.22 24.975C10.0833 24.975 10.6317 24.6833 10.865 24.1C11.1217 23.4933 11.25 22.63 11.25 21.51V18.535H17.375V20.985C17.375 23.645 16.7567 25.7217 15.52 27.215C14.2833 28.685 12.1833 29.42 9.22 29.42ZM28.9417 29.42C25.885 29.42 23.7033 28.6383 22.3967 27.075C21.09 25.4883 20.4367 23.155 20.4367 20.075V9.54C20.4367 6.46 21.09 4.15 22.3967 2.61C23.7033 1.04667 25.885 0.264999 28.9417 0.264999C32.0217 0.264999 34.215 1.04667 35.5217 2.61C36.8517 4.17333 37.5167 6.48333 37.5167 9.54V20.075C37.5167 23.155 36.8517 25.4883 35.5217 27.075C34.215 28.6383 32.0217 29.42 28.9417 29.42ZM28.9417 24.975C29.8283 24.975 30.4117 24.6833 30.6917 24.1C30.9717 23.4933 31.1117 22.6767 31.1117 21.65V8C31.1117 6.95 30.9717 6.13333 30.6917 5.55C30.4117 4.96667 29.8283 4.675 28.9417 4.675C28.1017 4.675 27.5417 4.97833 27.2617 5.585C26.9817 6.16833 26.8417 6.97333 26.8417 8V21.65C26.8417 22.6767 26.97 23.4933 27.2267 24.1C27.4833 24.6833 28.055 24.975 28.9417 24.975ZM41.7145 0.649998H48.4345L51.5495 17.135L54.9095 0.649998H61.3845L61.8745 29H57.4295L56.9045 10.135L53.6145 29H49.6595L46.1595 9.995L45.7395 29H41.2245L41.7145 0.649998ZM66.358 0.649998H73.078L76.193 17.135L79.553 0.649998H86.028L86.518 29H82.073L81.548 10.135L78.258 29H74.303L70.803 9.995L70.383 29H65.868L66.358 0.649998ZM90.6516 0.649998H96.9166V29H90.6516V0.649998ZM103.699 5.305H99.4289V0.649998H114.234V5.305H109.999V29H103.699V5.305ZM119.285 5.305H115.015V0.649998H129.82V5.305H125.585V29H119.285V5.305ZM132.351 0.649998H138.616V29H132.351V0.649998ZM142.878 0.649998H149.143V29H142.878V0.649998Z" fill="white"/>
          </svg>
        </header>
        <div className="Feed">
          <canvas id="Polls"></canvas>
          <p id="curr_polls">Current Polls:</p>
          <p id="prev_polls">Previous Polls:</p>
          <p id="poll1">Cats vs. Dogs</p>
          <button id="view_res">View Results</button>
          <button id="del_post">Delete</button>
          <p id="poll2">Cats vs. Dogs</p>
          <button id="view_res2">View Results</button>
          <button id="del_post2">Delete</button>
        </div>
      </div>
    );
  }
}