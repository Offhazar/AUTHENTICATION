import { useRef, useState, useContext } from 'react';
import { WEB_API_KEY } from '../../helpers/constants';
import classes from './AuthForm.module.css';
import { AuthContext } from '../../store/auth-context';
import { useHistory } from 'react-router-dom';

const AuthForm = () => {
  const authCtx = useContext(AuthContext);

  const [isLOading, setIsLoading] = useState(false);

  const history = useHistory();
  const emailInputRef = useRef();
  const passeordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const sumbitHandler = (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passeordInputRef.current.value;
    setIsLoading(true);

    let url;

    if (isLogin) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
        WEB_API_KEY;
    } else {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
        WEB_API_KEY;
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        reterntSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application.json',
      },
    })
      .then((response) => {
        setIsLoading(false);
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((data) => {
            let errorMEssage = 'Authetication failed';
            if (data && data.error && data.error.message) {
              errorMEssage = data.error.message;
            }
            throw new Error(errorMEssage);
          });
        }
      })
      .then((data) => {
        authCtx.login(data.idToken);
        history.replace('/')
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={sumbitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passeordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLOading && (
            <button>{isLogin ? 'Login' : 'Create Account'}</button>
          )}
          {isLOading && <p>sending request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
