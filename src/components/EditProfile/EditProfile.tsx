/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { connect } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import * as actions from '../../services/servic-api';
import { RootState, useAppSelector } from '../../store/root-reducer';
import classes from '../Authorization/Authorization.module.scss';
import { IFormProfile } from '../../store/type';

const EditProfile = ({ editProfile }: any) => {
  const history = useHistory();
  const authorInfo = useAppSelector((state) => state.AutorizationReducer.user);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormProfile>({
    mode: 'onBlur',
    defaultValues: { username: authorInfo?.user.username, email: authorInfo?.user.email },
  });

  const onSubmit: SubmitHandler<IFormProfile> = (data: any) => {
    const updateData: any = {
      user: { username: data.username, email: data.email, password: data.password, image: data.image },
    };
    editProfile(updateData);
    history.replace('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <h3 className={classes.form__title}>Profile editing</h3>
      <label className={classes.form__label}>
        Username
        <input
          {...register('username', { required: true })}
          type="text"
          className={`${classes.form__input} ${errors.username ? classes.invalid : ''}`}
          placeholder="Username"
        />
        <div className={classes.form__errors}>{errors.username && <span>{errors?.username?.message}</span>}</div>
      </label>
      <label className={classes.form__label}>
        Email address
        <input
          {...register('email', { required: true })}
          type="email"
          className={`${classes.form__input} ${errors.email ? classes.invalid : ''}`}
          placeholder="Email address"
        />
        <div className={classes.form__errors}>{errors.email && <span>{errors?.email?.message}</span>}</div>
      </label>
      <label className={classes.form__label}>
        New password
        <input
          {...register('password', { required: true })}
          type="password"
          className={`${classes.form__input} ${errors.password ? classes.invalid : ''}`}
          placeholder="New password"
        />
        <div className={classes.form__errors}>{errors.password && <span>{errors?.password?.message}</span>}</div>
      </label>
      <label className={classes.form__label}>
        Avatar image
        <input
          {...register('avatar', { required: false })}
          type="url"
          className={`${classes.form__input} ${errors.avatar ? classes.invalid : ''}`}
          placeholder="Avatar image"
        />
        <div className={classes.form__errors}>{errors.avatar && <span>{errors?.avatar?.message}</span>}</div>
      </label>
      <button type="submit" className={classes.form__btn} disabled={!isValid}>
        Save
      </button>
    </form>
  );
};

const mapStateProps = (state: RootState) => {
  return { state };
};

export default connect(mapStateProps, actions)(EditProfile);
