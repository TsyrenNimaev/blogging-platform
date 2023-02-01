/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react';
import { connect } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import * as actions from '../../../services/servic-api';
import { RootState } from '../../../store/root-reducer';
import classes from '../Authorization.module.scss';
import { IFormLogUp } from '../../../store/type';

const SingUp: FC = ({ state, registers }: any) => {
  const { isLoged } = state.AutorizationReducer;
  const history = useHistory();

  const validationScheme = Yup.object().shape({
    username: Yup.string()
      .required('Required field')
      .min(2, 'You must specify at least two characters')
      .max(20, 'maximum number of characters - 20'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'maximum number of characters - 40'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
    checkbox: Yup.bool().oneOf([true], 'Checkbox selection is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<IFormLogUp>({ mode: 'onBlur', resolver: yupResolver(validationScheme) });

  const onSubmit: SubmitHandler<IFormLogUp> = (data) => {
    const postData: any = {
      user: { username: data.username, email: data.email, password: data.password },
    };
    registers(postData);
    reset();
  };

  if (isLoged) history.goBack();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <h3 className={classes.form__title}>Create new account</h3>
      <label className={classes.form__label}>
        Username
        <input
          {...register('username', { required: true })}
          type="text"
          className={`${classes.form__input} ${errors.username ? classes.invalid : classes.valid}`}
          placeholder="Username"
        />
      </label>
      <div className={classes.form__errors}>{errors?.username && <span>{errors?.username?.message}</span>}</div>
      <label className={classes.form__label}>
        Email address
        <input
          {...register('email', {
            required: 'Email is required',
          })}
          type="email"
          className={`${classes.form__input} ${errors.email ? classes.invalid : classes.valid}`}
          placeholder="Email address"
        />
      </label>
      <label className={classes.form__label}>
        Password
        <input
          {...register('password', { required: true })}
          type="password"
          className={`${classes.form__input} ${errors.password ? classes.invalid : classes.valid}`}
          placeholder="Password"
        />
      </label>
      <div className={classes.form__errors}>{errors.password?.message}</div>
      <label className={classes.form__label}>
        Repeat Password
        <input
          {...register('confirmPassword', { required: true })}
          type="password"
          className={`${classes.form__input} ${errors.confirmPassword ? classes.invalid : classes.valid}`}
          placeholder="Repeat password"
        />
      </label>
      <div className={classes.form__errors}>{errors.confirmPassword?.message}</div>
      <label className={classes.form__label}>
        I agree to the processing of my personal information
        <input {...register('checkbox', { required: true })} type="checkbox" className={classes.form__checkbox} />
      </label>
      <button type="submit" className={classes.form__btn} disabled={!isValid}>
        Create
      </button>
      <span>
        Already have an account? <Link to="sing-in">Sign In.</Link>
      </span>
    </form>
  );
};

const mapStateProps = (state: RootState) => {
  return { state };
};

export default connect(mapStateProps, actions)(SingUp);
