import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector , useDispatch} from 'react-redux';

import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import '../styles/Register.css';
import { register } from '../redux/actions/authActions';


const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const [showCfPass, setShowCfPass] = useState(false);

  const initialState = {username: '', fullname: '',email: '', password: '', confirmPassword: ''}
  const [userData, setuserData] = useState(initialState);
  const {username, fullname, email, password, confirmPassword} = userData;

  const {auth, alert} = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setuserData({...userData, [name]: value})
  }

  useEffect(() => {
    if(auth.token){
      navigate('/')
    }
  }, [auth.token, navigate])
  
  const handleSubmit = (e) => {
    e.preventDefault();  
    dispatch(register(userData))
  }

  return (
    <div className="container2">
    <form onSubmit={handleSubmit}>
      <h1>Your Post</h1>
      <h3>Register</h3>
      <div className='inputBox'>
          <span>FullName</span>
          <div className='box'>
            <div className='icon'><AccountCircleIcon /></div>
            <input type="text" placeholder={alert.fullname ? `${alert.fullname}` : 'Enter your fullname'} name="fullname" value={fullname} onChange={handleChange}></input>
          </div>
      </div>
      <div className='inputBox'>
          <span>UserName</span>
          <div className='box'>
            <div className='icon'><AccountCircleIcon /></div>
            <input type="text" placeholder={alert.username ? `${alert.username}` : 'Enter your Username'} name='username' value={username} onChange={handleChange}></input>
          </div>
      </div>
      <div className='inputBox'>
          <span>Email</span>
          <div className='box'>
            <div className='icon'><AccountCircleIcon /></div>
            <input type="email" placeholder={alert.email ? `${alert.email}` : 'Enter your Email'} name='email' value={email} onChange={handleChange}></input>
          </div>
      </div>
      <div className='inputBox'>
          <span>Password</span>
          <small className="show-thing" onClick={() => setShowPass(!showPass)}> { showPass ? <VisibilityOffIcon /> : <RemoveRedEyeIcon /> } </small>
          <div className='box'>
            <div className='icon'><LockIcon /></div>
            <input type={showPass ? "type" : "password"} placeholder={alert.password ? `${alert.password}` : 'Enter your Password'} value={password} name='password' onChange={handleChange}></input>
          </div>
      </div>
      <div className='inputBox'>
          <span>Confirm Password</span>
          <small className="show-thing" onClick={() => setShowCfPass(!showCfPass)}> { showCfPass ? <VisibilityOffIcon /> : <RemoveRedEyeIcon /> } </small>
          <div className='box'>
            <div className='icon'><LockIcon /></div>
            <input type={showPass ? "type" : "password"} value={confirmPassword} placeholder={alert.confirmPassword ? `${alert.confirmPassword}` : 'Confirm Password'} name='confirmPassword' onChange={handleChange}></input>
          </div>
      </div>
      <div className='inputBox'>
          <div className='box'>
            <button type="submit">Log In</button>
          </div>
          <br />
          <small className="account-creation">Already have an Account? <Link to="/login"><small style={{color: 'hsl(252, 75%, 60%)'}}>Login Here</small></Link></small>
      </div>
    </form>
</div>
  )
}

export default Register