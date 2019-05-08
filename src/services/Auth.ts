import { IAuthLogin } from 'src/models/Auth'
import { request } from 'src/utils/Request'
import { IResponseBase } from 'src/models/Base'

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
}