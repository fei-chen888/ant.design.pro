import { createStore, combineReducers } from 'redux'
import { loadingReducer, IReducerLoadingState } from 'src/reducers/Loading/Reducer'
import { authinfoReducer, IReducerAuthState } from 'src/reducers/Auth/Reducer'
import { offlineStoreSelectReducer, IReducerOfflineStoreSelectState } from 'src/reducers/OfflineStoreSelect/Reducer'
import { composeWithDevTools } from 'redux-devtools-extension'

export interface IReduxState {
	spin: IReducerLoadingState
	auth: IReducerAuthState
	offlineStoreSelect: IReducerOfflineStoreSelectState
}

export const store = createStore(combineReducers<IReduxState>({spin: loadingReducer, auth: authinfoReducer, offlineStoreSelect: offlineStoreSelectReducer}), composeWithDevTools())
