import React, { useState, useEffect } from 'react';

import { AiOutlineClose } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../redux/actions/profileActions';
import { checkimage } from '../utils/imageupload';

import CameraAltIcon from '@material-ui/icons/CameraAlt';

import '../styles/EditProfile.css';

const EditProfile = ({user, setOnEdit}) => {
    const initState = {school: '', fullname: '', address: '', nickName: '', phone: '', email: '', story: ''}
    const [editData, setEditData] = useState(initState);
    const {school, fullname, address, nickName, phone, email, story} = editData
    const [avatar, setAvatar] = useState('');

    const {auth} = useSelector(state => state);
    const dispatch = useDispatch()

    const changeavatar = (e) => {
      const file = e.target.files[0];
      const err = checkimage(file)
      if(err) return dispatch({ type: "ALERT", payload:{error: err} })
      setAvatar(file)
  }

  useEffect(() => {
      setEditData(user)
  }, [user])

  const handleChangeInput = (e) => {
      const { name, value } = e.target;
      setEditData({...editData, [name]:value})
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(updateProfile({editData,avatar,auth}))
      setOnEdit(false)
  }

  const selectupload = () => {
      const fileuploadinput = document.getElementById("file-upload")
      fileuploadinput.click();
  }

  return (
    <div className='editProfile'>
        <div className='editProfile__container'>
          <div className='editProfile__contents'>
            <h2>Edit Your Profile</h2> <AiOutlineClose className='editProfile__icon' style={{fontSize: '20px'}} onClick={() => setOnEdit(false)} />
            <div className="editprofile-avatar">
                <img className="for__the-avatar" onClick={selectupload} style={{ width: '100px', height: '100px' }} src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}  alt="" /> 
                {/* <img src= {avatar? URL.createObjectURL(avatar) : auth.user.avatar} alt=""/> */}
                <CameraAltIcon className="camera__icon" onClick={selectupload}></CameraAltIcon>
                <span>
                    <input style={{display:'none'}} type="file" id="file-upload" accept="image/*" onChange={changeavatar}/>
                </span>
                </div> 
            <div className='editProfile__edit'>
              <input type="text" placeholder='Type your new Fullname' name='fullname' value={fullname} onChange={handleChangeInput} />
            </div>
            <div className='editProfile__edit'>
              <input type="text" placeholder='Type your new NickName' name='nickName' value={nickName} onChange={handleChangeInput} />
            </div>
            <div className='editProfile__edit'>
              <input type="text" placeholder='Type your new School' name='school' value={school} onChange={handleChangeInput} />
            </div>
            <div className='editProfile__edit'>
              <input type="email" placeholder='Type your new Email' name='email' value={email} onChange={handleChangeInput} />
            </div>
            <div className='editProfile__edit'>
              <input type="text" placeholder='Type your new Address' name='address' value={address} onChange={handleChangeInput} />
            </div>
            <div className='editProfile__edit'>
              <input type="text" placeholder='Type your new Phone' name='phone' value={phone} onChange={handleChangeInput} />
            </div>
            <div className='editProfile__edit'>
              <input type="text" placeholder='Type your new Bio' name='story' value={story} onChange={handleChangeInput} />
            </div>
          </div>
          <div className='edit__button'>
            <button className='btn btn-primary' type="submit" onClick={handleSubmit}>
              <h2>Submit</h2>
            </button>
          </div>
        </div>
    </div>
  )
}

export default EditProfile