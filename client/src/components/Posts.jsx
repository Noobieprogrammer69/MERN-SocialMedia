import React from 'react';
import { useSelector } from 'react-redux';

import PostCardBody from './PostCardBody';
import PostCardFooter from './PostCardFooter';
import PostCardHeader from './PostCardHeader';
import PostComments from './PostComments';
import InputPostComment from './InputPostComment';

import '../styles/Posts.css';

const Posts = () => {
  const {homePost} = useSelector(state => state)
 
  return (
    <div className='posts'>
      {
        homePost && homePost.post.length > 0 && homePost.post.map((pos) => (
          <div className='postCards' key={pos._id}>
            <PostCardHeader pos={pos} />
            <PostCardBody pos={pos} />
            <PostCardFooter pos={pos} />
            <PostComments pos={pos} />
            <InputPostComment pos={pos} />
          </div>
        ))
      }
    </div>
  )
}

export default Posts