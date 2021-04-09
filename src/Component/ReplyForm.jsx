import React from "react";
import ReplyList from "./ReplyList.jsx";
import "./ReplyForm.css"


export default class ReplyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          post_text: "",
          comment_holder: "You are replying as: " + sessionStorage.getItem("username"),
          errorMessage: "",
        };
        this.postListing = React.createRef();
    }

    submitHandler = event => {
        //keep the form from actually submitting
        event.preventDefault();
    
        const postMsg = this.state.post_text;
    
        if (postMsg == '') {
          this.setState({
            errorMessage: "Please enter a reply."
          })
          return;
        } else {
    
          this.setState({
            errorMessage: ""
          })
        }
    
        //make the api call to the authentication page
    
        fetch(process.env.REACT_APP_API_PATH +"/posts", {
          method: "post",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+sessionStorage.getItem("token")
          },
          body: JSON.stringify({
            authorID: sessionStorage.getItem("user"),
            parentID: this.props.parent,
            content: sessionStorage.getItem("current_content"),
            type: "replies",
            thumbnailURL: this.state.post_text
          })
        })
          .then(res => res.json())
          .then(
            result => {
              
              this.setState({
                errorMessage: "Your reply has been posted!"
              })

              //sessionStorage.setItem("current_content", this.state.post_text);
    
              // update the count in the UI manually, to avoid a database hit
              this.props.onAddComment(this.props.commentCount + 1);
              this.postListing.current.loadPosts();
            
              //this may or may not work as intended... needs to be tested.
              // document.getElementsById("comment_submit").style.display="none";
            },
            error => {
              alert("error here!");
            }
          );
      };
    
      myChangeHandler = event => {
        this.setState({
          post_text: event.target.value
        });
      };
    
      updatePostText = (e) => {
        this.setState({
          post_text: e.currentTarget.value
        })
      }

      render() {
        
        return (
            
            <div class="site">
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                
                <main id="content" class="main-content">
                    <h2>Replies</h2>
                    <br/>
                    <ReplyList
                        ref={this.postListing}
                        parentid={this.props.parent}
                        type="commentlist"
                    />
                    <br/>
                    <br/>
                    {/* Testing needed to make sure div dissapears upon clicking submit, and successful submission */}
                    <div id="comment_submit">
                        {/* Use the line below for debugging purposes only */}
                        {/* <h3>Reply to this comment.{this.props.parent}</h3> */}
                        <h3>Reply to this comment.</h3>
                        <textarea rows="5" cols="35" placeholder={this.state.comment_holder} onChange={this.myChangeHandler} value={this.state.post_text}/>
                        <br/><br/>
                        <form onSubmit={this.submitHandler}>
                            <input type="submit" value="Reply"/>
                            <br/>
                            {this.state.errorMessage !== "" ? this.state.errorMessage : <div/>}
                            <br />
                        </form>
                    </div>
                </main>
            
            </div>
        );



      }


}