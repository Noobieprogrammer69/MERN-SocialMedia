import React, { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { FaSearchengin } from 'react-icons/fa';
import { MdFiberManualRecord } from 'react-icons/md';

import { getDataApi } from '../utils/fetchData';
import { AddUser, getConversations } from '../redux/actions/messageActions';

import UserCardMessage from './UserCardMessage';

const LeftSideMessage = () => {
    const [search, setSearch] = useState('');
    const [searchUser, setSearchUser] = useState([]);

    const { auth, message } = useSelector(state => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        if(message.firstLoad) return;
        dispatch(getConversations(auth))
    },[dispatch, auth, message.firstLoad])

    useEffect(() => {
        if(search && auth.token) {
            getDataApi(`search?username=${search}`, auth.token)
            .then(res => setSearchUser(res.data.users))
            .catch(error => {
                dispatch({
                    type: 'ALERT',
                    payload: {
                        error: error.response.data.msg
                    }
                })            
            })
        } else {
            setSearchUser([])
        }
    }, [search, auth.token, dispatch])

    const handleAddChat = (user) => {
        setSearch('')
        setSearchUser([])
        dispatch(AddUser({user, message}))
        navigate(`/message/${user._id}`)
    }

  return (
    <div className='leftSide'>
        <div className='leftSide-content-search'>
            <input type="text" placeholder='find other users' value={search} onChange={(e) => setSearch(e.target.value)} />
            <button className='messages-button'> <FaSearchengin style={{fontSize: '20px',}} /> </button>
        </div>
        <div className='leftSide-contentUser-List'>
            {
                searchUser.length > 0 ?
                <>
                    {
                        searchUser.map((user, index) => (
                            <div onClick={() => handleAddChat(user)} key={index}>
                                <UserCardMessage user={user} />
                            </div>
                        ))
                    }
                </>
                :
                <>
                {
                    message.users?.length > 0 && message.users?.map((user, index) => (
                        <div onClick={() => handleAddChat(user)} key={index}>
                            <UserCardMessage user={user} msg={true} >
                                {/* <MdFiberManualRecord style={{position: 'absolute', left: '220px', top: '80px', fontSize: '30px'}} /> */}
                            </UserCardMessage>
                        </div>
                    ))
                }
                </>
            }
        </div>
    </div>
  )
}

export default LeftSideMessage