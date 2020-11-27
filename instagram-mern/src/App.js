import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { db, auth } from "./firebase";
import { Input, Button, makeStyles, Modal } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
// import InstagramEmbed from 'react-instagram-embed'; HomeOutlinedIcon, SendOutlinedIcon, ExploreOutlinedIcon, FavoriteBorderOutlinedIcon, MoreHorizSharpIcon,  BookmarkBorderOutlinedIcon
import ImageUpload from "./ImageUpload";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import ExploreOutlinedIcon from "@material-ui/icons/ExploreOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
import axios from "./axios";

// "getModalStyle" from https://material-ui.com/components/modal/#modal
function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const [post, setPost] = useState([]);
  const [openSignUp, setOpenSingUp] = useState(false);
  const [openSignIn, setOpenSingIn] = useState(false);
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  // useEffect() is front end listener
  useEffect(() => {
    // backend listener
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user has logged in
        setUser(authUser);
      } else {
        //user has logged out
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user, userName]);

  // User Authentication for Sign Up
  const signUp = (event) => {
    event.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: userName,
        });
      })
      .catch((err) => alert(`Error : ${err.message}`));

    setOpenSingUp(false);
  };

  // User Authentication for Sign In
  const signIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((err) =>
        alert(`Error: This email is Invalid. Try to sign up and continue`)
      );

    setOpenSingIn(false);
  };

  //useEffect() => Runs a piece of code based on a specific condition
  useEffect(() => {
    //mongoDB
    /*const fetchPosts = async () => {
      await axios.get("./sync").then((response) => {
        console.log(response);
        setPost(response.data);
      });
      fetchPosts();
    };*/
    // firebase
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPost(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })))
      );
  }, []);

  console.log("post - ", post);

  return (
    <div className="app">
      <div className="header">
        <div className="header__logo">
          <img
            src="https://pngimage.net/wp-content/uploads/2018/06/instagram-font-png-1.png"
            alt=""
            className="header__image"
          />
        </div>
        <div className="iconContainer">
          <HomeOutlinedIcon style={{ fontSize: 30 }} className="home" />
          <SendOutlinedIcon style={{ fontSize: 27 }} className="home" />
          <ExploreOutlinedIcon style={{ fontSize: 30 }} className="home" />
          <FavoriteBorderOutlinedIcon
            style={{ fontSize: 30 }}
            className="home"
          />
        </div>

        <div className="loginButtons">
          <Modal open={openSignUp} onClose={() => setOpenSingUp(false)}>
            <div style={modalStyle} className={classes.paper}>
              <form className="header__signUp">
                <center>
                  <img
                    src="https://pngimage.net/wp-content/uploads/2018/06/instagram-font-png-1.png"
                    alt=""
                    className="header__image"
                  />
                </center>

                <Input
                  type="text"
                  placeholder="username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button onClick={signUp}>Sign Up</Button>
              </form>
            </div>
          </Modal>

          <Modal open={openSignIn} onClose={() => setOpenSingIn(false)}>
            <div style={modalStyle} className={classes.paper}>
              <form className="header__signUp">
                <center>
                  <img
                    src="https://pngimage.net/wp-content/uploads/2018/06/instagram-font-png-1.png"
                    alt=""
                    className="header__image"
                  />
                </center>

                <Input
                  type="text"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button onClick={signIn}>Sign In</Button>
              </form>
            </div>
          </Modal>

          {user ? (
            <Button
              className="signButtonsLogout"
              onClick={() => auth.signOut()}
            >
              Logout
            </Button>
          ) : (
            <div className="signButtons">
              <Button type="submit" onClick={() => setOpenSingIn(true)}>
                Log In
              </Button>
              <Button type="submit" onClick={() => setOpenSingUp(true)}>
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="app__posts">
        <div className="app__posts__left">
          {post.map(({ id, post }) => (
            <Post
              key={id}
              postId={id}
              user={user}
              dp={post.dp}
              username={post.username}
              caption={post.caption}
              imageUrl={post.imageUrl}
            />
          ))}
        </div>
        <div className="app__posts__right">
          <div className="app__posts__rightSec">
            {/* header => Avatar and Username */}
            <div className="post__header">
              <Avatar
                alt="Stephen Steve"
                src="https://static.wixstatic.com/media/56d0b8_c17642ca06994bd3b4fe4b1c90adf644~mv2_d_3008_4011_s_4_2.jpeg/v1/crop/x_0,y_1043,w_2975,h_2968/fill/w_69,h_69,al_c,q_80,usm_0.66_1.00_0.01/56d0b8_c17642ca06994bd3b4fe4b1c90adf644~mv2_d_3008_4011_s_4_2.webp"
                className="post__avatar"
              ></Avatar>
              <h3>Stephen Steve</h3>
              <button className="viewProfile"> View profile</button>
              {/* <MoreHorizSharpIcon fontsize='large' className='threeDot'/> */}
            </div>

            {/* image */}
            <img
              src="https://static.wixstatic.com/media/56d0b8_dc2ae99a58b24a5080703fddae09170c~mv2_d_3968_2973_s_4_2.jpg/v1/fill/w_676,h_505,al_c,q_80,usm_0.66_1.00_0.01/56d0b8_dc2ae99a58b24a5080703fddae09170c~mv2_d_3968_2973_s_4_2.webp"
              alt=""
              className="post__image"
            />

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
                <SendOutlinedIcon
                  style={{ fontSize: 30 }}
                  className="sendIcon"
                />
              </div>
              <div className="save">
                <BookmarkBorderOutlinedIcon
                  style={{ fontSize: 30 }}
                  className="saveIcon"
                />
              </div>
            </div>
            <h4 className="post__description">
              <strong>Stephen Steve </strong>The purpose of leadership is to
              change the world around you in the name of your values, so you can
              live those values more fully.
            </h4>

            {/* <InstagramEmbed 
              url='https://www.instagram.com/p/CCVOvU5MMtibAJ1k_FGjWU_IIF9sAjuHkgNUp80/'
              maxWidth={420}
              hideCaption={false}
              containerTagName='div'
              protocol=''
              injectScript
              onLoading={() => {}}
              onSuccess={() => {}}
              onAfterRender={() => {}}
              onFailure={() => {}}
            /> */}
            {/* <p>here</p> */}
          </div>
        </div>
      </div>
      {user?.displayName || user ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h2 className="app__bottom">Please Login to upload</h2>
      )}
    </div>
  );
}

export default App;
