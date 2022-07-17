import React, { useEffect, useState } from 'react';

import '../styles/PostCommentDisplay.css';
import PostCommentCard from './PostCommentCard';

const PostCommentDisplay = ({comment, pos, newReply, commentId}) => {
  const [showRep, setShowRep] = useState([]);
  const [next, setNext] = useState(1);

  useEffect(() => {
    setShowRep(newReply.slice(newReply.length - next))
  }, [newReply, next])

  return (
    <div className='forcommentbg'>
        <PostCommentCard comment={comment} pos={pos} commentId={comment._id} >
          <div>
          {
            showRep.map((item, index) => (
              item.reply &&
              <PostCommentCard 
              key={index}
              comment={item}
              commentId={comment._id}
              pos={pos}
              />
            ))
          }
          {
                newReply.length - next > 0 
                ? <div  style={{textAlign:'center', padding:'5px 0', fontSize:'10px',backgroundColor:'hsl(252, 75%, 60%)',color:'white', cursor:'pointer', fontWeight:'500',borderRadius:'10px', border:'2px solid whitesmoke'  }}
                onClick={()=>setNext(prev => prev + 10)} >
                 Show More Comment +  
                </div>
                : newReply.length > 1 &&
                <div style={{textAlign:'center',padding:'5px 0',fontSize:'10px', backgroundColor:'hsl(252, 75%, 60%)',color:'white', cursor:'pointer', fontWeight:'500',borderRadius:'10px', border:'2px solid whitesmoke' }}
                onClick={()=>setNext(1)}> 
                    Hide Extra Comments -
                </div>
            }
          </div>
        </PostCommentCard>
    </div>
  )
}

export default PostCommentDisplay