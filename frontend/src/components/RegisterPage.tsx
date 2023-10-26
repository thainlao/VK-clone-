import React, {useState, useEffect, ChangeEvent} from 'react';
import '../styles/login.css';
import logo from '../assets/logo.png';
import { useAppDispatch, useAppSelector } from '../hoocs/hoocs';
import { checkIsAuth, registerUser } from '../redux/reducers/authSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const {status} = useAppSelector(state => state.authReducer)
  const isAuth = useAppSelector((state) => checkIsAuth(state.authReducer))
  const navigate = useNavigate();

  useEffect(() => {
    if (status) {
      toast(status)
    }
    if (isAuth) {
      navigate('/')
    }
  }, [status, isAuth, navigate])

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSurnameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSurname(e.target.value);
  };

  const handleRegistration = () => {
    try {
      dispatch(
        registerUser({
          username,
          password,
          name,
          surname,
        })
      );
      setPassword('');
      setUsername('');
      setSurname('');
      setName('');
    } catch (e) {
      console.log(e)
    }
  };

  return (
    <div className='login'>
      <form onSubmit={(e) => e.preventDefault()}>
        <h1>Регистрация пользователя</h1>
        <img src={logo} />

        <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={handleUsernameChange}
      />

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={handleNameChange}
      />

      <input
        type="text"
        placeholder="Surname"
        value={surname}
        onChange={handleSurnameChange}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
      />

        <button onClick={handleRegistration} className='reg_button'>Зарегистрироваться</button>

        <div className='hor_line'></div>

      </form>
    </div>
  )
}

export default RegisterPage
