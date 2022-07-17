import React from 'react'

import GlobalShortCard from './GlobalShortCard';

import '../styles/GlobalShortCard.css';

const ShowFriendsProfile = ({user}) => {
  return (
    <div className='showFriendsProfile'>
        <h2>Following <span>{user.following.length}</span></h2>
        {
            user?.following.length > 0 && user.following.map(friend => (
                <GlobalShortCard friend={friend} key={friend._id} />
            ))
        }
    </div>
  )
}

export default ShowFriendsProfile