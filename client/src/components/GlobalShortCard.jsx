import React from 'react';

import { Avatar } from '@material-ui/core';

import '../styles/GlobalShortCard.css';

const GlobalShortCard = ({friend}) => {
  return (
    <div className='globalshortcard'>
        <Avatar style={{width: '45px', height: '45px', objectFill: 'cover', borderRadius: '30px 0 30px 0', border: '2px solid brown', padding: '2px'}} src={friend.avatar} alt="user-profile" />
            <div className='globalshortcardcontentinfo'>
                <h4>{friend.fullname}</h4>
                <h6>{friend.username}</h6>
            </div>
    </div>
  )
}

export default GlobalShortCard