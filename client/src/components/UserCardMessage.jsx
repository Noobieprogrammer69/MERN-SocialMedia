import React from 'react';

import '../styles/UserCard.css'

const UserCardMessage = ({ user, children }) => {

  return (
    <div className='userCard-messages'>
      <div className='userCard-messages-content'>
        <img className='userCard-messages-imga' src={user?.avatar ? user?.avatar : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'} alt="userCardMsg-img" />
        <h5 style={{color: 'white'}}>{user?.username}</h5>
      {children}
      </div>
    </div>
  )
}

export default UserCardMessage