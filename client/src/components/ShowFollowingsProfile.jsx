import React from 'react'

import GlobalShortCard from './GlobalShortCard';

import '../styles/GlobalShortCard.css';

const ShowFollowingsProfile = ({user}) => {
  return (
    <div className='showFriendsProfile-profile'>
        <h2>Friends <span>{user.friends.length}</span></h2>
        {
            user?.friends.length > 0 && user.friends.map(friend => (
                <GlobalShortCard friend={friend} key={friend._id} />
            ))
        }
    </div>
  )
}

export default ShowFollowingsProfile