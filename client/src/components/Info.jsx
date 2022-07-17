import React, {useState} from 'react';

import '../styles/Info.css';
import EditProfile from './EditProfile';
import GlobalFriendBtn from './GlobalFriendBtn';

const Info = ({userData, auth, post}) => {
    const [onEdit, setOnEdit] = useState(false);

  return (
    <div className='profileinfo'>   
      {userData.length > 0 && userData.map(user => (
        <div className='profileinfo-container' key={user._id}>
            <div className='profileinfo-top'>
              <img src="https://source.unsplash.com/1600x900/?nature,anime,photography,technology" alt="user-pic"  />
            </div>
            <div className='profileinfo-center'>
              <img className='profileinfo-centeravatar' src={user.avatar ? user.avatar : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'} style={{ width: '100px', height: '100px', position: 'absolute', top:'260px' }} alt="" />
              {user._id && auth && user._id === auth.user._id ?
                <>
                <button className='btn btn-primary profileinfo-centerbutton' onClick={() => setOnEdit(true)}>Edit Profile</button>
                </>
                : <GlobalFriendBtn classBtn="btn btn-primary profileinfo-centerbutton" user={user} />
              }
            </div>
            <div className='profileinfo-bottom'>
              <div className='profileinfo-bottomleft'>
                <div className='profileinfo-stat'>
                  <h6 className='profileinfo-statnumber for-smaller-number__friends'>{user.friends.length}</h6>
                  <h6 className='profileinfo-statdesc for-smaller_friends'>FRIENDS:</h6>
                </div>
                <div className='profileinfo-stat'>
                  <h6 className='profileinfo-statnumber for-smaller-number__following'>{user.following.length}</h6>
                  <h6 className='profileinfo-statdesc for-smaller_following'>FOLLOWING:</h6>
                </div>
              </div>
              <div className='profileinfo-bottomcenter'>
                <h3 className="profileinfo-fullname">{user.fullname}</h3>
                <h5 className='profileinfo-username'>{user.username}</h5>
            </div>
              <div className='profileinfo-bottomright'>
              <div className='profileinfo-stat'>
                <h6 className='profileinfo-statnumber for-smaller-number__posts'>{post ? post.length : 0}</h6>
                <h6 className='profileinfo-statdesc for-smaller'>POSTS:</h6>
              </div>
            </div>
            </div>
            {
              onEdit && <EditProfile user={user} setOnEdit={setOnEdit} />
            }
        </div>
      ))}
    </div>
  )
}

export default Info