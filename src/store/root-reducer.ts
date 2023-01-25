import { combineReducers } from 'redux';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

import articleReducer from './article-reducer';
import AutorizationReducer from './autorization-reducer';

export const rootReducer = combineReducers({ articleReducer, AutorizationReducer });
export type RootState = ReturnType<typeof rootReducer>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
