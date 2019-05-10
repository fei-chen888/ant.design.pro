import { AsyncLogin } from 'src/dynamicLoad/Login/AsyncLogin'
import { IRouteItem, IExRouteItem } from 'src/models/Route'
import { AsyncAnalysis } from 'src/dynamicLoad/Admin/Dashboard/AsyncAnalysis'
import { AsyncAdmin } from 'src/dynamicLoad/Admin/AsyncAdmin'
import { AsyncWorkplace } from 'src/dynamicLoad/Admin/Dashboard/AsyncWorkplace'
import _ from 'lodash'

/**
 * 根据据路由path，查找指定path以及其children的集合并展平
 * @param path 
 * @param routes 
 */
export const findRouterByPath = (path: string): Array<IExRouteItem> => {
    let list: Array<IExRouteItem> = _.cloneDeep(RouterConfig)
    let index = 0
    while (index < list.length) {
        const { children = [] } = list[index]
        if (children.length) {
            children.forEach(item => {
                list.push(
                    {
                        root: list[index].root || list[index].path,
                        parent: list[index].path,
                        ...item
                    }
                )
            })
            delete list[index].children
        }
        index ++
    }
    return list.filter(item => item.root === path || item.parent === path || item.path === path)
}
/**
 * 路由配置，最多支持3级路由
 */
export const RouterConfig: Array<IRouteItem> = [
    {
        title: '登录',
        path: '/login',
        component: AsyncLogin,
        remark: '登录面页'
    },
    {
        title: '后台管理',
        path: '/admin',
        component: AsyncAdmin,
        needAuthorized: true,
        children: [
            {
                title: '数据面版',
                path: '/admin/dashboard',
                showMenu: true,
                menuIcon: 'calendar',
                children: [
                    {
                        title: '工作台',
                        path: '/admin/dashboard/workplace',
                        component: AsyncWorkplace,
                        showMenu: true,
                        remark: '工作台'
                    },
                    {
                        title: '数据分析',
                        path: '/admin/dashboard/analysis',
                        component: AsyncAnalysis,
                        showMenu: true,
                        remark: '数据分析'
                    }
                ],
                remark: '数据面版'
            }
        ],
        remark: '后台管理'
    }
]