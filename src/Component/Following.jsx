import React from "react";
import { Link } from "react-router-dom";

import "../App.css";
import blockIcon from "../assets/block_white_216x216.png";
import unblockIcon from "../assets/thumbsup.jpg";
import backarrow from "../assets/back_arrow.svg";

export default class Following extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: props.userid,
      connections: []
    };
  }

  componentDidMount() {
    this.loadFriends();
  }

  loadFriends() {

    fetch(process.env.REACT_APP_API_PATH+"/connections?userID="+sessionStorage.getItem("user")+"&type=isFollowing&status=active", {
      method: "get",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem("token")
      }
     })
      .then(res => res.json())
      .then(
        result => {
          if (result) {
            this.setState({
              isLoaded: true,
              connections: result[0]
            });
          }
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  updateConnection(id, status){
    //make the api call to the user controller
    fetch(process.env.REACT_APP_API_PATH+"/connections/"+id, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem("token")
      },
      body: JSON.stringify({
        status: status
      })
    })
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            responseMessage: result.Status
          });
          this.loadFriends();
        },
        error => {
          alert("error!");
        }
      );
  }

  conditionalAction(status, id){
    if (status == "active"){
      return(

      <img
        src={blockIcon}
        className="sidenav-icon deleteIcon"
        alt="Block User"
        title="Block User"
        onClick={e => this.updateConnection(id, "blocked")}
      />
    )
    }else{
      return(
      <img
        src={unblockIcon}
        className="sidenav-icon deleteIcon"
        alt="Unblock User"
        title="Unblock User"
        onClick={e => this.updateConnection(id, "active")}
      />
    )
    }
  }

  render() {
    //this.loadPost();
    const {error, isLoaded, connections} = this.state;
    if (error) {
      return <div> Error: {error.message} </div>;
    } else if (!isLoaded) {
      return <div> Loading... </div>;
    } 
    else if (connections.length == 0) {
      return (
        <div className="emptylist">
            You currently are not following anyone. 
        </div>
      );
    } 
    else {
      return (
        <div className="posts">
          <Link to="/profile">
                <img id="backarrow" src={backarrow}></img>
          </Link>
          <ul>
            {connections.map(connection => (
              <div key={connection.id} className="userlist">
                {/* {connection.connectedUser.email} - {connection.type} - {connection.status} */}
                {connection.connectedUser.email} - {connection.status}
                <div className="deletePost">
                {this.conditionalAction(connection.status, connection.id)}
                </div>
              </div>
            ))}
          </ul>
        </div>
      );
    }
  }
}
