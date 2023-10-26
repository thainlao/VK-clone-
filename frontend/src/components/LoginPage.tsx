import { useEffect, useState, ChangeEvent } from 'react';
import '../styles/login.css';
import qr from '../assets/qr.jpg';
import { useAppDispatch, useAppSelector } from '../hoocs/hoocs';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { checkIsAuth, loginUser } from '../redux/reducers/authSlice';

const LoginPage = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuth = useAppSelector((state) => checkIsAuth(state.authReducer))
  const {status} = useAppSelector(state => state.authReducer)

  useEffect(() => {
    if (status) toast(status)
    if(isAuth) {
      navigate('/');
    }
    
  }, [status, navigate])

  const handleSubmit = () => {
    try {
      dispatch(loginUser({username, password}))
    } catch (e) {
      console.log(e);
    }
  }

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className='login'>
      <form onSubmit={(e) => e.preventDefault()}>
        <h1>Вход ВКонтакте</h1>

        <input placeholder='Имя пользователя'
        value={username}
        type='text'
        onChange={handleUsernameChange}
        />

        <input placeholder='Пароль'
        value={password}
        type='password'
        onChange={handlePasswordChange}
        />

        <button onClick={handleSubmit} className='log_button'>Войти</button>

        <div className='hor_line'></div>

        <div className='qr_container'>
          <img className='qr' src={qr}/>
          <div style={{display: 'flex', gap:'16px', flexDirection: 'column', whiteSpace: 'nowrap'}}>
            <h2>Быстрый вход по QR-коду</h2>
            <h3>Наведите камеру телефона</h3>
          </div>
        </div>

      </form>

      <div className='reg_form'>
        <a href='/register' className='reg_button'>Зарегистрироваться</a>

        <h4>После регистрации вы получите доступ ко всем возможностям VK ID</h4>
      </div>
    </div>
  )
}

export default LoginPage
