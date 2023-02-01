/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { connect } from 'react-redux';

import * as actions from '../../../services/servic-api';
import { RootState } from '../../../store/root-reducer';
import { IFormSingIn, LoginRequestData } from '../../../store/type';
import classes from '../Authorization.module.scss';

const SingIn = ({ login, state }: any) => {
  const history = useHistory();
  const [isError, setIsError] = useState(false);
  const hasError = state.AutorizationReducer.error;
  const { isLoged } = state.AutorizationReducer;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormSingIn>({ mode: 'onBlur' });

  const onSubmit: SubmitHandler<IFormSingIn> = (data: LoginRequestData) => {
    const postData: any = {
      user: { email: data.email, password: data.password },
    };
    login(postData);
    setIsError(false);
  };

  if (isLoged) history.goBack();

  useEffect(() => {
    if (state.AutorizationReducer.error !== null) {
      setIsError(true);
    }
  }, [state.AutorizationReducer.error]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <h3 className={classes.form__title}>Sign In</h3>
      {!hasError ? null : <span className={classes.erLogin}>Autorization Erorr</span>}
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
