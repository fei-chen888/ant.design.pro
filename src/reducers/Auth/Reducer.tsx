import { authActionType } from './ActionType'
import { IReducerAction } from 'src/models/Reducers'
import { IAuthinfoUser } from 'src/models/Auth'
import { IReduxState } from 'src/reducers/Store'
import _ from 'lodash'

export interface IReducerAuthState {
  user: IAuthinfoUser | undefined
  tenantCode: string
  token: string
}

const initState: IReducerAuthState = {
  user: undefined,
  tenantCode: '',
  token: ''
}

export const authinfoReducer = (state: IReducerAuthState = initState, action: IReducerAction<IReducerAuthState>) => {
  switch (action.type) {
    case authActionType.LOGIN:
      return {
        user: action.data ? _.cloneDeep(action.data.user) : undefined,
        tenantCode: action.data ? action.data.tenantCode : '',
        token: action.data ? action.data.token : '',
      }
    case authActionType.LOGOUT:
      return {
        user: undefined,
        tenantCode: '',
        token: ''
      }
    default:
      return state
  }
}

export const authMapStateToProps = (state: IReduxState) => {
  return {
    reduxStore: _.cloneDeep(state.auth)
  }
}