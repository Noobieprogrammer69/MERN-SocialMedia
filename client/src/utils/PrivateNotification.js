import React from 'react';
import { Navigate } from "react-router-dom";
import { Notification } from '../pages';

const PrivateNotification = ({props, children}) => {
    const login = localStorage.getItem('login')
        return login ? <Notification {...props}>{children}</Notification> : <Navigate to="/" />
      
}

export default PrivateNotification 