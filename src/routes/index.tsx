import * as React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { IRouteItem } from 'src/models/route'
import { rootRouter } from 'src/routes/config/root'
import { E404Page } from 'src/pages/errors/404'

interface IProps {
    redirect?: string
}
interface IState {}
export class Routes extends React.Component<IProps, IState> {
    routes: Array<IRouteItem>  = rootRouter

    render() {
        const { redirect } = this.props
        return (
            <Switch>
                {this.routes.map(v => this.getRoute(v))}
                {!!redirect && <Redirect exact={true} from="/" to={redirect} />}
                {/* 404页 */}
                <Route component={E404Page} />
            </Switch>
        )
    }

    getRoute(item: IRouteItem) {
        return <Route key={item.path} exact={item.exact} path={item.path} component={item.component} />
    }
}
