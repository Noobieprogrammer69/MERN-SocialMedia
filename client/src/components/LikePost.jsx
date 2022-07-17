import React from 'react';

import '../styles/LikePost.css';

import { MdFavoriteBorder } from 'react-icons/md';

const LikePost = ({isLike, handleLike, handleUnlike}) => {
  return (
    <div>
        {
            isLike 
            ? <MdFavoriteBorder onClick={handleUnlike} style={{color: 'hsl(0, 95%, 65%)', fontSize: '22px'}} />
            : <MdFavoriteBorder onClick={handleLike} style={{color: 'hsl(252, 75%, 60%)', position: 'relative', top: '10px', fontSize: '20px'}} />
        }
    </div>
  )
}

export default LikePost