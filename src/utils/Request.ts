import axios, { AxiosInstance } from 'axios'
import { BASEURL, REQUEST_STATUSCODE } from 'src/utils/Constants'
import { notice } from 'src/utils/Notification'
import { authService } from 'src/services/Auth'

const CancelToken = axios.CancelToken
const axiosInstance = axios.create(
    {
        baseURL: BASEURL
    }
)
let cancelMaps: Object = {}
/**
 *  请求过滤器
 */
axiosInstance.interceptors.request.use(
    requestConfig => {
        const auth = authService.getAuthFormStore()
        let componentUUID
        if (requestConfig.method === 'get' && requestConfig.params) {
            componentUUID = requestConfig.params.componentUUID
        } else if (requestConfig.method === 'post' && requestConfig.data) {
            componentUUID = requestConfig.data.componentUUID
        }
        if (componentUUID) {
            requestConfig.cancelToken = new CancelToken(reject => {
                cancelMaps[componentUUID] = reject
            })
        }
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
        let componentUUID
        if (responseData.config.method === 'get' && responseData.config.params) {
            componentUUID = responseData.config.params.componentUUID
        } else if (responseData.config.method === 'post' && responseData.config.data) {
            try {
                componentUUID = JSON.parse(responseData.config.data).componentUUID
            } catch (error) {
                //
            }
        }
        if (componentUUID) {
            delete cancelMaps[componentUUID]
        }
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
        console.log('error:', error)
        return Promise.resolve({
            status: 0,
            statusText: error.message,
            data: {
                responseContent: error.message,
                statusCode: '0',
                statusMessage: error.message
            }
        })
    }
)


interface IRequest extends AxiosInstance {
    cancel?: (key: string) => void
}

export const request: IRequest = axiosInstance

request.cancel = (key: string) => {
    if (cancelMaps[key]) {
        cancelMaps[key]('cancel')
        console.log('cancel:', key)
        delete cancelMaps[key]
    }
}