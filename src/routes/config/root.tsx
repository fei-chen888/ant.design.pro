import { IRouteItem } from 'src/models/route'
import { AsyncLogin } from 'src/dynamicLoad/Login'

export const rootRouter: Array<IRouteItem> = [
    {
        title: '登录',
        exact: true,
        path: '/login',
        to: '',
        component: AsyncLogin,
        remark: '登录面页'
    }
]