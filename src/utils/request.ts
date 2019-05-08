import axios from 'axios'
import { BASEURL } from 'src/utils/Constants'

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
        requestConfig.headers.token = 'WTBIMntmOc302ea01dff6a9f74491740a525f971bf5dedca0ecbb4610a14768b0bdc1142a00d8819baab04b67535dfdc37b461f14c25464d767d2a943955a6be1bd7b6f67f604'
        return requestConfig
    }
)

/**
 *  响应过滤器
 */
axiosInstance.interceptors.response.use(
    responseData => {
        return responseData
    }, 
    error => {
        return Promise.resolve({
            responseContent: error.toString(),
            statusCode: '0',
            statusMessage: error.toString()
        })
    }
)

export const request = axiosInstance