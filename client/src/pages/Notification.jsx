import React from 'react';
import { Link } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

import moment from 'moment'
import Navbar from '../components/Navbar';

import { deleteNotifiesAll, readNotify } from '../redux/actions/notifyActions';

import {RiDeleteBin3Fill} from 'react-icons/ri';
import '../styles/Notification.css';

const Notification = () => {
  const {notify, auth} = useSelector(state => state)
  const dispatch = useDispatch()

  const isReadNotify = (dt) => {
    dispatch(readNotify({dt, auth}))
  }

  const handleDeleteAll = () => {
    const newArr = notify.data.filter(item => item.isRead === false)
    if(newArr.length === 0) dispatch(deleteNotifiesAll(auth))

    if(window.confirm(`You have ${newArr.length} unread Notifications. Are you sure you want to Delete All Notifications`))
    {
      dispatch(deleteNotifiesAll(auth))
    }
  }

  return (
    <div>
      <Navbar />
    <div className='notifications'>
      <div className='notificationheader'>
        <h2>Notifications</h2>
        <RiDeleteBin3Fill onClick={handleDeleteAll} style={{fontSize: '40px', cursor: 'pointer'}} />
      </div>
      {
        notify.data.length > 0 && notify.data.map((dt, index) => (
          <div className='notificationdata' key={index}>   
          <Link to={`${dt.url}`} onClick={() => isReadNotify(dt)}>
            <div className='notificationdatatop'>
              <img className='notification-img' src={dt.user.avatar ? dt.user.avatar : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'} alt="notification-user" />
              <div className='dt'>
              <h4>{dt.user.fullname}{dt.text}</h4>
              <h6>{dt.content}</h6>
              </div>
            </div>
            </Link>
            <div className='notificationdatabottom'>
              <small>{moment(dt?.createdAt).fromNow()}</small>
            {
              dt.isRead ? <p>o</p> : <p style={{color: 'red'}}>o</p>
            }
            </div>
          </div>
        ))
      }
    </div>
      </div>
  )
}

export default Notification