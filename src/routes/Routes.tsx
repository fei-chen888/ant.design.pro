import * as React from 'react'
import { Redirect, Route, Switch, BrowserRouter } from 'react-router-dom'
import { IRouteItem } from 'src/models/Route'
import E404 from 'src/pages/Errors/E404'
import { AbstractComponent, IAbstractComponentProps } from 'src/components/Abstract/AbstractComponent'
import { RouterConfig } from 'src/routes/Config/RouterConfig'

interface IProps extends IAbstractComponentProps {
    redirect?: string
}
interface IState {}
export class Routes extends AbstractComponent<IProps, IState> {

    displayName = 'Routes'

    routes: Array<IRouteItem>  = RouterConfig

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

    getRoute(item: IRouteItem) {
        return <Route key={item.path} exact={item.children && item.children.length ? false : true} path={item.path} component={item.component} />
    }
}
