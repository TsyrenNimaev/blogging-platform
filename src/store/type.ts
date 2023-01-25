import { ArticleState } from './action';

export type State = {
  article: ArticleState[],
};

export type ArticleList = {
  slug: string,
  title: string,
  description: string,
  body: string,
  tagList: [string],
  articlesCount: number,
  updatedAt: string,
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
