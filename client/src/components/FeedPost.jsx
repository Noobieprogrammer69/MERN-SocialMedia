import React from 'react';
import { useSelector } from 'react-redux';

import '../styles/FeedPost.css';
import Posts from './Posts';

const FeedPost = () => {
    const {homePost} = useSelector(state => state)

  return (
    <div className='feeds'>
       {
        homePost && homePost.loading 
        ? <p style={{position: 'relative', left: '100px'}}>Loading...</p>
        : homePost.results === 0
        ? <h4>No Post Available</h4>
        : <Posts />
       }
    </div>
  )
}

export default FeedPost