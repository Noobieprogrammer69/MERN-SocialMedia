import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import MsgDisplay from './MsgDisplay';
import UserCardMessage from './UserCardMessage';

import { imageupload } from '../utils/imageupload';

import {MdSend, MdDelete, MdImage} from 'react-icons/md';
import { addMessage, deleteMessage, getMessages } from '../redux/actions/messageActions';

import loadIcon from '../images/loadIcon.gif'
import '../styles/Messages.css';

const RightSideMessage = () => {
  const [user, setUser] = useState([]);
  const [text, setText] = useState('');
  const [media, setMedia] = useState([]);
  const [loadMedia, setLoadMedia] = useState(false);

  const { auth, message, socket } = useSelector(state => state);
  const {id} = useParams();
  const dispatch = useDispatch();
  const refDisplay = useRef();


  useEffect(() => {
    const newData = message.users.find(item => item._id === id) 
    if(newData) {
      setUser(newData)
    }  
  }, [message.users, id])

  const uploadImgMessages = (e) =>{
    const files = [...e.target.files];
    let err='';
    let mediaArr = [];

    files.forEach(file=> {
      if(!file) return err="no file found";
      if(file.size > 5024 *5024 * 5) return err="file is too long";

      return mediaArr.push(file);       
    })
      if(err) { dispatch({type:"ALERT", payload:{error: err}}) }
      setMedia([...media, ...mediaArr])
  }

  const handleuploadinput = (e) => {
    e.preventDefault();
    const imageuploadfunc = document.getElementById("fileuploadmsg");
    imageuploadfunc.click();
  }

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

  const deleteimage = (inde) => {
    const newArrimage = [...media]
    newArrimage.splice(inde, 1)
    setMedia(newArrimage)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!text.trim() && media.length === 0) return;
    setMedia([])
    setText('')
    setLoadMedia(true)

    let medArr = []

    if(media.length > 0) medArr = await imageupload(media)

    const msg = {
      sender: auth.user._id,
      recipient: id,
      text,
      media: medArr,
      createdAt: new Date().toISOString()
    }
    setLoadMedia(false)
    dispatch(addMessage({auth, msg, socket}))
    if(refDisplay.current) {
      refDisplay.current.scrollIntoView({behavior: 'smooth', block: 'end'})
    }
  }
  
  useEffect(() => {
    if(id) {
      const getMessagesData = async () => {
        dispatch(getMessages({auth, id}))
        if(refDisplay.current) {
          refDisplay.current.scrollIntoView({behavior: 'smooth', block: 'end'})
        }
      }
      getMessagesData()
    }
  }, [id, dispatch, auth])

  const handleDeleteMsg = (data) => {
    dispatch(deleteMessage({message, data, auth}))
  }


  return (
    <div className='rightSide'>
      <div className='rightSide-content'>
        { user.length !== 0 && 
          <UserCardMessage user={user}>
            <MdDelete style={{fontSize: '40px', position: 'absolute', right: '20px', cursor: 'pointer', color: 'white'}} />
          </UserCardMessage>
        }
      </div>
      <form className='rightSide-messagesInput' onSubmit={handleSubmit}>
        <input type="text" placeholder='Message Here' value={text} onChange={(e) => setText(e.target.value)} />
        <div className='rightSide-content-file_upload'>
        <button onClick={handleuploadinput} className='rightSideEnd'><MdImage style={{fontSize: '20px'}} /></button>
        <input style={{display: 'none'}} onChange={uploadImgMessages} type="file" id="fileuploadmsg" multiple accept="image/*, video/*" />
        </div>
        <button type="submit" className='rightSideEnd' disabled={(text || media.length !== 0) ? false : true} style={{color: text ? 'blue' : 'black'}} ><MdSend style={{fontSize: '20px'}} /></button>
      </form>
      <div className='msg-mediadiv'>
        {
          media.length > 0 && media.map((item, index) => (
            <div className='msg-mediadiv-item' key={index}>
              {
                item.type.match(/video/i)
                ? videoshow(URL.createObjectURL(item))
                : imageshow(URL.createObjectURL(item))
              }
              <span className="msg-mediadiv-delete" onClick={()=>deleteimage(index)}> x </span>
            </div>
          ))
        }
      </div>
      <div className='rightSide-content-messages-main'>
        <div className='rightSide-content-messages' ref={refDisplay}>
          {
            message.data.map((msg, index) => (
              <div key={index} ref={refDisplay}>
                {
                  msg.sender !== auth.user._id && 
                <div className='rightSide-messages-others'>
                  <MsgDisplay user={user} msg={msg} />
                </div>
                }
              {
                msg.sender === auth.user._id &&
                <div className='rightSide-messages-ours'>
                  <MsgDisplay user={auth.user} msg={msg} />
                  <MdDelete className='deleteMessage-icon' onClick={() => handleDeleteMsg(msg)} style={{fontSize: '30px', color: 'black', cursor: 'pointer'}} />
                </div>
              }
              </div>
            ))
          }
          {
            loadMedia && 
            <div>
              <img src={loadIcon} alt="loading" />
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default RightSideMessage