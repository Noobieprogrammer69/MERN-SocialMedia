import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteComment } from '../redux/actions/commentActions';

import '../styles/CommentMenu.css';

const CommentMenuItem = ({comment, pos, auth, setOnEdit}) => {
    const [menuItems, setMenuItem] = useState(false);

    const {socket} = useSelector(state => state);
    const dispatch = useDispatch();

    const handleEditThing = () => {
        setOnEdit(true);
        setMenuItem(false);
    }

    const handleRemove = () => {
        dispatch(deleteComment({comment, pos, auth, socket}))
    }

    const MenuItem = () => {
        return (
            <>
                <div className='commentMenuitemlist'>
                    <h6 onClick={handleEditThing}>Edit</h6>
                    <h6 onClick={handleRemove}>Remove</h6>
                </div>
            </>
        )
    }

  return (
    <div className='commentMenuItem'>
        {
            (pos?.user._id === auth?.user._id || comment?.user._id === auth?.user._id) &&
            <div className="menuItemicon" style={{cursor:"pointer"}} onClick={()=>setMenuItem(!menuItems)}> ooo </div>
        }
            {
                menuItems ? ( pos?.user._id === auth?.user._id ? comment?.user._id === auth?.user._id
                ?MenuItem()
                :<h6 className="removeComment" style={{cursor:'pointer'}} onClick={handleRemove}>Remove</h6>
                :comment?.user._id === auth?.user._id && MenuItem()
                ) 
                :
                ""
            }
    </div>
  )
}

export default CommentMenuItem