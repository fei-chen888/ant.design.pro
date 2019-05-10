import * as React from 'react'
import { IAbstractComponentProps, AbstractComponent } from 'src/components/Abstract/AbstractComponent'
import { Breadcrumb } from 'antd'
import { IRouteItem } from 'src/models/Route'
import { RouteComponentProps } from 'react-router'

interface IProps extends IAbstractComponentProps, RouteComponentProps<any> {
    routers: Array<IRouteItem>
}

interface IState { }

class RouteBreadcrumbClass extends AbstractComponent<IProps, IState> {

    displayName = 'RouteBreadcrumbClass'

    state: IState = {}

    /**
     * 从路由中匹配面包屑
     */
    getBreadcrumb(): Array<IRouteItem> {
        const { history, routers } = this.props
        const breadcrumb: Array<IRouteItem> = []
        routers.forEach(item => {
            let reg = new RegExp(item.path)
            if (reg.test(history.location.pathname)) {
                breadcrumb.push(item) 
            }
        })
        return breadcrumb
    }

    getRenderContent() {
        return (
            <Breadcrumb>
                {this.getBreadcrumb().map(item => <Breadcrumb.Item key={item.path}>{item.title}</Breadcrumb.Item>)}
            </Breadcrumb>
        )
    }
}

/**
 * 路由面包屑组件
 */
export const RouteBreadcrumb = RouteBreadcrumbClass