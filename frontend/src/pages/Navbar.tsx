import '../styles/navbar.css';
import logo from '../assets/logo.png';
import { useAppDispatch, useAppSelector } from '../hoocs/hoocs';
import { checkIsAuth } from '../redux/reducers/authSlice';
import {logout} from '../redux/reducers/authSlice'
import { Link } from 'react-router-dom';

const Navbar = () => {
  const isAuth = useAppSelector((state) => checkIsAuth(state.authReducer))
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout())
    window.localStorage.removeItem('token');
  }

  return (
    <div className='navbar'>
      {isAuth && (
        <div className='navbar_in'>

          <a href='/' className='logo_container'>
            <img className='logo' src={logo} />
            <span className='logo_text'>вконтакте</span>
          </a> 

          <input placeholder='Search'/>

          <a href='/login' className='logout' onClick={handleLogout}>Выйти</a>
        </div>
      )}
      {!isAuth && (
        <div className='navbar_in'>

          <a href='/' className='logo_container'>
            <img className='logo' src={logo} />
            <span className='logo_text'>вконтакте</span>
          </a> 

          <a className='logout' href='/login'>Войти</a>
        </div>
      )}
    </div>
  )
}

export default Navbar
