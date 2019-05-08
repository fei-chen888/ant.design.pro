import { createStore, combineReducers } from 'redux'
import { loadingReducer } from './Loading/Reducer'

export interface IReduxState {
  loadingStore: {
    loading: boolean
  }
}

export const store = createStore(combineReducers<IReduxState>({
  loadingStore: loadingReducer
}))