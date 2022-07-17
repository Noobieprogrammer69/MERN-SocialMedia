import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { createComment } from '../redux/actions/commentActions';

import '../styles/Comments.css';

const InputPostComment = ({pos, children, onReply, setOnReply}) => {
    const [content, setContent] = useState('');

    const{auth, socket} = useSelector(state =>state);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!content.trim()){
           if(onReply) return setOnReply(false);
           return;  
        } 
    
        const newComment = {
            content,
            likes:[],
            user:auth.user,
            createdAt: new Date().toISOString(),
            reply:onReply && onReply.commentId,
            tag : onReply && onReply.user
        }

        console.log(onReply)

        dispatch(createComment({pos, newComment, auth, socket}))
        if(onReply) return setOnReply(false)
        setContent('')
        
    }

  return (
    <div className='inputpostcomments'>
        <div className='inputpostcomments-left'>
            <img src={auth.user.avatar ? auth.user.avatar : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'} alt="commenter-profile" />
        </div>
        {children}
        <input className='forCommentsInput' type="text" placeholder="Your Comments" value={content} onChange={(e) => {setContent(e.target.value)}} />
        <button className='forCommentsButton btn-comments btn-primary-comments' onClick={handleSubmit}> Comment </button>
    </div>
  )
}

export default InputPostComment