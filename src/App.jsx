/*
  App.js is the starting point for the application.   All of the components in your app should have this file as the root.
  This is the level that will handle the routing of requests, and also the one that will manage communication between
  sibling components at a lower level.  It holds the basic structural components of navigation, content, and a modal dialog.
*/

import React from "react";
import "./App.css";
import PostForm from "./Component/PostForm.jsx";
import PostingList from "./Component/PostingList.jsx";
import Post from "./Component/Post.jsx";
import LoginForm from "./Component/LoginForm.jsx";
import FriendForm from "./Component/FriendForm.jsx";
import Modal from "./Component/Modal.jsx";
import Feed from "./Component/feed.jsx";
import Profile from "./Component/profile-page.jsx";
import Followers from "./Component/MyFollowers";
import Following from "./Component/Following.jsx";
import StyleGuide from "./Component/styleguide";
import ProfileSettings from "./Component/ProfileSettings.jsx";
import Register from "./Component/Register.jsx";
import PrivacySettings from "./Component/privacy-settings.jsx";
import ForgotPassword from "./Component/ForgotPassword.jsx"
import CheckEmail from "./Component/CheckEmail.jsx"
import PollPage from "./Component/poll-page.jsx"
import CommentForm from "./Component/CommentForm.jsx"
import CreatePoll from "./Component/create-poll.jsx"
import CloseAccount from "./Component/CloseAccount.jsx";
import CloseAccountFeedback from "./Component/CloseAccountFeedback.jsx";


import {
  BrowserRouter as Router, Route, Switch, Link
} from 'react-router-dom';

// toggleModal will both show and hide the modal dialog, depending on current state.  Note that the
// contents of the modal dialog are set separately before calling toggle - this is just responsible
// for showing and hiding the component
function toggleModal(app) {
  app.setState({
    openModal: !app.state.openModal
  });
}

// the App class defines the main rendering method and state information for the app
class App extends React.Component {

  // the only state held at the app level is whether or not the modal dialog
  // is currently displayed - it is hidden by default when the app is started.
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      refreshPosts: false
    };

    // in the event we need a handle back to the parent from a child component,
    // we can create a reference to this and pass it down.
    this.mainContent = React.createRef();
    this.doRefreshPosts = this.doRefreshPosts.bind(this);
  }

  // doRefreshPosts is called after the user logs in, to display relevant posts.
  // there are probably more elegant ways to solve this problem, but this is... a way
  doRefreshPosts() {
    this.setState({
      refreshPosts:true
    });
  }

  render() {

    return (

      // the app is wrapped in a router component, that will render the
      // appropriate content based on the URL path.  Since this is a
      // single page app, it allows some degree of direct linking via the URL
      // rather than by parameters.  Note that the "empty" route "/", which has
      // the same effect as /posts, needs to go last, because it uses regular
      // expressions, and would otherwise capture all the routes.  Ask me how I
      // know this.
      <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/profilesettings">
          <ProfileSettings toggleModal={e => toggleModal(this, e)}></ProfileSettings>
        </Route>
        
      </Switch>
      <Switch>
        <Route path="/register">
          <register>
              <div className="navbar">
                <Link to="/">
                  <cz id="MicImage">
                    <img src="Images/committii logo.JPG"></img>
                    <c>COMMITTII</c>
                  </cz>
                </Link>
              </div>
              <Register toggleModal={e => toggleModal(this, e)}></Register>
            </register>
        </Route>
        <Route path="/privacy-settings" component={PrivacySettings}/>
        <Route path="/pollpage/:postid/comments" component={CommentForm}/>
        <Route path="/pollpage/:postid" component={PollPage}/>
        <Route exact path="/createpoll" component={CreatePoll}/>
        <Route path="/PostForm" component={PostForm}/>
        <Route path="/PostingList" component={PostingList}/>
        <Route path="/post" component={Post}/>
      </Switch>
        <Switch>
          <Route path="/login">
            <login>
              <div id="navbar" className="navbar">
                <Link to="/">
                  <cz>
                    <img src="Images/committii logo.JPG"></img>
                    <c>COMMITTII</c>
                  </cz>
                </Link>
              </div>
              <LoginForm toggleModal={e => toggleModal(this, e)}></LoginForm>
            </login>
          </Route>
        </Switch>
        <Switch>
          <Route path="/closeaccount">
            <CloseAccount toggleModal={e => toggleModal(this, e)}></CloseAccount>
          </Route>
        </Switch>
          <Switch>
            <Route path="/closeaccountfeedback">
              <CloseAccountFeedback toggleModal={e => toggleModal(this, e)}></CloseAccountFeedback>
            </Route>
          </Switch>
        <Switch>
          <Route path="/forgotpassword">
            <div id="navbar" className="navbar">
                <Link to="/">
                  <cz>
                    <img src="Images/committii logo.JPG"></img>
                    <c>COMMITTII</c>
                  </cz>
                </Link>
              </div>
            <ForgotPassword toggleModal={e => toggleModal(this, e)}></ForgotPassword>
        </Route>
        </Switch>
        <Switch>
          <Route path="/checkemail">
            <div id="navbar" className="navbar">
                <Link to="/">
                  <cz>
                    <img src="Images/committii logo.JPG"></img>
                    <c>COMMITTII</c>
                  </cz>
                </Link>
              </div>
            <CheckEmail toggleModal={e => toggleModal(this, e)}></CheckEmail>
          </Route>
        </Switch>
        <Switch>
          <Route path="/profile">
            <Profile toggleModal={e => toggleModal(this, e)}></Profile>
          </Route>
        </Switch>
        <Switch>
          <Route path="/comment">
            <CommentForm toggleModal={e => toggleModal(this, e)}></CommentForm>
          </Route>
        </Switch>
        <Switch>
          <Route path="/feed">
            <Feed toggleModal={e => toggleModal(this, e)}></Feed>
          </Route>
        </Switch>
        <Switch>
          <Route path="/followers">
            <Followers toggleModal={e => toggleModal(this, e)}></Followers>
          </Route>
        </Switch>
        <Switch>
          <Route path="/following">
            <Following toggleModal={e => toggleModal(this, e)}></Following>
          </Route>
        </Switch>
        <Switch>
          <Route path="/styleguide">
          <div id="navbar" className="navbar">
            <Link to="/">
              <cz>
                <img src="Images/committii logo.JPG"></img>
                <c>COMMITTII</c>
              </cz>
            </Link>
          </div>
            <StyleGuide toggleModal={e => toggleModal(this, e)}></StyleGuide>
          </Route>
        </Switch>
          <Route exact path="/">
            <homepage>
              <div id="navbar" className="navbar">
                <img src="Images/committii logo.JPG"></img>
                <c>COMMITTII</c>
                <Link to="/login"><ld>Login</ld></Link>
                <Link to="/styleguide"><ld>Style Guide</ld></Link>
              </div>
              <div className="homebody" id="homebody">
                 <div class="text">
                  <t>LIFE, BY COMMITTII.</t>
                  <b>Create your own polls, View other user polls, and Vote on a Poll of your choice.</b>
              </div>
                <img src="Images/graphs.JPG"></img>
              </div>
            </homepage>
          </Route>
      </Router>
    );
  }
}

// export the app for use in index.js
export default App;
