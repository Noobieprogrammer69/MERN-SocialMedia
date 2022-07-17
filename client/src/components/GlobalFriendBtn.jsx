import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addfriends, unfriends } from '../redux/actions/profileActions';

import '../styles/GlobalFriendBtn.css';

const GlobalFriendBtn = ({classBtn, user}) => {
  const [friend, setFriend] = useState(false);
  const {auth, profile, socket} = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if(auth.user.following.find(item => item._id === user._id)) {
      setFriend(true)
    }
  }, [auth.user.following, user._id])

  const addfriend = () => {
    setFriend(true);
    dispatch(addfriends({users: profile.users, user, auth, socket}))
  }

  const removefriend = () => {
    setFriend(false)
    dispatch(unfriends({users: profile.users, user, auth, socket}))
  }

  return (
    <>
    {
      friend ? 
        <button className='btn profileinfo-centerbutton unfriend-button' onClick={removefriend}>UnFriend</button>
      : <button className={classBtn} onClick={addfriend}>Add Friend</button>
    }
    </>
  )
}

export default GlobalFriendBtn