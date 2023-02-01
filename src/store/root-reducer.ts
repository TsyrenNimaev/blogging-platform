/* eslint-disable @typescript-eslint/no-explicit-any */
import { combineReducers, AnyAction } from 'redux';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import articleReducer from './article-reducer';
import AutorizationReducer from './autorization-reducer';

export const rootReducer = combineReducers({ articleReducer, AutorizationReducer });

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
