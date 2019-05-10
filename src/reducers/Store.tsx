import { createStore, combineReducers } from 'redux'
import { loadingReducer, IReducerLoadingState } from 'src/reducers/Loading/Reducer'
import { authinfoReducer, IReducerAuthState } from 'src/reducers/Auth/Reducer'

export interface IReduxState {
  loadingStore: IReducerLoadingState
  authStore: IReducerAuthState
}

export const store = createStore(combineReducers<IReduxState>({
  loadingStore: loadingReducer,
  authStore: authinfoReducer
}))