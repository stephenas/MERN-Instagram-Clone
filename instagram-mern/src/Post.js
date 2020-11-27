import React, { useState, useEffect } from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import MoreHorizOutlinedIcon from "@material-ui/icons/MoreHorizOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import { db } from "./firebase";
import firebase from "firebase";
function Post({ postId, dp, user, username, caption, imageUrl }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);
  const postComment = (e) => {
    e.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user?.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };
  console.log("Post Id - ", postId);
  return (
    <div className="post">
      {/* header => Avatar and Username */}
      <div className="post__header">
        <Avatar alt={username} src={dp} className="post__avatar"></Avatar>
        <h3>{username}</h3>
        <MoreHorizOutlinedIcon fontsize="large" className="threeDot" />
      </div>
      {/* image */}
      <img src={imageUrl} alt="" className="post__image" />
      {/* username and caption */}
      <div className="icons">
        <div className="firstThree">
          <FavoriteBorderOutlinedIcon
            style={{ fontSize: 30 }}
            className="favIcon"
          />
          <ModeCommentOutlinedIcon
            style={{ fontSize: 30 }}
            className="commentIcon"
          />
          <SendOutlinedIcon style={{ fontSize: 30 }} className="sendIcon" />
        </div>
        <div className="save">
          <BookmarkBorderOutlinedIcon
            style={{ fontSize: 30 }}
            className="saveIcon"
          />
        </div>
      </div>
      <h4 className="post__description">
        <strong>{username} </strong>
        {caption}
      </h4>
      <div className="post__comments">
        {comments.map((comment) => (
          <p>
            <b>{comment.username}</b> {comment.text}
          </p>
        ))}
      </div>
      {user && (
        <form className="post__commentBox">
          <input
            className="post__input"
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            disabled={!comment}
            className="post__button"
            type="submit"
            onClick={postComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}
export default Post;
