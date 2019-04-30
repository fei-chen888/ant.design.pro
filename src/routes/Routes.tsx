import * as React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { IRouteItem } from 'src/models/Route'
import E404 from 'src/pages/Errors/E404'
import { AbstractComponent, IAbstractComponentProps } from 'src/components/Abstract/AbstractComponent'
import { RouterConfig } from 'src/routes/Config/R\bouterConfig'

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
            <Switch>
                {this.routes.map(v => this.getRoute(v))}
                {!!redirect && <Redirect exact={true} from="/" to={redirect} />}
                {/* 404页 */}
                <Route component={E404} />
            </Switch>
        )
    }

    getRoute(item: IRouteItem) {
        return <Route key={item.path} exact={item.exact} path={item.path} component={item.component} />
    }
}
