import React, { useState, useEffect } from 'react';

import PostCommentDisplay from './PostCommentDisplay';

import '../styles/PostComments.css';

const PostComments = ({pos}) => {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState([]);
  const [replyComment, setReplyComment] = useState([]);
  const [next, setNext] = useState(2);

  useEffect(() => {
    const ncm = pos.commentss?.filter(cm => !cm.reply)
    setComments(ncm);
    setShowComments(ncm?.slice(ncm.length - next))
  }, [pos.commentss, next])

  useEffect(() => {
    const newRpl = pos.commentss?.filter(cm => cm.reply)
    setReplyComment(newRpl);

  }, [pos.commentss])


  return (
    <div>
      {
        showComments && showComments.map(comment => (
          <PostCommentDisplay comment={comment} pos={pos} key={comment._id} 
          newReply={replyComment.filter(item => item.reply === comment._id)}
          />
          ))
      }
      {
        comments.length - next > 0
        ? 
        <div className='showMore-button' onClick={() => setNext(prev => prev + 10)}>
          Show More +
        </div>
        : comments.length > 2 &&
        <div  className='showMore-button' onClick={() => setNext(2)}>
          Hide -
        </div>
      }
    </div>
  )
}

export default PostComments