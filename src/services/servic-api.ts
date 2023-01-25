/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from 'redux';
import axios from 'axios';

import { GetActionType, GetCombineType } from '../store/action';
import { LoginRequestData, RegisterRequestData } from '../store/type';

export const getContent = (num: number) => {
  return async (dispatch: Dispatch<GetCombineType>) => {
    try {
      const response = await axios.get(`https://blog.kata.academy/api/articles?limit=5&offset=${num}`);
      dispatch({
        type: GetActionType.SUCCESS_LOAD,
        payload: response.data.articles,
        totalPages: response.data.articlesCount,
        loading: false,
        errors: false,
      });
    } catch (err: any) {
      if (err.request) {
        dispatch({ type: GetActionType.ERROR_LOAD, payload: true });
      }
    }
  };
};

export const getSinglePage = (slug: string) => {
  return async (dispatch: Dispatch<GetCombineType>) => {
    const response = await axios.get(`https://blog.kata.academy/api/articles/${slug}`);
    dispatch({
      type: GetActionType.GET_SINGLEPAGE,
      payload: response.data.article,
    });
  };
};

export const registers = (data: RegisterRequestData) => {
  return async (dispatch: Dispatch<GetCombineType>) => {
    try {
      // const response = await axios.post('https://blog.kata.academy/api/users');
      const response = await axios({
        method: 'post',
        url: 'https://blog.kata.academy/api/users',
        data: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      localStorage.setItem('token', response.data.user.token);
      dispatch({
        type: GetActionType.REGISTRATION,
        payload: response.data,
        error: null,
        isLoged: true,
      });
    } catch (errors: any) {
      dispatch({
        type: GetActionType.REGISTRATION,
        payload: null,
        error: errors.response.data.errors,
        isLoged: false,
      });
    }
  };
};

export const login = (data: LoginRequestData) => {
  return async (dispatch: Dispatch<GetCombineType>) => {
    try {
      const response = await axios({
        method: 'post',
        url: 'https://blog.kata.academy/api/users/login',
        data: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      if (!localStorage.getItem('token')) localStorage.setItem('token', response.data.user.token);
      dispatch({
        type: GetActionType.LOGIN,
        payload: response.data,
        error: null,
        isLoged: true,
      });
    } catch (errors: any) {
      dispatch({
        type: GetActionType.LOGIN,
        payload: null,
        error: errors.response.data.errors,
        isLoged: false,
      });
    }
  };
};

export const logout = () => {
  return (dispatch: Dispatch<GetCombineType>) => {
    dispatch({
      type: GetActionType.LOGOUT,
      isLoged: false,
    });
    localStorage.removeItem('token');
  };
};

export const setLogin = () => {
  return async (dispatch: Dispatch<GetCombineType>) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const response = await axios({
      method: 'get',
      url: 'https://blog.kata.academy/api/user',
      headers: {
        Autorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    dispatch({
      type: GetActionType.SET_LOGIN,
      payload: response.data,
      isLoged: true,
    });
  };
};
