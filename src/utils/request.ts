import axios from 'axios'
import { BASEURL, REQUEST_STATUSCODE } from 'src/utils/Constants'
import { notice } from 'src/utils/Notification'
import { authService } from 'src/services/Auth'

const axiosInstance = axios.create(
    {
        baseURL: BASEURL
    }
)

/**
 *  请求过滤器
 */
axiosInstance.interceptors.request.use(
    requestConfig => {
        const auth = authService.getAuthFormStore()
        if (auth.token) {
            requestConfig.headers.token = auth.token
        }
        requestConfig.url = requestConfig.url ? requestConfig.url.replace(/\{\}/g, auth.tenantCode) : undefined
        return requestConfig
    }
)

/**
 *  响应过滤器
 */
axiosInstance.interceptors.response.use(
    responseData => {
        if (responseData.data.statusCode === REQUEST_STATUSCODE.UNAUTHORIZED.code) {
            notice({
                type: 'warning',
                message: '信息提示',
                description: responseData.data.statusMessage,
                onClose: () => {
                    location.replace('/login')
                }
            })
            authService.removeAuthFormStore()
        }
        return responseData
    }, 
    error => {
        return Promise.resolve({
            status: 0,
            statusText: error.toString(),
            data: {
                responseContent: error.toString(),
                statusCode: '0',
                statusMessage: error.toString()
            }
        })
    }
)

export const request = axiosInstance