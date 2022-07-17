import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import {MdExplore} from 'react-icons/md';
import {IoIosNotifications} from 'react-icons/io';
import {SiGooglemessages} from 'react-icons/si';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import { AiFillHome } from 'react-icons/ai';

import { Avatar } from '@material-ui/core';
import leftProfile from '../images/profile-1.jpg';

import '../styles/Main.css';
import Status from './Status';
import FeedPost from './FeedPost';

const Main = () => {
    const {auth} = useSelector(state =>state);

  return (
    <main>
        <div className='container'>
            <div className='left' style={{position: 'fixed'}}>
                <a className='profile'>
                    <div className='profile-photo'>
                        <img className='for-mobileImage' src={auth.user.avatar ? auth.user.avatar : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'} alt="user-profile" />
                    </div>
                    <div className='handle'>
                        <h4>{auth.user.fullname}</h4>
                        <p className='text-muted'>
                            {auth.user.username}
                        </p>
                    </div>
                </a>
                <div className="sidebar">
                        <a className="menu-item active2">
                            <span><AiFillHome className='icon' /></span><h3 className='mobile-h3-none'>Home</h3>
                        </a>
                    <a className="menu-item">
                        <span><MdExplore className='icon' /></span><h3 className='mobile-h3-none'>Explore</h3>
                    </a>
                    <a className="menu-item" id="notifications">
                        <span><IoIosNotifications className='icon' /></span><h3 className='mobile-h3-none'>Notifications</h3>
                        <div className="notifications-popup">
                            <div>
                                <div className='profile-photo'>
                                    <img src={auth.user.avatar ? auth.user.avatar : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'} atl="user-profile" />
                                </div>
                                <div className="notification-body">
                                    <b>Username</b> the actual message
                                    <small className='text-muted'>2 DAYS AGO</small>
                                </div>
                            </div>
                        </div>
                    </a>
                    
                        <a className="menu-item">
                            <span><SiGooglemessages className='icon' /></span><h3 className='mobile-h3-none'>Messages</h3>   
                        </a>
                    <a className="menu-item">
                        <span><ColorLensIcon className='icon' /></span><h3 className='mobile-h3-none'>Theme</h3>
                    </a>    
                </div>
                {/* <label className='btn btn-primary'>Create Post</label> */}
            </div>
            <div className='mobileStatus'>
            <Status />
            </div>
            <div className='middle'>
                <div className='feedPost'>
                    <FeedPost />
                </div>
            </div>
        </div>
    </main>
  )
}

export default Main