import React from 'react';

import PostCardBody from './PostCardBody';
import PostCardFooter from './PostCardFooter';
import PostCardHeader from './PostCardHeader';
import PostComments from './PostComments';
import InputPostComment from './InputPostComment';

import '../styles/Posts.css';

const SingleUserPosts = ({post}) => {

  return (
    <div className='posts'>
      {
        post && post.length > 0 && post.map((pos) => (
          <div className='single__postCard' key={pos._id} >
            <PostCardHeader pos={pos} />
            <PostCardBody pos={pos}  />
            <PostCardFooter pos={pos} />
            <PostComments pos={pos} />
            <InputPostComment pos={pos} />
          </div>
        ))
      }
    </div>
  )
}

export default SingleUserPosts