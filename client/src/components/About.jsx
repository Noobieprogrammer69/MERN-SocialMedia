import React from 'react'

import { MdSchool, MdEmail }from 'react-icons/md';
import { BsFillHouseFill,  BsFillTelephoneFill  } from 'react-icons/bs';
import {AiTwotoneTags} from 'react-icons/ai';

import '../styles/About.css';

const About = ({userData}) => {

  return (
    <div className='about'>
        {userData.length > 0 && userData.map(user => (
            <div className='about__intro' key={user._id}>
                <h2>Introduction</h2>
                <div className='for__border' />
                <div className='about__contents'>
                   <MdSchool className='about__icon' style={{fontSize: '20px'}} /> <h3>School</h3> <h4 className='user-school'>{user.school}</h4>
                   <BsFillHouseFill className='about__icon' style={{fontSize: '20px'}} /> <h3>Address</h3> <h4 className='user-address'>{user.address}</h4>
                   <AiTwotoneTags className='about__icon' style={{fontSize: '20px'}} /> <h3>NickName</h3> <h4 className='user-nickname'>{user.nickName}</h4>
                   <BsFillTelephoneFill className='about__icon' style={{fontSize: '20px'}} /> <h3>Phone</h3> <h4 className='user-phone' >{user.phone}</h4>
                   <MdEmail className='about__icon' style={{fontSize: '20px'}} /> <h3>Email</h3> <h4 className='user-email'>{user.email}</h4>
                </div>
            <div className='about__bio'>
                <h2>Bio</h2>
                <div className='about__bio-contents'>
                    <p>{user.story}</p>
                </div>
            </div>
            </div>  
        ))}
    </div>
  )
}

export default About