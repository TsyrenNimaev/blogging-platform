/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArticleList, ArticleRequestType, getResponseLogin } from './type';

export interface ArticleState {
  articleList: ArticleList[];
  totalPages: number;
  loading: boolean;
  offset: number;
  errors: unknown;
  markdownPage: any;
}

export interface AutorizationState {
  user: getResponseLogin | null;
  error: Error | null;
  article: ArticleRequestType | null;
  isLoged: boolean;
}

// eslint-disable-next-line no-shadow
export enum GetActionType {
  SUCCESS_LOAD = 'SUCCESS_LOAD',
  ERROR_LOAD = 'ERROR_LOAD',
  PAGINATION = 'PAGINATION',
  GET_SINGLEPAGE = 'GET_SINGLEPAGE',
  REGISTRATION = 'REGISTRATION',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  SET_LOGIN = 'SET_LOGIN',
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

interface REGISTRATION {
  type: GetActionType.REGISTRATION;
  payload: getResponseLogin | null;
  error: any;
  isLoged: boolean;
}

interface LOGIN {
  type: GetActionType.LOGIN;
  payload: getResponseLogin | null;
  error: any;
  isLoged: boolean;
}

interface LOGOUT {
  type: GetActionType.LOGOUT;
  isLoged: boolean;
}

interface SET_LOGIN {
  type: GetActionType.SET_LOGIN;
  payload: null | getResponseLogin;
  isLoged: boolean;
}

export type GetCombineType =
  | SUCCESS_LOAD
  | ERROR_LOAD
  | GET_SINGLEPAGE
  | PAGINATION
  | REGISTRATION
  | LOGIN
  | LOGOUT
  | SET_LOGIN;
