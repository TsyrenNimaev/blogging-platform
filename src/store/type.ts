import { ArticleState } from './action';

export type State = {
  article: ArticleState[],
};

export type ArticleList = {
  slug?: string,
  title: string,
  description: string,
  body?: string,
  tagList: [string],
  articlesCount?: number,
  updatedAt: string,
  favorited?: boolean,
  favoritesCount: number,
  createdAt?: string,
  author: {
    username: string,
    bio: string,
    image: string,
    following: boolean,
  },
};

export type LoginRequestData = {
  email: string,
  password: string,
};

export type RegisterRequestData = {
  username: string,
  email: string,
  password: string,
};

export type getResponseLogin = {
  user: {
    username: string,
    email: string,
    token: string,
    image?: string,
  },
};

export type ArticleRequestType = {
  article: {
    title: string,
    description: string,
    body: string,
    tagList: [string],
  },
};

export type updateInfo = {
  user: {
    username: string,
    email: string,
    password?: string,
    image?: string,
  },
};

export type IFormLogUp = {
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
  checkbox: boolean,
};

export type IFormSingIn = {
  email: string,
  password: string,
};

export type IFormCreate = {
  title: string,
  description: string,
  body: string,
  tagList: string,
};

export type IFormProfile = {
  username: string,
  email: string,
  password: string,
  image: string,
};
