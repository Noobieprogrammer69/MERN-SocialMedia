import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { About, Info, Navbar, Friends, Following, Saved, SingleUserPosts, ShowBio } from '../components'

import { getProfileUsers, getProfileUsersPost } from '../redux/actions/profileActions';

import { IconButton } from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PeopleIcon from '@material-ui/icons/People';
import BookmarksIcon from '@material-ui/icons/Bookmarks';

import '../styles/Profile.css';

const Profile = () => {
  const [userData, setUserData] = useState([]);
  const [showaccount, setShowaccount] = useState(true);
  const [showfriends, setShowfriends] = useState(false);
  const [showfollowing, setShowfollowing] = useState(false);
  const [showsaved, setShowsaved] = useState(false);
  const [showbio, setShowbio] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [post, setPost] = useState([]);

  const {id} = useParams()
  const {auth, profile} = useSelector(state => state);
  const dispatch = useDispatch();

  const handletoggle = (ht) => {
    if(ht === 'showaccount'){
      setShowsaved(false);
      setShowfriends(false);
      setShowfollowing(false);
      setShowaccount(true);
      setShowbio(false);
    } else if(ht === 'showfriends') {
      setShowsaved(false);
      setShowfriends(true);
      setShowfollowing(false);
      setShowaccount(false);
      setShowbio(false);
    } else if(ht === 'showfollowing') {
      setShowsaved(false);
      setShowfriends(false);
      setShowfollowing(true);
      setShowaccount(false);
      setShowbio(false);
    } else if(ht ==='showsaved') {
      setShowsaved(true);
      setShowfriends(false);
      setShowfollowing(false);
      setShowaccount(false);
      setShowbio(false);
    } else if (ht === 'showbio') {
      setShowbio(true);
      setShowaccount(false);
      setShowfriends(false);
      setShowfollowing(false);
    }
  }

  useEffect(()=>{
    if( id === auth.user?._id  ) {
        setUserData([auth.user]) 
    }else{
    
        dispatch(getProfileUsers({users: profile.users, id , auth}))
        const newData = profile.users.filter(user=> user._id === id)
        setUserData(newData)   
        
    }
},[id,auth,dispatch,profile.users])

useEffect(()=>{
            
  if (profile.userposts.every(item => item._id !== id))
  {
      dispatch(getProfileUsersPost({ profil:profile.userposts, id, auth}))
  }else{
      profile.userposts.forEach(item=>{
          if(item._id === id){
          setPost(item.posts)
          } 
      })
  }
  },[id, auth, profile.ids, profile.userposts, dispatch])

useEffect(()=>{
  profile.userposts.forEach(item=>{
      if(item._id === id){
      setPost(item.posts)
      } 
  })
  
},[profile.userposts, id])

useEffect(()=>{
  const newprofileimages = post.map(item => (item.images)? item.images : '')
  setPhotos(newprofileimages)
 },[post])

  return (
    <div className='profilebody'>
      <Navbar />
      <div>
        <Info userData={userData} profile={profile} post={post} auth={auth} id={id} />
        {showaccount && 
        <div>
          <div className='intro-none'>
          <About photos={photos} userData={userData} profile={profile} auth={auth} id={id} />
          </div>
          <div className='profile__posts-center'>
            <SingleUserPosts post={post} userData={userData} profile={profile} auth={auth} id={id} />
          </div>
        </div>
        }
        <div className='profile-menu'>
          <div className='profile-menu__items'>
            <IconButton onClick={() => handletoggle('showaccount')}>
              <AccountCircleIcon />
            </IconButton>
            <IconButton onClick={() => handletoggle('showfriends')}>
              <PersonAddIcon />
            </IconButton>
            <IconButton onClick={() => handletoggle('showfollowing')}>
              <PeopleIcon />
            </IconButton>
            <IconButton onClick={() => handletoggle('showsaved')}>
              <BookmarksIcon />
            </IconButton>
          </div>
        </div>
          <div className='forMobileDevicesBio'>
            <button onClick={() => handletoggle('showbio')}>Show Bio</button>
          </div>
      </div>  
      {
        showfriends && <Friends userData={userData} profile={profile} auth={auth} id={id} />
      }
      {
        showfollowing && <Following userData={userData} profile={profile} auth={auth} id={id} />
      }
      {
        showsaved && <Saved auth={auth} />
      }
      <div className='forMobileBio'>
        {
          showbio && <ShowBio userData={userData} />
        }
      </div>
    </div>
  )
}

export default Profile