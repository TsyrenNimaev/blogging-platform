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
