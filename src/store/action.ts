import { ArticleList } from './type';

export interface ArticleState {
  articleList: ArticleList[];
  totalPages: number;
  loading: boolean;
  offset: number;
  errors: unknown;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  markdownPage: any;
}

// eslint-disable-next-line no-shadow
export enum GetActionType {
  SUCCESS_LOAD = 'SUCCESS_LOAD',
  ERROR_LOAD = 'ERROR_LOAD',
  PAGINATION = 'PAGINATION',
  GET_SINGLEPAGE = 'GET_SINGLEPAGE',
}

interface SUCCESS_LOAD {
  type: GetActionType.SUCCESS_LOAD;
  payload: ArticleList[];
  totalPages: number;
  loading: boolean;
  errors: boolean;
}

interface ERROR_LOAD {
  type: GetActionType.ERROR_LOAD;
  payload: unknown;
}

interface GET_SINGLEPAGE {
  type: GetActionType.GET_SINGLEPAGE;
  payload: ArticleList;
}

interface PAGINATION {
  type: GetActionType.PAGINATION;
  offset: number;
  payload: ArticleList[];
}

export type GetCombineType = SUCCESS_LOAD | ERROR_LOAD | GET_SINGLEPAGE | PAGINATION;
