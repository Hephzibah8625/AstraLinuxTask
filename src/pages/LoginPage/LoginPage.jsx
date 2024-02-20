import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { InputWithLabel, CustomButton } from "../../UI/index";
import classes from "./LoginPage.module.css";

const authFunction = async (login, password) => {
  const usersData = [
    {
      login: 'user',
      username: 'user132',
      password: '123',
    },
    {
      login: 'admin',
      username: 'coolUser',
      password: '123',
    }
  ]

  return usersData.find((u) => u.login === login && u.password === password);
}

const LoginPage = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const errRef = useRef();
  
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    setErrMsg('');
  }, [login, password]);

  const signIn = async () => {
    const response = await authFunction(login, password);
    
    if (response) {
      setAuth(response);
      setLogin('');
      setPassword('');
      navigate(from, { replace: true });
    }
    else {
      setErrMsg('Неправильные данные');
    }
  }
  
  return (
    <div className={classes.login}>
      <InputWithLabel
        value={login}
        onChange={e => setLogin(e.target.value)}
        label="Логин"
        type="text"
        placeholder="Введите email"
      />
      <InputWithLabel
        value={password}
        onChange={e => setPassword(e.target.value)}
        label="Пароль"
        type="password"
        placeholder="Введите пароль"
      />
      <div ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{ errMsg }</div>
      <CustomButton onClick={signIn}>Войти</CustomButton>
    </div>
  );
}
  
export default LoginPage;
