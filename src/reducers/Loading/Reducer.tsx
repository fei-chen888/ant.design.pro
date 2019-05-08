import { loadingActionType } from './ActionType'
import { IReducerAction } from 'src/models/Reducers'

interface ILoading {
  loading: boolean
}

const initState: ILoading = {
  loading: false
}

export const loadingReducer = (state: ILoading = initState, action: IReducerAction<ILoading>) => {
  switch (action.type) {
    case loadingActionType.SHOW:
      return {loading: true}
    case loadingActionType.HIDEN:
      return {loading: false}
    default:
      return state
  }
}