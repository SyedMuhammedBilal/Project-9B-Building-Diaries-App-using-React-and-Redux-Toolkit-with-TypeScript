import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { User } from '../../Interfaces/user.interface';
import * as Yup from 'yup';
import '../../Styles/Auth.css';
import http from '../../Server/Api';
import { saveToken, setAuthState } from './authSlice';
import { setUser } from './userSlice';
import { AuthResponse } from '../../Server/Mirage/Routes/user';
import { useAppDispatch } from '../../Store/store';

const schema = Yup.object().shape({
  username: Yup.string()
    .required('Please enter username')
    .max(16, 'Username cannot be longer than 16 characters'),
  password: Yup.string()
    .required('Please enter password'),
  email: Yup.string()
    .email('Please enter a valid email address'),
});
console.log(schema)

const Auth: FC = () => {

  const { handleSubmit, register, errors } = useForm<User>({});
  
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const submitForm = (data: User) => {
    const path = isLogin ? '/auth/login' : '/auth/signup';
    
    http
      .post<User, AuthResponse>(path, data)
      .then((res) => {
        if (res) {
          const { user, token } = res;
          dispatch(saveToken(token));
          dispatch(setUser(user));
          dispatch(setAuthState(true));
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false)
      });
  };

  return (
    <div className="d-form">
      <form onSubmit={handleSubmit(submitForm)} className="ls-form">
        <React.Fragment>
          <label htmlFor="username">Username</label>
          <input ref={register} className="d-i" type="text" id="username" placeholder="username" />
          {errors && errors.username && (
            <p className="error">{errors.username.message}</p>
          )}
        </React.Fragment>
        {!isLogin && (
          <React.Fragment>
            <label htmlFor="email">Email</label>
            <input ref={register} className="d-i" type="text" id="email" placeholder="Email" />
            {errors && errors.email && (
              <p className="error">{errors.email.message}</p>
            )}
          </React.Fragment>
        )}
        <React.Fragment>
          <label htmlFor="password">Password</label>
          <input ref={register} className="d-i" type="password" id="password" placeholder="password" />
          {errors && errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
        </React.Fragment>
        <button disabled={loading} className="d-btn" type="submit">
          {isLogin ? 'Login' : 'Create account'}
        </button>
        <p onClick={() => setIsLogin(!isLogin)} className="forget">
          <a className="d-a">
            {isLogin ? 'No account? Create one' : 'Already have an account?'}
          </a>
        </p>
      </form>
    </div>
  )
}

export default Auth