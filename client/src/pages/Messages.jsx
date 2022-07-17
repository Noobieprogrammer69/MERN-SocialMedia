import React from 'react';

import { LeftSideMessage, Navbar, RightSideMessage } from '../components'

import '../styles/Messages.css'

const Messages = () => {
  return (
    <div>
      <Navbar />
      <div className='messages'>
        <div className='messages-left'>
          <LeftSideMessage />
        </div>
        <div className='messages-right'>
          <RightSideMessage />
        </div>
      </div>
    </div>
  )
}

export default Messages