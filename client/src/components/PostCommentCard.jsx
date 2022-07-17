import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import moment from 'moment';

import InputPostComment from './InputPostComment';
import CommentMenuItem from './CommentMenuItem';
import LikePost from './LikePost';

import { likecomment, unlikecomment, updateComment } from '../redux/actions/commentActions';

import '../styles/PostCommentCard.css';

const PostCommentCard = ({children, comment, pos, commentId}) => {
  const [content, setContent] = useState('');
  const [isLike, setIsLike] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [load, setLoad] = useState(false);
  const [onReply, setOnReply] = useState(false);

  const dispatch = useDispatch();
  const { auth } = useSelector(state => state);

  const handleLike = () => {
    if(load) return;
    setIsLike(true);
    setLoad(true);
    dispatch(likecomment({comment, pos, auth}));
    setLoad(false);
  }

  const handleUnlike = () => {
    if(load) return;
    setIsLike(false);
    setLoad(true);
    dispatch(unlikecomment({comment, pos, auth}));
    setLoad(false);
  }

  const handleupdatecomment = () => {
    if(comment.content === content) {
      setOnEdit(false)
    } else {
      dispatch(updateComment({comment, content, pos, auth}))
      setOnEdit(false)
    }
  }

  const handleReply = () => {
    if(onReply) return setOnReply(false);
    setOnReply({...comment, commentId});
  }

  useEffect(() => {
    setContent(comment.content);
    if(comment.likes?.find(like => like._id === auth.user._id)) {
      setIsLike(true)
    }
  }, [comment.content , comment.likes, auth.user._id])

  return (
    <div className='postCommentCard'>
        {comment &&
        <>
        <div className='postCommentCarduser'>
          <Link to={`/profile/${comment.user._id}`}>
          <div className='postCommentCarduserinfo'>
            <img src={comment.user.avatar ? comment.user.avatar : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'} alt={comment.user.fullname} />
            <div className='postCommentCardavatarinfo'>
            <h4 className='postCommentCardfullname'>{comment.user.fullname}</h4>
            <h6 className='postCommentCardtime'>{moment(comment.createdAt).fromNow()}</h6>
            </div>
          </div>
          </Link>
          <div className='postCommentCarduserdropdown'>
            <CommentMenuItem auth={auth} comment={comment} pos={pos} setOnEdit={setOnEdit} />
          </div>
        </div>
      <div className='postCommentCardcommentcontent'>
        <div className='postCommentCardcommentcontent-content'>
          {
            onEdit ? <textarea value={content} onChange={(e) => setContent(e.target.value)} rows="5" placeholder="Edit your Comments" style={{width: '100%'}} />
            :
            <>
            <span>
            {content.length < 100 ? content : readMore ? content + '...' : content.slice(0, 100) + '...'}
            </span>
            <span>
              {
                content.length > 100 &&
                <span style={{color: 'blue', cursor: 'pointer'}} onClick={() => setReadMore(!readMore)} >
                {
                  readMore ? 'Hide' : 'Show'
                }
                </span>
              }
              </span>
            </>
          }
        </div>
        <div className='postCommentCardcommentcontent-likes'>
        <p className='for__comment-likeCount'>{comment.likes?.length}</p> 
        { onEdit ? 
        <>
          <p className='Update__Comment' onClick={() => handleupdatecomment()}>Update</p>
          <p className='Cancel__Comment' onClick={() => setOnEdit(false)}>Cancel</p>
        </>
        :
          <p className='reply' onClick={handleReply}>{onReply ? 'rep' : 'Reply'}  </p>
        }
        </div>
      </div>
      <div className='postCommentLike'>
          <LikePost isLike={isLike} handleLike={handleLike} handleUnlike={handleUnlike} />
      </div>
      </>
      }
      {
        onReply && 
          <InputPostComment comment={comment} pos={pos} onReply={onReply} setOnReply={setOnReply}>
            <Link to={`profile/${onReply.user._id}`}>
              <p className='for-reply__username'>@{onReply.user.username}: {' '}</p>
            </Link>
          </InputPostComment>
      }
      {children}
    </div>
  )
}

export default PostCommentCard