import { useEffect } from 'react';
import './App.css';

import { ALERT_TYPES } from "./redux/actions/alertActions";
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";

import { Home, Login, Messages, Notification, Post, Profile, Register } from './pages';
import { Alert, Conversation } from './components';
import PrivateMessages from './utils/PrivateMessages';
import PrivateNotification from './utils/PrivateNotification';
import SocketioClient from './SocketioClient'

import { useSelector, useDispatch } from 'react-redux';
import { refreshToken } from './redux/actions/authActions';
import { getPost } from './redux/actions/postActions';
import { getNotify } from './redux/actions/notifyActions';

import io from 'socket.io-client'

function App() {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  const login = localStorage.getItem('login');

  useEffect(() => {
    dispatch(refreshToken())
    const socket = io();
    dispatch({type: ALERT_TYPES.SOCKET, payload: socket})
    return () => socket.close();
  }, [dispatch])
  
  useEffect(() => {
    dispatch(getPost(auth.token))
    dispatch(getNotify(auth))
  }, [auth.token, auth, dispatch]);

  return (
    <div>
        <Router>
          <Alert />
          {auth.token && <SocketioClient />}
          <Routes>
            <Route exact path="/register" element={<Register />} /> 
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/" element={auth.token ? <Home /> : <Login />} /> 
            <Route exact path="/post/:id" element={login ? <Post /> : <Navigate to="/" />} />
            <Route exact path="/profile/:id" element={login ? <Profile /> : <Navigate to="/" />} />
            <Route exact path="/message/:id" element={login ? <Conversation /> : <Navigate to="/" />} />
            <Route exact path="/message" element={<PrivateMessages><Messages /></PrivateMessages>} />
            <Route exact path="/notification" element={<PrivateNotification><Notification /></PrivateNotification>} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
