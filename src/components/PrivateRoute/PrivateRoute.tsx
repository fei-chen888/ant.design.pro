import * as React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { AbstractComponent, IAbstractComponentProps, IAbstractComponentState } from 'src/components/Abstract/AbstractComponent'
import { getToken } from 'src/utils/CryptoLocalStorage'

interface IProps extends IAbstractComponentProps, RouteProps {
    needAuthorized?: boolean
}
interface IState extends IAbstractComponentState {}

class PrivateRouteClass extends AbstractComponent<IProps, IState> {
    
    displayName = 'PrivateRouteClass'

    state: IState = {}

    /**
     * 判断是否需要登录
     */
    getRenderContent() {
        const { needAuthorized, path } = this.props
        const token = getToken()
        let authorized = true
        if (needAuthorized && token === null) {
            authorized = false
        }
        return authorized ? <Route {...this.props}/> : <Redirect from={`${path}`} to="/login" />
    }
}

/**
 * 路由组件，增加登录权限判断
 */
export const PrivateRoute = PrivateRouteClass