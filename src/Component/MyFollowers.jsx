import React from "react";
import { Link } from "react-router-dom";

import "../App.css";
import blockIcon from "../assets/block_white_216x216.png";
import unblockIcon from "../assets/thumbsup.jpg";
import backarrow from "../assets/back_arrow.svg";
import prof_pic from "../assets/profile-picture-holder.png";

export default class Followers extends React.Component {
  constructor(props) {
    super(props);
    let { userid } = this.props.match.params;
    this.state = {
      userid: userid,
      connections: []
    };
  }

  componentDidMount() {
    this.loadFriends();
  }

  loadFriends() {

    fetch(process.env.REACT_APP_API_PATH+"/connections?userID="+this.state.userid+"&type=follower&status=active", {
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
    
    //make the api call to the user controller, blocks the member
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

  displayProfilePic(userID) {
    fetch(process.env.REACT_APP_API_PATH+"/users/"+ userID, {
      method: "get",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem("token")
      }
    })
   .then(res => res.json())
   .then(
     result => {
       console.log(result)
       if (result.role == ""){
         document.getElementById("prof_pic").src = prof_pic
       }
       else{
       var server = process.env.REACT_APP_API_PATH.slice(0, -4) + "/";
       console.log(result.role)
       document.getElementById("prof_pic").src = server + result.role
     }
     })
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
            You currently do not have any followers.
        </div>
      );
    } 
    else {
      return (
        <div className="card_row">
          <Link to={"/profile/" + this.state.userid}>
                <img id="backarrow" src={backarrow}></img>
          </Link>
          {connections.map(connection => ( 
             <div className="card_column">  
              <div key={connection.id} className="card">
                {/* Only use the line below for debugging purposes */}
                {/* {connection.connectedUser.email} - {connection.type} - {connection.status} */}
                <br/>
                <Link to={"/profile/" + connection.connectedUser.id} className="profile_link">{connection.connectedUser.email}</Link>
                <div className= "img_container">
                  <img src={this.displayProfilePic(connection.connectedUser.id)} id="prof_pic" alt="Profile picture"/>
                </div>
                {connection.connectedUser.status}
                {this.conditionalAction(connection.status, connection.id)}
              </div>
              </div>
            ))}
        </div>
      );
    }
  }
}
