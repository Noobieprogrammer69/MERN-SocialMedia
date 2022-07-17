import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import {ALERT_TYPES} from '../redux/actions/alertActions';
import { deletePost } from '../redux/actions/postActions';
import { BASE_URL } from '../utils/config';

import {FiSettings} from 'react-icons/fi';
import '../styles/PostCardHeader.css';

const PostCardHeader = ({pos}) => {
  const [showdrop, setShowdrop] = useState(false);

  const {auth, socket} = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = ({ed}) => {
    dispatch({type: ALERT_TYPES.STATUS, payload:{...pos, edit:true}})
    setShowdrop(false);
    window.scrollTo(0,0)
  }

  const handleDeltePost = () => {
    dispatch(deletePost({pos, auth, socket}))
    setShowdrop(false);
    navigate('/');
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${BASE_URL}/post/${pos._id}`)
    setShowdrop(false);
  }

  return (
    <div className='postCard__header'>
      <Link to={`/profile/${pos.user._id}`}>
        <div className='postCard__Header-content'>
          <img src={pos.user.avatar ? pos.user.avatar : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'} alt={pos.user.fullname} />
        </div>
        <div className='profileCard__header-info'>
          <h4>{pos.user?.fullname} posted </h4>
          <small>{moment(pos.createdAt).fromNow()}</small>
        </div>
      </Link>
      <div>
        <FiSettings onClick={() => setShowdrop(!showdrop)} className='postSettings__icon' />
        { showdrop &&
          <div className='postSettings__dropdown'>
          {auth?.user._id === pos.user._id ? 
          <>
            <p onClick={() => handleEdit(pos)} >Update Post</p>
            <p onClick={handleDeltePost}>Delete Post</p>
            <p onClick={handleCopyLink}>Copy Link</p>
          </>  
          :
            <p>Copy Link</p>
          }
          </div>
        }
      </div>
    </div>
  )
}

export default PostCardHeader