import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/UserCard.css'

const UserCard = ({ user }) => {

  return (
    <div className='search-align'>
      <Link to={`/profile/${user?._id}`}>
        <img className='imga' src={user?.avatar ? user?.avatar : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'} alt="userCard-img" />
        <h5>{user?.username}</h5>
      </Link>
    </div>
  )
}

export default UserCard