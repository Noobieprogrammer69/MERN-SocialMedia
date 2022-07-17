import React from 'react';
import { Navigate } from "react-router-dom";
import { Messages } from '../pages';

const PrivateMessages = ({props, children}) => {
    const login = localStorage.getItem('login')
        return login ? <Messages {...props}>{children}</Messages> : <Navigate to="/" />
      
}

export default PrivateMessages 