import { offlineStoreSelectActionType } from './ActionType'
import { IReducerAction } from 'src/models/Reducers'
import { IListOfflineStore } from 'src/models/Store'
import { DEFAULT_PAGESIZE_SMALL } from 'src/utils/Constants'
import { IReduxState } from 'src/reducers/Store'
import _ from 'lodash'

export interface IReducerOfflineStoreSelectState {
  total: number
  pageNum: number
  pageSize: number
  list: Array<IListOfflineStore>
}

const initState: IReducerOfflineStoreSelectState = {
  total: 0,
  pageNum: 1,
  pageSize: DEFAULT_PAGESIZE_SMALL,
  list: []
}

export const offlineStoreSelectReducer = (state: IReducerOfflineStoreSelectState = initState, action: IReducerAction<IReducerOfflineStoreSelectState>) => {
  switch (action.type) {
    case offlineStoreSelectActionType.UPDATE:
      return action.data ? _.cloneDeep(action.data) : {
        total: 0,
        pageNum: 1,
        pageSize: DEFAULT_PAGESIZE_SMALL,
        list: []
      }
    case offlineStoreSelectActionType.CLEAR:
      return {
        total: 0,
        pageNum: 1,
        pageSize: DEFAULT_PAGESIZE_SMALL,
        list: []
      }
    default:
      return state
  }
}

export const offlineStoreSelectMapStateToProps = (state: IReduxState) => {
  return { 
    reduxStore: _.cloneDeep(state.offlineStoreSelect)
  }
}