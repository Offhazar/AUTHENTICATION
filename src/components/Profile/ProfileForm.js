import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useRef } from 'react/cjs/react.development';
import { WEB_API_KEY } from '../../helpers/constants';
import { AuthContext } from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const newPasswordInput = useRef();
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const sumbitHandler = (e) => {
    e.preventDefault();

    const enterePassword = newPasswordInput.current.value;

    fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:update?key=' +
        WEB_API_KEY,
      {
        method: 'POST',
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enterePassword,
          returnSecureToken: false,
        }),
        headers: {
          'Content-Type': 'applicatin.json',
        },
      }
    )
      .then((datA) => {
        history.replace('/');
      })
      .catch((error) => {});
  };
  return (
    <form onSubmit={sumbitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          min="6"
          type="password"
          id="new-password"
          ref={newPasswordInput}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
