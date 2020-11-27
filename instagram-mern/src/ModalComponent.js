// import React, {useState, useEffect} from 'react';
// import { auth } from './firebase';
// import { Input, Button, makeStyles, Modal } from "@material-ui/core";

// // "getModalStyle" from https://material-ui.com/components/modal/#modal
// function getModalStyle() {
//   const top = 50;
//   const left = 50;

//   return {
//     top: `${top}%`,
//     left: `${left}%`,
//     transform: `translate(-${top}%, -${left}%)`,
//   };
// }

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     position: 'absolute',
//     width: 400,
//     backgroundColor: theme.palette.background.paper,
//     border: '2px solid #000',
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3),
//   },
// }));

// function ModalComponent() {

//   const [openSignUp, setOpenSingUp] = useState(false);
//   const [openSignIn, setOpenSingIn] = useState(false);
//   const classes = useStyles();
//   const [modalStyle] = useState(getModalStyle);
//   const [userName, setUserName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [user, setUser] = useState(null);

//   // useEffect() is front end listener
//   useEffect(() => {
//     // backend listener
//     const unsubscribe = auth.onAuthStateChanged((authUser) => {
//       if (authUser) {
//         //user has logged in
//         console.log('User - ', authUser);
//         setUser(authUser);
//       } else {
//         //user has logged out
//         setUser(null);
//       }
//     })

//     return () => {
//       unsubscribe();
//     }
//   }, [user, userName]);

//   // User Authentication for Sign Up
//   const signUp = (event) => {
//     event.preventDefault();

//     auth.createUserWithEmailAndPassword(email, password).then((authUser) => {
//       return authUser.user.updateProfile({
//         displayName: userName
//       })
//     }).catch((err) => alert(`Error : ${err.message}`));

//     setOpenSingUp(false);
//   }

//   // User Authentication for Sign In
//   const signIn = (event) => {
//     event.preventDefault();

//     auth.signInWithEmailAndPassword(email, password).catch((err) => alert(`Error: This email is Invalid. Try to sign up and continue`));

//     setOpenSingIn(false);
//   }

//   return (
//     <div>
//       <div className="loginButtons">
//         <Modal
//           open={openSignUp}
//           onClose={() => setOpenSingUp(false)}
//         >
//           <div style={modalStyle} className={classes.paper}>
//             <form className="header__signUp">
//               <center>
//                 <img src="https://pngimage.net/wp-content/uploads/2018/06/instagram-font-png-1.png" alt="" className="header__image"/>
//               </center>

//               <Input
//                 type='text'
//                 placeholder='username'
//                 value={userName}
//                 onChange={(e) => setUserName(e.target.value)}
//               />
//               <Input
//                 type='text'
//                 placeholder='email'
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <Input
//                 type='text'
//                 placeholder='password'
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <Button onClick={signUp}>Sign Up</Button>
//             </form>
//           </div>
//         </Modal>

//         <Modal
//           open={openSignIn}
//           onClose={() => setOpenSingIn(false)}
//         >
//           <div style={modalStyle} className={classes.paper}>
//             <form className="header__signUp">
//               <center>
//                 <img src="https://pngimage.net/wp-content/uploads/2018/06/instagram-font-png-1.png" alt="" className="header__image"/>
//               </center>

//               <Input
//                 type='text'
//                 placeholder='email'
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <Input
//                 type='text'
//                 placeholder='password'
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <Button onClick={signIn}>Sign In</Button>
//             </form>
//           </div>
//         </Modal>

//         { (user) ? (
//             <Button onClick={() => auth.signOut()}>Logout</Button>
//           ) : (
//             <div className="signButtons">
//               <Button type='submit' onClick={() => setOpenSingIn(true)}>Sign In</Button>
//               <Button type='submit' onClick={() => setOpenSingUp(true)}>Sign Up</Button>
//             </div>
//           )
//         }
//       </div>
//       {/* <div className="ImageUpload">
//         {user?.displayName ? (
//           <ImageUpload username={user?.displayName}/>
//         ) : (
//           <h3>Sorry! You need to Login to upload</h3>
//         )}
//       </div> */}

//     </div>
//   )
// }

// export default ModalComponent;
