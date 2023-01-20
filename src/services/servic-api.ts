import { Dispatch } from 'redux';
import axios from 'axios';

import { GetActionType, GetCombineType } from '../store/action';

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
