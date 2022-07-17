import React from 'react';

import '../styles/Friends.css';
import GlobalCard from './GlobalCard';


const FriendsCard = ({ user }) => {
  return (
    <>
      <div className='MobileFriendsCard'>
        {user.length > 0 && user.map(fr => (
        <GlobalCard user={fr} key={fr._id} />
        ))}
      </div>
    </>
  )
}

export default FriendsCard