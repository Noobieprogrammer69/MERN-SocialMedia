import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import LikePost from './LikePost';
import { likepost, savedPost, unlikepost, unsavedPost } from '../redux/actions/postActions';

import { MdComment, MdSaveAlt } from 'react-icons/md';
import '../styles/PostCardFooter.css';

const PostCardFooter = ({pos}) => {
  const [isLike, setIsLike] = useState(false);
  const [load, setLoad] = useState(false);
  const [saved, setSaved] = useState(false);

  const {auth, socket} = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if(pos.likes.find(like => like._id === auth.user._id)) {
      setIsLike(true)
    } else {
      setIsLike(false)
    }
  }, [pos.likes, auth.user?._id])

  useEffect(() => {
    if(auth.user.saved.find(id => id === pos._id)) {
      setSaved(true)
    } else {
      setSaved(false)
    }
  }, [pos._id, auth.user.saved])

  const handleLike = async () => {
    if(load) return;
    setIsLike(true);
    setLoad(true);
    dispatch(likepost({pos, auth, socket}));
    setLoad(false);
  }

  const handleUnlike = async () => {
    if(load) return;
    setIsLike(false);
    setLoad(true);
    dispatch(unlikepost({pos, auth, socket}));
    setLoad(false);
  }

  return (
    <div className='postCard__footer'>
      <div className='postCard__footerTop'>
        <div className='postCard__footerTop-items'>
          {pos.likes?.length }
        </div>
        <div className='postCard__footerTop-items-comments'>
          {pos.commentss?.length} {pos.commentss?.length > 1 && "Comments"} {pos.commentss?.length === 1 && "Comment"}
        </div>
      </div>
      <div className='border-top' />
      <div className='postCard__footerBottom'>
        <div className='postCard__footerBottom-icon'>
          <LikePost isLike={isLike} handleLike={handleLike} handleUnlike={handleUnlike} />
          <span className='like--like'>{pos.likes?.length > 1 ? "Likes" : "Like"} </span>
        </div>
        <Link to={`/post/${pos._id}`}>
        <div className='postCard__footerBottom-icon'>
          <MdComment style={{color: 'hsl(252, 75%, 60%)', marginLeft: '20px'}} />
          <span style={{color: 'black'}} >Comment</span>
        </div>
        </Link>
        <div className='postCard__footerBottom-icon'>
          { saved 
          ? <MdSaveAlt onClick={() => dispatch(unsavedPost({pos, auth}))} style={{paddingRight: '20px', fontSize: '40px', color: 'hsl(252, 75%, 60%)'}} />
          : <MdSaveAlt onClick={() => dispatch(savedPost({pos, auth}))} style={{paddingRight: '20px', fontSize: '40px'}} />
          }
          <span className='savespan'>Save</span>
        </div>
      </div>
    </div>
  )
}

export default PostCardFooter