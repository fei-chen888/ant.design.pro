import { IAuthLogin, IAuthinfo } from 'src/models/Auth'
import { request } from 'src/utils/Request'
import { IResponseBase } from 'src/models/Base'
import { store } from 'src/reducers/Store'
import { authActionType } from 'src/reducers/Auth/ActionType'
import { getToken, getTenantCode, getUserinfo, removeToken } from 'src/utils/CryptoLocalStorage'
import { IReducerAuthState } from 'src/reducers/Auth/Reducer'

/**
 * 登录接口参数
 */
export interface IAuthServiceLogin {
    username: string   
    password: string
}

/**
 * 用户相关服务接口
 */
export namespace authService {
    /**
     * 登录
     */
    export function login(params: IAuthServiceLogin) {
        return request.post<IResponseBase<IAuthLogin>>('/auth/open/system/auth/login', params)
    }

    /**
     * 退出登录
     */
    export function logout() {
        return request.post<IResponseBase<IAuthLogin>>('/auth/open/system/auth/logout')
    }

    /**
     * 获取用户信息
     */
    export function authinfos(tenantCode: string) {
        return request.get<IResponseBase<IAuthinfo>>(`/auth/noauth/${tenantCode}/users/authinfos`)
    }

    /**
     * 将local storage中的用户信息、租户code，存至store
     */
    export function dispatchAuthToStore() {
        const token = getToken()
        const tenantCode = getTenantCode()
        const userinfo = getUserinfo()
        const data: IReducerAuthState = {
            user: userinfo ? JSON.parse(userinfo) : undefined,
            tenantCode,
            token
        }
        store.dispatch({
            type: authActionType.LOGIN,
            data
        })
    }

    /**
     * 从store中读取用户信息、租户code、token
     */
    export function getAuthFormStore() {
        const { auth } = store.getState()
        return auth
    }

    /**
     * 删除store中的用户信息、租户code、token
     */
    export function removeAuthFormStore() {
        removeToken()
        store.dispatch({
            type: authActionType.LOGOUT
        })
    }
}