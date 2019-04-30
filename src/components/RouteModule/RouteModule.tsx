import * as React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { IAbstractComponentProps, AbstractComponent } from 'src/components/Abstract/AbstractComponent'
import { IRouteItem } from 'src/models/Route'

interface IProps extends IAbstractComponentProps {
    routes: Array<IRouteItem>
}

interface IState {}

/**
 * 路由组件
 */
export class RouteModule extends AbstractComponent<IProps, IState> {

    displayName = 'RouteModule'
    
    getRoute(item: IRouteItem) {
        switch (true) {
            case item.to && !item.component:
                return <Redirect exact={item.exact} key={item.path} from={item.path} to={item.to || '/'} />
            default:
                return (
                    <Route
                        key={item.path}
                        exact={item.exact}
                        path={item.path}
                        component={item.component}
                    />
                )
        }
    }

    getRenderContent() {
        const { routes = [] } = this.props
        return <Switch>{routes.map(v => this.getRoute(v))}</Switch>
    }
}
