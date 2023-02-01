/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from 'redux';
import axios from 'axios';

import { GetActionType, GetCombineType } from '../store/action';
import { ArticleRequestType, LoginRequestData, RegisterRequestData, updateInfo } from '../store/type';

export const getContent = (num = 1) => {
  return async (dispatch: Dispatch<GetCombineType>) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios({
        method: 'get',
        url: `https://blog.kata.academy/api/articles?limit=5&offset=${num}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
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
    const token = localStorage.getItem('token');
    const response = await axios({
      method: 'get',
      url: `https://blog.kata.academy/api/articles/${slug}`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    dispatch({
      type: GetActionType.GET_SINGLEPAGE,
      payload: response.data.article,
    });
  };
};

// регистрация, логин
export const registers = (data: RegisterRequestData) => {
  return async (dispatch: Dispatch<GetCombineType>) => {
    try {
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
        error: response.data.errors,
        isLoged: true,
      });
    } catch (errors: any) {
      dispatch({
        type: GetActionType.ERROR,
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
        type: GetActionType.ERROR,
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

// редактирование профиля
export const editProfile = (data: updateInfo) => {
  return async (dispatch: Dispatch<GetCombineType>) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios({
        method: 'put',
        url: 'https://blog.kata.academy/api/user',
        data: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      dispatch({
        type: GetActionType.EDIT_PROFILE,
        payload: response.data,
        error: false,
        isLoget: true,
      });
    } catch (error: any) {
      dispatch({
        type: GetActionType.ERROR,
        error: true,
      });
    }
  };
};

// создание новой статьи
export const createArticle = (data: ArticleRequestType) => {
  return async (dispatch: Dispatch<GetCombineType>) => {
    const token = localStorage.getItem('token');
    const response = await axios({
      method: 'post',
      url: 'https://blog.kata.academy/api/articles',
      data: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    dispatch({
      type: GetActionType.CREATE_ARTICLE,
      payload: response.data,
      error: null,
      loading: true,
    });
  };
};

export const editArticle = (slug: string, postData: ArticleRequestType) => {
  return async (dispatch: Dispatch<GetCombineType>) => {
    const token = localStorage.getItem('token');
    const response = await axios({
      method: 'put',
      url: `https://blog.kata.academy/api/articles/${slug}`,
      data: JSON.stringify(postData),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    dispatch({
      type: GetActionType.EDIT_ARTICLE,
      payload: response.data.article,
    });
  };
};

export const deleteArticle = (slug: string) => {
  return async (dispatch: Dispatch<GetCombineType>) => {
    const token = localStorage.getItem('token');
    await axios({
      method: 'delete',
      url: `https://blog.kata.academy/api/articles/${slug}`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    dispatch({
      type: GetActionType.DELETE_ARTICLE,
    });
  };
};

export const likePost = (slug: string) => {
  return async (dispatch: Dispatch<GetCombineType>) => {
    const token = localStorage.getItem('token');
    const response = await axios({
      method: 'post',
      url: `https://blog.kata.academy/api/articles/${slug}/favorite`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    dispatch({
      type: GetActionType.LIKE_POST,
      payload: response.data.article,
    });
  };
};

export const unlikePost = (slug: string) => {
  return async (dispatch: Dispatch<GetCombineType>) => {
    const token = localStorage.getItem('token');
    const response = await axios({
      method: 'delete',
      url: `https://blog.kata.academy/api/articles/${slug}/favorite`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    dispatch({
      type: GetActionType.UNLIKE_POST,
      payload: response.data.article,
    });
  };
};
