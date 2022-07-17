import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import SavedPostCard from './SavedPostCard';

import { getDataApi } from '../utils/fetchData';

import '../styles/Friends.css'

const Saved = ({auth}) => {
  const [savedposts, setSavedposts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if(auth.token) {
      getDataApi('savedpostget', auth.token)
      .then(res => {setSavedposts(res.data.savedposts)})
      .catch(err => console.log(err))
    }
    return () => setSavedposts([])
  }, [auth.token])
  console.log(savedposts)

  return (
    <div className='savePostCardMobile'>
      { savedposts.map(savedpost => (
        <SavedPostCard savedpost={savedpost} key={savedpost._id} />
      ))}
    </div>
  )
}

export default Saved