import { authActionType } from './ActionType'
import { IReducerAction } from 'src/models/Reducers'
import { IAuthinfoUser } from 'src/models/Auth'

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
    case authActionType.SET:
      return {
        user: action.data ? action.data.user : undefined,
        tenantCode: action.data ? action.data.tenantCode : '',
        token: action.data ? action.data.token : '',
      }
    default:
      return state
  }
}