import { combineReducers } from 'redux';

import articleReducer from './article-reducer';

export const rootReducer = combineReducers({ articleReducer });
export type RootState = ReturnType<typeof rootReducer>;
