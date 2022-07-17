import React, {useState} from 'react';

import {BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill} from 'react-icons/bs'

import '../styles/PostCardBody.css';

const PostCardBody = ({pos}) => {
  const [readMore, setReadMore] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);

  const shownextimage = (nextimage) => {
    if(currentImage < nextimage.length - 1) {
      setCurrentImage(prev => prev + 1)
    }
  }

  const showprevimage = (previmage) => {
    if(currentImage > 0 && currentImage <= previmage.length - 1) {
      setCurrentImage (prev => prev - 1)
    }
  }
  
  return (
    <div className='postCardBody'>
      <div className='postCardBody__content'>
      {pos && pos.content.length < 60 ?
      pos.content : 
      readMore ? pos.content + '....' : pos.content?.slice(0,60) + '.....'}
      <span>
        {
          pos.content?.length > 60 &&
          <span style={{color: 'blue', cursor: 'pointer'}} onClick={() => setReadMore(!readMore)} >
          {
            readMore ? 'Hide' : 'Show'
          }
          </span>
        }
      </span>
      </div>
      <div className="postCardBody__img">
        {pos.images?.length > 1 ? 
          <div>
            <BsFillArrowRightCircleFill onClick={() => shownextimage(pos.images)} className='arrow-right_icon' />
            <BsFillArrowLeftCircleFill onClick={() => showprevimage(pos.images)} className='arrow-left_icon' />
          </div> : null} 
        {pos.images?.length > 0 && pos.images.map((image, index) => (
            (index === currentImage) && 
          <div className='postCard_images' key={index} >
            { 
              image.secure_url.match(/video/i) 
              ? <video controls src={image.secure_url} alt={pos.user?.fullname} height="100%" width="100%" />
              : <img src={image.secure_url} alt={pos.user?.fullname} />
            }
          </div>
        ))}
      </div>
    </div>
  )
}

export default PostCardBody