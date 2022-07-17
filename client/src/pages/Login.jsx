import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';

import { login } from '../redux/actions/authActions';
import {useDispatch} from 'react-redux';

import '../styles/Login.css';

const Login = () => {
  const initialState = {email: '', password: ''};
  const [showPass, setShowPass] = useState(false);
  const [userData, setUserData] = useState(initialState);
  const {email, password} = userData;

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUserData({...userData, [name]:value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    dispatch(login(userData));
  }

  return (
    <div className="container2">
    <form onSubmit={handleSubmit}>
      <h1>Social</h1>
      <h3>Log In</h3>
      <div className='inputBox'>
          <span>Email</span>
          <div className='box'>
            <div className='icon'><AccountCircleIcon /></div>
            <input type="email" name='email' value={email} onChange={handleChange}></input>
          </div>
      </div>
      <div className='inputBox'>
          <span>Password</span>
          <small className="show-thing" onClick={() => setShowPass(!showPass)}> { showPass ? <VisibilityOffIcon /> : <RemoveRedEyeIcon /> } </small>
          <div className='box'>
            <div className='icon'><LockIcon /></div>
            <input type={showPass ? "type" : "password"} value={password} name='password' onChange={handleChange}></input>
          </div>
      </div>
      <div className='inputBox'>
          <div className='box'>
            <button type="submit">Log In</button>
          </div>
          <br />
          <small className="account-creation">Do not have an Account? <Link to="/register"><small className='forRedirecting' style={{color: 'hsl(252, 75%, 60%)'}}>Create Here</small></Link></small>
      </div>
    </form>
</div>
  )
}

export default Login