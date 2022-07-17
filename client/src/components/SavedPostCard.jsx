import React from 'react';
import {Link} from 'react-router-dom';

import { MdFavoriteBorder, MdComment } from 'react-icons/md';

import moment from 'moment';

import '../styles/SavedPostCard.css';

const SavedPostCard = ({savedpost}) => {
  return (
    <div className="savepostcard">
    <Link to={`/post/${savedpost._id}`}>    <div className="savepostcard-content">
            <div className="savepostcard-contentuserinfo">
                <img className="savepostcard-contentuserinfoavatar" src={savedpost.user?.avatar} alt=""/>
                <div className="savepostcard-contentinfodetail">
                    <h5 className="savepostcard-contentinfodetailfullname">{savedpost.user?.fullname}</h5>
                    <small className="savepostcard-contentinfodetailusername">{savedpost.user?.username}</small>
                </div>
            </div>
            <div className="savepostcard-contentmiddle">
                {
                    savedpost.images[0]?.secure_url.match(/video/i)
                    ? <div>
                      <p className='foraligning'>{savedpost.content}</p>
                        <video controls src={savedpost.images[0]?.secure_url} alt="" />
                      </div>
                    : 
                    <div>
                      <p className='foraligning'>{savedpost.content}</p>
                      <img src={savedpost?.images[0]?.secure_url} alt=""/>
                    </div>
                }
            </div>
            <div className="savedpostcard-contentend">
                <div className="savedpostcard-contentenditem">
                <h6 className="savedpostcard-contentenditemtext">{savedpost.likes.length}</h6> 
                <MdFavoriteBorder style={{color: savedpost.likes.length === 0 ? 'black' : 'red'}}/>
                </div>
                <div className="savedpostcard-contentenditem">
                <h6 className="savedpostcard-contentenditemtext">{savedpost.commentss.length}</h6> 
                <MdComment style={{color: savedpost.commentss.length === 0 ? 'black' : 'gray'}}/>
                </div>
            </div>
            <div className="savedpostcard-contentendtime">
                <small className="savedpostcard-contentendtimetext">Post Created At:</small>
                <small className="savedpostcard-contentendtimeformat">{moment(savedpost.createdAt).format("MM/DD/YYYY")}</small>
            </div>
        </div>
        </Link>
    </div>
  )
}

export default SavedPostCard