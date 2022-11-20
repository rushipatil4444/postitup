import React, { useState, useEffect } from "react";
import './App.css';
import Post from "./Post";
import { auth, db } from "./firebase";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@mui/material/Modal';
import { Button, Input } from "@mui/material";

function getModalStyle() {
  const top = 50;
  const left = 50;
  return{
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper:{
    position : 'absolute',
    width:400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2 ,4, 3),
  },
}));

function App() {

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  // using states to reduce the hardcode which we are doing to pass the props to several postss
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);

  
  // useEffect runs a piece of code based on a specific condition
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {   //its the listener
      // user has logged in
      if (authUser) {
        console.log(authUser);
        setUser(authUser);
      }
    
    else {
      // user has logged out..
        setUser(null);

      }
    })

    return() => {
      // perform some cleanup
      unsubscribe();
    }
  }, [user, username]);




  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {  //onsnapshot is very powerfull listener
    //every time a new change (post)is added, modifed deleted onSnapshot will be fired

   setPosts(snapshot.docs.map(doc => ({
   id: doc.id,
   post: doc.data()
             }
        ))); //go get the docs , map through every single them and store in data
            //update the post as soon as the componenet loads
            //so we dont need to hard code the data
       })
   }, []); //[posts]runs everytime the variable post changes
// [] means runs once

const signUp = (event) => {
  event.preventDefault(); // to prevent refresh when we submit the form

  auth
  .createUserWithEmailAndPassword(email, password)
  .then((authUser) => {

     return authUser.user.updateProfile({
       displayName: username
     })
  })
  
  .catch((error) => alert(error.message))

}

const signIn = (event) => {
  event.preventDefault();
  auth
  .signInWithEmailAndPassword(email, password)
  .catch((error) => alert(error.message))

  setOpenSignIn(false);  //close dialogue box after signing in
}

  
  return (
    <div className="App">
     <Modal
     open={open}
     onClose={() => setOpen(false)}>

     <div style={modalStyle} className={classes.paper}>
    
        <form className="app__signup">

         <label>UserName</label>
         <Input type = 'text' value ={username} placeholder = 'username' onChange = {(e) => setUsername(e.target.value)} 
         /> 

         <label>Email</label>
         <Input type='text' placeholder='email' value={email} onChange = {(e) =>setEmail(e.target.value)} 
         />

         <label>Password</label>
         <Input type= 'password' placeholder = 'password' value ={password} onChange = {(e) =>setPassword(e.target.value)} 
         />

         <Button type="submit" onClick={signUp}>Sign up</Button> 

         </form>
    </div>
    </Modal>

    

    <Modal
    open={openSignIn}
    onClose={() => setOpenSignIn(false)}>

    <div style={modalStyle} className={classes.paper}>
   
       <form className="app__signup">

        <label>Email</label>
        <Input type='text' placeholder='email' value={email} onChange = {(e) =>setEmail(e.target.value)} 
        />

        <label>Password</label>
        <Input type= 'password' placeholder = 'password' value ={password} onChange = {(e) =>setPassword(e.target.value)} 
        />

        <Button type="submit" onClick={signIn}>Sign In</Button> 

        </form>
   </div>
   </Modal>


    <div className="app__header">
    <img 
    className="app__headerImage"
    src="https://img.freepik.com/premium-photo/mailbox-with-letters-open-red-postbox-3d-render_120072-390.jpg?w=2000"
    alt = "img"
    />
    </div>

    {user ? (
      <Button onClick={ ()=>auth.signOut()}>Logout</Button> //logout functionality
    ): (
      <div className="app__loginContainers"> 
        <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
        <Button onClick={() => setOpen(true)}>SignUp</Button>
      </div>
    )
    }

    




<h1>Post it Up Guys</h1>

{
  posts.map(({id , post}) => (
    <Post key={id} username={post.username} caption = {post.caption} imageUrl = {post.imageUrl} />
   ))  
}
    </div>
  );
}

// we are going to have 
// {header}
// {posts}
// {posts}

export default App;

