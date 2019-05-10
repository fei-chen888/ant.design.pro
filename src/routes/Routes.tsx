import * as React from 'react'
import { Redirect, Route, Switch, BrowserRouter } from 'react-router-dom'
import { IRouteItem } from 'src/models/Route'
import E404 from 'src/pages/Errors/E404'
import { AbstractComponent, IAbstractComponentProps, IAbstractComponentState } from 'src/components/Abstract/AbstractComponent'
import { RouterConfig } from 'src/routes/Config/RouterConfig'
import { PrivateRoute } from 'src/components/PrivateRoute/PrivateRoute'

interface IProps extends IAbstractComponentProps {
    redirect?: string
}
interface IState extends IAbstractComponentState {}
export class Routes extends AbstractComponent<IProps, IState> {

    displayName = 'Routes'

    state: IState = {}

    routes: Array<IRouteItem>  = RouterConfig

    /**
     * 获取路由组件
     */
    getRoute(item: IRouteItem) {
        return (
            <PrivateRoute 
                needAuthorized={item.needAuthorized}
                key={item.path} 
                exact={item.children && item.children.length ? false : true} 
                path={item.path}
                component={item.component}
            />
        )
    }

    getRenderContent() {
        const { redirect } = this.props
        return (
            <BrowserRouter>
                <Switch>
                    {this.routes.map(v => this.getRoute(v))}
                    {redirect ? <Redirect from="/" to={redirect} /> : null}
                    <Route component={E404} />
                </Switch>
            </BrowserRouter>
        )
    }
}
