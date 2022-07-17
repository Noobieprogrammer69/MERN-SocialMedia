import React from 'react';

import '../styles/Friends.css';
import GlobalCard from './GlobalCard';

const FollowingCard = ({ user }) => {

  return (
    <div className='friendsCardMobile'>
        {user.length > 0 && user.map(fol => (
            <GlobalCard user={fol} key={fol._id} />
        ))}
    </div>
  )
}

export default FollowingCard