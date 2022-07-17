import React, { useState, useEffect } from 'react';

import { Link, useLocation } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import MessageIcon from '@material-ui/icons/Message';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { GiHamburgerMenu } from 'react-icons/gi'

import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../redux/actions/authActions';
import { getDataApi } from '../utils/fetchData';

import UserCard from './UserCard';
import '../styles/Navbar.css';

const Navbar = () => {
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);
    const [load] = useState(false);
    const [mobileNav, setMobileNav] = useState(false);

    const dispatch = useDispatch();
    const { auth, notify } = useSelector(state => state);
    const { pathname } = useLocation();

    const isActive = (pn) => {
        if(pn === pathname) return 'active'
    }

    const isMobileActive = (mbpn) => {
        if(mbpn === pathname) return 'mobileActive'
    }

    useEffect(() => {
        if(search && auth.token) {
            getDataApi(`search?username=${search}`, auth.token)
            .then(res => setUsers(res.data.users))
            .catch(error => {
                dispatch({
                    type: 'ALERT',
                    payload: {
                        error: error.response.data.msg
                    }
                })            
            })
        } else {
            setUsers([])
        }
    }, [search, auth.token, dispatch])

    const handleClose = () => {
        setSearch('');
        setUsers([]);
    }

  return (

    <nav>
         <div className='container4'>
            <Link to="/">
                <h2 className='log'>
                    Social
                </h2>     
            </Link>
            <div className='search-place'>
            <span className='closeTag' onClick={handleClose} style={{ opacity: users.length > 0 ? '1' : '0' }}>&times;</span>
                 <input type="text" placeholder='Search Profiles' value={search} onChange={(e) => setSearch(e.target.value)} />
               <div className='searches'>
                {load && <h2>Loading...</h2>}
                {
                   search && users.length > 0 && users.map(user => (
                        <UserCard user={user} key={user._id} />
                    ))
                }
               </div>
           </div>
 
             <div className='create'>
                 <label className='btn btn-primary for-mobileDevices' for="create-post">Create</label>
                 <Link to={`/profile/${auth.user?._id}`}>
                     <div className='profile-photo'>
                         <img src={auth?.user?.avatar ? auth?.user?.avatar : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'}  alt="user-profile" />
                     </div>
                 </Link>
             </div>
             <div className='for-mobileDevices'>
                <Link to="/">
                    <IconButton>
                        <HomeIcon className={`${isActive('/')}`}  />
                    </IconButton>
                </Link>
                <Link to="/message">
                    <IconButton>
                        <MessageIcon className={`${isActive('/messages')}`} />
                    </IconButton>
                </Link>
                <Link to="/notification">
                    <IconButton>
                        <NotificationsIcon className={`${isActive('/notification')}`} />
                </IconButton>
                        <span style={{position: 'absolute', transform: 'translate(-10px),', color: 'red'}}>{notify && notify.data.length}</span>
                </Link>
                <IconButton onClick={()=>dispatch(logout())}>
                    <ExitToAppIcon/>
                </IconButton>
             </div>
             <div className='mobileNav'>
                 <GiHamburgerMenu style={{fontSize: '30px', color: 'black', marginLeft: '20px'}} onClick={() => setMobileNav(true)}/>
                {
                    mobileNav && (
                        <div className='mobileNav-contents'>
                            <GiHamburgerMenu style={{fontSize: '40px', color: 'black', marginLeft: '20px', position: 'absolute', left: '320px'}} onClick={() => setMobileNav(false)}/>
                                <div style={{display: 'flex', flexDirection: 'column', marginTop: '100px', marginLeft: '30px'}}>
                                    <Link to="/">
                                        <IconButton>
                                            <HomeIcon style={{fontSize: '80px', marginLeft: '100px'}} className={`${isMobileActive('/')}`}  />
                                        </IconButton>
                                    </Link>
                                    <Link to="/message">
                                        <IconButton>
                                            <MessageIcon style={{fontSize: '80px', marginLeft: '100px'}} className={`${isMobileActive('/messages')}`} />
                                        </IconButton>
                                    </Link>
                                    <Link to="/notification">
                                        <IconButton>
                                            <NotificationsIcon style={{fontSize: '80px', marginLeft: '100px'}} className={`${isMobileActive('/notification')}`} />
                                    </IconButton>
                                            {/* <span style={{position: 'absolute', transform: 'translate(-10px),', color: 'red'}}>{notify && notify.data.length}</span> */}
                                    </Link>
                                    <IconButton onClick={()=>dispatch(logout())}>
                                        <ExitToAppIcon style={{fontSize: '80px', marginLeft: '100px'}} />
                                    </IconButton>
                                </div>
                        </div>
                    )
                }
             </div>
         </div>
        </nav> 


  )
}

export default Navbar