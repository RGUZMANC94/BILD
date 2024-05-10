import React, { useRef, useState } from 'react';
import styles from './login.module.css';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';
import { useContext } from 'react';
import { MyContext } from '../../pages/_app.js'; // Asegúrate de que la ruta de importación sea correcta


const LogInComponent = () => {
  const dispatch = useDispatch();
  const username = useRef(null);
  const password = useRef(null);
  const { setContextValue } = useContext(MyContext);

  const [errorLogin, setErrorLogin] = useState(false);

  const router = useRouter();

  const getLoginData = async () => {
    const userNameValueInput = username.current.value;
    const passwordValueInput = password.current.value;

    if (
      !userNameValueInput ||
      !passwordValueInput ||
      !userNameValueInput === '' ||
      !passwordValueInput === ''
    ) {
      alert('llena todos los datos');
      return;
    }

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userNameValueInput,
        password: passwordValueInput,
      }),
    });
    const loginData = await response.json();
    console.log(loginData);
    const { error } = loginData;
    if (error) {
      setErrorLogin(true);
      return;
    }
    dispatch(setUser(loginData));
    console.log(loginData);

    const tokenResponse = await fetch('/api/getSessionToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type:'client_credentials',
        client_id: 'BILD@DevelopmentClient',
        client_secret: '0f64c95acb3a7fb93ee845d2d3d26c8e391d373e'
      }),
    });
      
    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.log('Error: ', errorText);
      throw new Error(
        `Bad response from server: Token Session - ${errorText}`
      );
    }

    const tokenData = await tokenResponse.json();

    console.log('solo token: ',tokenData.accesss_token);

    console.log('token data Inicio de sesion: ',tokenData);
     
    setContextValue(tokenData.accesss_token);
    router.push('/');
  };

  const logInFn = async (e) => {
    await getLoginData(e);
  };
  return (
    <>
      {errorLogin && (
        <p className={styles.errorMessage}>
          Usuario o contraseña incorrectos, intente nuevamente.
        </p>
      )}
      <div className={styles.form}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            logInFn(event);
            return false;
          }}>
          <div className={styles['user-box']}>
            <label
              htmlFor="text"
              onClick={() => {
                console.log('first');
              }}>
              Usuario
            </label>
            <input
              ref={username}
              className={styles['input-form']}
              type="text"
              id="text"
              name="text"
              placeholder="mail@address.com"
            />
          </div>
          <div className={styles['user-box']}>
            <label htmlFor="psw">
              <b>Password</b>
            </label>
            <input
              ref={password}
              className={styles['input-password']}
              type="password"
              placeholder="**********"
              name="psw"
              id="psw"
              required
            />
          </div>
          <div className={styles['login-button']}>
            <button className={styles.login} type="submit">
              INGRESO
            </button>
            <div className={styles.arrow}>
              <i className={styles['fa-solid fa-chevron-right']}></i>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default LogInComponent;
