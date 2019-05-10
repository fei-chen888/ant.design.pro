import { loadingActionType } from './ActionType'
import { IReducerAction } from 'src/models/Reducers'

export interface IReducerLoadingState {
  loading: boolean
  counts: number
}

const initState: IReducerLoadingState = {
  loading: false,
  counts: 0
}

export const loadingReducer = (state: IReducerLoadingState = initState, action: IReducerAction<IReducerLoadingState>) => {
  let {counts} = state
  switch (action.type) {
    case loadingActionType.SHOW:
      counts = counts + 1
      return {
        loading: true,
        counts
      }
    case loadingActionType.HIDEN:
      counts = Math.max(counts - 1, 0)
      return {
        loading: counts ? true : false,
        counts
      }
    default:
      return state
  }
}