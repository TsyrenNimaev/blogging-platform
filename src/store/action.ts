/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArticleList, ArticleRequestType, getResponseLogin } from './type';

export interface ArticleState {
  articleList: ArticleList[];
  totalPages: number;
  loading: boolean;
  offset: number;
  errors: unknown;
  markdownPage: any;
  createPage: any;
  like: any;
}

export interface AutorizationState {
  user: getResponseLogin | null | undefined;
  error: boolean;
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
  EDIT_PROFILE = 'EDIT_PROFILE',
  ERROR = 'ERROR',
  CREATE_ARTICLE = 'CREATE_ARTICLE',
  EDIT_ARTICLE = 'EDIT_ARTICLE',
  DELETE_ARTICLE = 'DELETE_ARTICLE',
  LIKE_POST = 'LIKE_POST',
  UNLIKE_POST = 'UNLIKE_POST',
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
  payload: getResponseLogin | null;
  isLoged: boolean;
}

interface EDIT_PROFILE {
  type: GetActionType.EDIT_PROFILE;
  payload: getResponseLogin | null;
  error: boolean;
  isLoget: boolean;
}

interface ERROR {
  type: GetActionType.ERROR;
  error: boolean;
}

interface CREATE_ARTICLE {
  type: GetActionType.CREATE_ARTICLE;
  payload: ArticleRequestType | null;
  loading: boolean;
  error: any;
}

interface EDIT_ARTICLE {
  type: GetActionType.EDIT_ARTICLE;
  payload: ArticleList | null;
}

interface DELETE_ARTICLE {
  type: GetActionType.DELETE_ARTICLE;
}

interface LIKE_POST {
  type: GetActionType.LIKE_POST;
  payload: [];
}

interface UNLIKE_POST {
  type: GetActionType.UNLIKE_POST;
  payload: [];
}

export type GetCombineType =
  | SUCCESS_LOAD
  | ERROR_LOAD
  | GET_SINGLEPAGE
  | PAGINATION
  | REGISTRATION
  | LOGIN
  | LOGOUT
  | SET_LOGIN
  | EDIT_PROFILE
  | ERROR
  | CREATE_ARTICLE
  | EDIT_ARTICLE
  | DELETE_ARTICLE
  | LIKE_POST
  | UNLIKE_POST;
