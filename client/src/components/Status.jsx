import React, {useState, useEffect, useRef} from 'react';

import { BsCameraFill } from 'react-icons/bs';
import { HiPhotograph } from 'react-icons/hi';

import { useDispatch, useSelector } from 'react-redux';

import { createpost, updatepost } from '../redux/actions/postActions';

import {ALERT_TYPES} from '../redux/actions/alertActions';

import "../styles/Status.css"

const Status = () => {
    const {auth,status, socket} = useSelector(state => state)
    const [content, setContent] = useState('')
    const dispatch = useDispatch();
    const [images, setImages] = useState([])
    const [stream, setStream] = useState(false)
    const [tracks, setTracks] = useState('')
    const refVideo = useRef();
    const refCanvas = useRef();

    useEffect(() => {
        if(status.edit) {
            setContent(status.content)
            setImages(status.images)
        }
    }, [status])

    const uploadimages = (e) =>{
        const files = [...e.target.files];
        let err='';
        let imagesArr = [];

        files.forEach(file=> {
            if(!file) return err="no file found";
            if(file.size > 5024 *5024 * 5) return err="file is too long";

            return imagesArr.push(file);       
    })
        if(err) { dispatch({type:"ALERT", payload:{error: err}}) }
        setImages([...images, ...imagesArr])
    }

    const deleteimage = (ind) => {
        const newArrimage = [...images]
        newArrimage.splice(ind, 1)
        setImages(newArrimage)
    }

    const handleuploadinput = () => {
        const imageuploadfunc = document.getElementById("postupload");
        imageuploadfunc.click();
    }

    const handleStream = () => {
        setStream(true);
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({video:true})
            .then((stream => {
                refVideo.current.srcObject = stream;
                refVideo.current.play();
                const track = stream.getTracks()
                setTracks(track[0])
            })).catch(err => console.log(err));
        }
    }

    const handlecameraimage = () =>{
        const width = refVideo.current.clientWidth;
        const height = refVideo.current.clientWidth;

        refCanvas.current.setAttribute('width', width);
        refCanvas.current.setAttribute('height', height);
        const ctx = refCanvas.current.getContext('2d');
        ctx.drawImage(refVideo.current, 0, 0, width, height)
        const URL = refCanvas.current.toDataURL();
        setImages([...images, {camera:URL}])
        console.log(images)
    }

    const handleStreamStop = () =>{
        setStream(false)
    }

    const handleSubmit = (e) =>{
        e.preventDefault();

        if(status.edit) {
            dispatch(updatepost({content, images, auth, status, socket}))
            dispatch({type: ALERT_TYPES.STATUS, payload: {edit : false}})
        } else {
            dispatch(createpost({content, images, auth, socket}))
            setContent('')
            setImages([])
            if(tracks) tracks.stop()
        }
    }

    const handleDiscard = (e) => {
        e.preventDefault();
        setContent('')
        setImages([])
        if(tracks) tracks.stop();
        dispatch({type: ALERT_TYPES.STATUS, payload: {edit : false}})
    }

    const imageshow = (src) => {
        return(
            <>
            <img src={src} alt="" className="status-middleimages"/>
        </>
        )
    }
    const videoshow = (src) => {
        return(
            <>
            <video controls src={src} alt="" className="status-middleimages"/>
        </>
        )
    }

  return (
    <div className='status'>
        <form onSubmit={handleSubmit}>
            <div className='status-header'>
                <img src={auth.user.avatar ? auth.user.avatar : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'}  alt="user-profile" />
                <h4>Post Here</h4>
            </div>
            <div className='status-middle'>
            <textarea type="text" placeholder="Share your thoughts" 
                value={content} onChange={(e)=>setContent(e.target.value)}
                rows="5" col="1000"/>
            </div>
            <div className='status-imagesdiv'>
            {
                    images && images.map((image,index)=> (
                        
                      <div className="status-middleimagecontainer" >
                        {
                           image.camera ? imageshow(image.camera)
                           :image.secure_url?
                           <>{
                               image.secure_url.match(/video/i) 
                               ? videoshow(image.secure_url)
                               : imageshow(image.secure_url)
                           }
                           </>
                           :
                           <>
                           {
                           image.type.match(/video/i)
                           ? videoshow(URL.createObjectURL(image))
                           : imageshow(URL.createObjectURL(image))
                        }
                           </>
                       }
                           <span className="status-middleimagedelete" onClick={()=>deleteimage(index)}> x </span>
                    </div>
                ))}
            </div>
            {
                stream && <div className='status-stream'>
                    <video autoPlay muted ref={refVideo} style={{height:'100px', width:'100%', border:'2px solid gray', padding:'3px',  borderRadius:'10px'}} />
                    <span className="status-middlestreamstop" onClick={handleStreamStop}> x </span>
                    <canvas ref={refCanvas} style={{display:'none'}}/>
                </div>
            }
            <div className='status-footer'>
                <div className='status-footerright'>
                    {
                        stream
                        ? <HiPhotograph onClick={handlecameraimage} />
                        :
                        <>
                        <BsCameraFill onClick={handleStream} className='forcamera' style={{fontSize: '30px'}} />
                        <HiPhotograph onClick={handleuploadinput} className='forphoto' style={{fontSize: '30px'}}/>
                        </>
                    }
                    <span>
                        <input style={{display: 'none'}} type="file" id="postupload" multiple onChange={uploadimages} />
                    </span>
                </div>
                <div className='status-foot'>
                    <button className='btn-post btn-primary-post mobilePost-discard' onClick={handleDiscard} style={{position: 'relative', right: '20px'}} >Discard</button>
                    <button className=' btn-post btn-primary-post mobilePost-post' type="submit" >Post</button>
                </div>
            </div>
        </form>
    </div>
  )
}

export default Status