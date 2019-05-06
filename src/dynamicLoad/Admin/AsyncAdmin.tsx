import * as React from 'react'
import { IAbstractComponentProps, AbstractComponent } from 'src/components/Abstract/AbstractComponent'
import { RouteComponentProps, Switch, Route } from 'react-router'
import { IExRouteItem } from 'src/models/Route'
import { findRouterByPath } from 'src/routes/Config/RouterConfig'
import { Layout, Icon, Menu } from 'antd'
import { RouteBreadcrumb } from 'src/components/RouteBreadcrumb/RouteBreadcrumb'
import { Link } from 'react-router-dom'
import { MenuProps } from 'antd/lib/menu'

interface IProps extends IAbstractComponentProps, RouteComponentProps<any> {
}

interface IState {
    collapsed: boolean
}

export class AsyncAdmin extends AbstractComponent<IProps, IState> {

    state: IState = {
        collapsed: false
    }

    displayName = 'AsyncSubModuleRouter'

    routes: Array<IExRouteItem> = []

    get menuOpt(): MenuProps {
        const { pathname } = this.props.location
        let defaultSelectedKeys: Array<string> = []
        let defaultOpenKeys: Array<string> = []
        this.getAdminRoutes().forEach(item => {
            if (item.path === pathname) {
                defaultSelectedKeys.push(item.path || '')
                defaultOpenKeys.push(item.parent || '')
            }
        })
        return {
            theme: 'dark',
            mode: 'inline',
            defaultSelectedKeys,
            defaultOpenKeys
        }
    }

    getAdminRoutes(): Array<IExRouteItem> {
        if (this.routes.length === 0) {
            this.routes = findRouterByPath(this.props.match.path)
        }
        return this.routes
    }

    getAdminMenusContent() {
        const { path } = this.props.match
        return this.getAdminRoutes().map(item => {
            if (item.showMenu && item.parent === path) {
                const subMenus = this.getAdminRoutes().filter(subMenu => subMenu.parent === item.path && item.showMenu)
                if (subMenus.length) {
                    return (
                        <Menu.SubMenu key={item.path} title={<div><Icon type={item.menuIcon} /><span>{item.title}</span></div>}>
                            {subMenus.map(subMenu => {
                                return (
                                    <Menu.Item key={subMenu.path}>
                                        <Link to={subMenu.path}>{subMenu.title}</Link>
                                    </Menu.Item>
                                )
                            })}
                        </Menu.SubMenu>
                    )
                } else {
                    return <Menu.Item key={item.path}>{item.title}</Menu.Item>
                }
                
            } else {
                return null
            }
        })
    }

    getRenderContent() {
        return (
            <Layout>
                <Layout.Sider className="global-layout-sider" trigger={null} collapsible={true} collapsed={this.state.collapsed}>
                    <div className="global-layout-sider-logo">
                        <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"/>
                        <h1>Ant Design</h1>
                    </div>
                    <div className="global-layout-sider-menu">
                        <Menu {...this.menuOpt}>
                            {this.getAdminMenusContent()}
                        </Menu>
                    </div>
                </Layout.Sider>
                <Layout className="global-layout-main">
                    <Layout.Header className="global-layout-main-header">
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.onToggle}
                        />
                        <RouteBreadcrumb {...this.props} routers={this.getAdminRoutes()}/>
                    </Layout.Header>
                    <Layout.Content className="global-layout-main-content">
                        <Switch>
                            {this.getAdminRoutes().map(item => {
                                return item.component ? <Route key={item.path} exact={item.children && item.children.length ? false : true} path={item.path} component={item.component} /> : null
                            })}
                        </Switch>
                    </Layout.Content>
                </Layout>
            </Layout>
        )
    }

    onToggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        })
    }
  }