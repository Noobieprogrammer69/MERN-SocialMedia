import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPostSingle } from '../redux/actions/postActions';

import InputPostComment from '../components/InputPostComment';
import PostCardBody from '../components/PostCardBody';
import PostCardFooter from '../components/PostCardFooter';
import PostCardHeader from '../components/PostCardHeader';
import PostComments from '../components/PostComments';
import Navbar from '../components/Navbar';

import '../styles/Posts.css';

const Post = () => {
  const [post, setPost] = useState([]);

  const {auth, detailPost} = useSelector(state => state);
  const dispatch = useDispatch();
  const {id} = useParams();

  useEffect(() => {
    dispatch(getPostSingle({detailPost, auth, id}))
    if(detailPost.length > 0) {
      const newPost = detailPost.filter(item => item._id === id)
      setPost(newPost)
    }
  }, [detailPost, auth, id, dispatch])

  return (
    <div>
      <Navbar />
    {
        post && post.length > 0 && post.map((pos) => (
          <div className='postCard'>
            <PostCardHeader className='mobileDevices11' pos={pos} />
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

export default Post