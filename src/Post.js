import React from 'react'
import "./Post.css";
import Avatar from '@mui/material/Avatar';

function Post({username , caption , imageUrl}) {
  return (
    //   header -> avatar + username
    // image
    // username + caption
    <div className='post'>
    <div className='post__header'>
    <Avatar 
       className = "post__avatar"
       alt = 'rushipatil.4444'
     />
    <h3>{username}</h3>
    </div>

    <img 
    className='post__image'
    src={imageUrl} />
    
    <h4 className='post__text'><strong>{username}</strong> {caption}</h4>
    
    </ div>
  )
}

export default Post