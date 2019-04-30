import { AsyncLogin } from 'src/dynamicLoad/Login/AsyncLogin'
import { IRouteItem } from 'src/models/Route'

export const RouterConfig: Array<IRouteItem> = [
    {
        title: '登录',
        exact: true,
        path: '/login',
        to: '',
        component: AsyncLogin,
        remark: '登录面页'
    }
]