import React from 'react';

import moment from 'moment';

import '../styles/Messages.css';

  const imageshow = (src) => {
    return(
      <>
        <img src={src} alt="" className="statusMsg-middleimages"/>
      </>
    )
  }
  const videoshow = (src) => {
    return(
      <>
        <video controls src={src} alt="" className="statusMsg-middleimages"/>
      </>
    )
  }

const MsgDisplay = ({user, msg}) => {
  
  return (
    <div className='msgDisplay'>
      <div className='msgDisplay-content'>
        <img src={user.avatar ? user.avatar : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'} alt={user.fullname} />
        <span>{user.username}</span>
      </div>
      <div className='msgDisplay-text'>
        { msg.text &&
          <p className='msgDisplay-text-message'>{msg.text}</p>
        }
        {
          msg.media.map((item, index) => (
            <div key={index}>
              {
                item.secure_url.match(/video/i)
                ? videoshow(item.secure_url)
                : imageshow(item.secure_url)
              }
            </div>
          ))
        }
      </div>
      <div className='msgDisplay-time'>
        { msg.createdAt &&
          <small className='msgDisplay-text-time'>{moment(msg.createdAt).format('MMMM Do YYYY, h:mm a')}</small>
        }
      </div>
    </div>
  )
}

export default MsgDisplay