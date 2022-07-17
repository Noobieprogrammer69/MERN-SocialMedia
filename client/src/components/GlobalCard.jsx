import React from 'react';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom'

import { Avatar } from '@material-ui/core';

import '../styles/GlobalCard.css';
import GlobalFriendBtn from './GlobalFriendBtn';

const GlobalCard = ({ user }) => {
  const { auth } = useSelector(state => state)

  return (
    <div className='globalcard'>
      <div className='globalcard-content'>
        <div className='globalcard-contenttop'>
          <img src="https://source.unsplash.com/1600x900/?nature,anime,photography,technology" alt="user-profile" />
        </div>
        <div className='globalcard-contentmiddle'>
          <Avatar className='formiddleimage' src={user.avatar} alt="user-profile" />
        </div>
        <Link to={`/profile/${user._id}`}>
          <div className='globalcard-contentmiddleinfo'>
            <h4>{user.fullname}</h4>
            <h6>{user.username}</h6>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default GlobalCard