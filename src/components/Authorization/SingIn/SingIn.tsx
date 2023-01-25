/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { connect } from 'react-redux';

import * as actions from '../../../services/servic-api';
import { RootState } from '../../../store/root-reducer';
import { LoginRequestData } from '../../../store/type';
// import classes from './SingIn.module.scss';
import classes from '../Authorization.module.scss';

interface IFormInput {
  email: string;
  password: string;
}

const SingIn: FC = ({ login, state }: any) => {
  const history = useHistory();
  const [isError, setIsError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ mode: 'onBlur' });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const postData: any = {
      user: { email: data.email, password: data.password },
    };
    login(postData);
    setIsError(false);
  };

  if (state.AutorizationReducer.isLoged) history.goBack();

  useEffect(() => {
    if (state.AutorizationReducer.error !== null) {
      setIsError(true);
    }
  }, [state.AutorizationReducer.error]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <h3 className={classes.form__title}>Sign In</h3>
      <label className={classes.form__label}>
        Email address
        <input
          {...register('email', {
            required: true,
            minLength: {
              value: 1,
              message: 'Please enter a valid email',
            },
          })}
          type="email"
          className={classes.form__input}
          placeholder="Email address"
        />
      </label>
      <div className={classes.form__errors}>{errors.email?.message}</div>
      <label className={classes.form__label}>
        Password
        <input
          {...register('password', { required: true })}
          type="password"
          className={classes.form__input}
          placeholder="Password"
        />
      </label>
      <button type="submit" className={classes.form__btn}>
        Login
      </button>
      <span>
        Don’t have an account? <Link to="sing-up">Sign Up.</Link>
      </span>
    </form>
  );
};

const mapStateProps = (state: RootState) => {
  return { state };
};

export default connect(mapStateProps, actions)(SingIn);
