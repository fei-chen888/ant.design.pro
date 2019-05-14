import * as React from 'react'
import { IAbstractComponentProps, AbstractComponent, IAbstractComponentState } from 'src/components/Abstract/AbstractComponent'
import { RouteComponentProps, Switch, Route, withRouter } from 'react-router'
import { IExRouteItem } from 'src/models/Route'
import { findRouterByPath } from 'src/routes/Config/RouterConfig'
import { Layout, Icon, Menu, Avatar, Dropdown } from 'antd'
import { RouteBreadcrumb } from 'src/components/RouteBreadcrumb/RouteBreadcrumb'
import { Link } from 'react-router-dom'
import { MenuProps, ClickParam } from 'antd/lib/menu'
import { connect } from 'react-redux'
import { methodTry } from 'src/decorator/Try'
import { authService } from 'src/services/Auth'
import { REQUEST_STATUSCODE, ADMIN_LOGIN } from 'src/utils/Constants'
import { authMapStateToProps, IReducerAuthState } from 'src/reducers/Auth/Reducer'

/**
 * reduxStore redux中的数据
 */
interface IProps extends IAbstractComponentProps, RouteComponentProps<any> {
    reduxStore?: IReducerAuthState
}

interface IState extends IAbstractComponentState {
    collapsed: boolean
}

export class AsyncSubModuleRouterClass extends AbstractComponent<IProps, IState> {

    displayName = 'AsyncSubModuleRouter'

    state: IState = {
        collapsed: false
    }

    routes: Array<IExRouteItem> = []

    /**
     * 获限sider menu属性
     */
    get getMenuOpt(): MenuProps {
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

    /**
     * 头部用户头像DropdownMenu
     */
    get getUserDropdownMenu() {
        return (
            <Menu onClick={e => this.onUserDropdownMenuClick(e)}>
                <Menu.Item key="logout"><Icon type="logout" />退出账号</Menu.Item>
            </Menu>
        )
    }

    /**
     * 获取admin路由下子菜单
     */
    getAdminRoutes(): Array<IExRouteItem> {
        if (this.routes.length === 0) {
            this.routes = findRouterByPath(this.props.match.path)
        }
        return this.routes
    }

    /**
     * 菜单内容
     */
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

    /**
     * Sider收缩/展开
     */
    onToggle() {
        this.setState({
            collapsed: !this.state.collapsed,
        })
    }

    /**
     * 用户DropdownMenu事件
     */
    @methodTry()
    async onUserDropdownMenuClick(e: ClickParam) {
        if (e.key === 'logout') {
            const res = await authService.logout()
            if (res.data.statusCode === REQUEST_STATUSCODE.SUCCESS.code) {
                authService.removeAuthFormStore()
                this.gotoLogin()
            }
        }
    }
    
    /**
     * 跳转到登录页面
     */
    gotoLogin() {
        this.props.history.replace(ADMIN_LOGIN)
    }

    getRenderContent() {
        const { reduxStore } = this.props
        return (
            <Layout>
                <Layout.Sider className="global-layout-sider" trigger={null} collapsible={true} collapsed={this.state.collapsed}>
                    <div className="global-layout-sider-logo">
                        <Avatar size={32} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"/>
                        <h1>Ant Design</h1>
                    </div>
                    <div className="global-layout-sider-menu">
                        <Menu {...this.getMenuOpt}>
                            {this.getAdminMenusContent()}
                        </Menu>
                    </div>
                </Layout.Sider>
                <Layout className="global-layout-main">
                    <Layout.Header className="global-layout-main-header">
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={() => this.onToggle()}
                        />
                        <RouteBreadcrumb {...this.props} routers={this.getAdminRoutes()}/>
                        {reduxStore && reduxStore.user ? (
                            <Dropdown overlay={this.getUserDropdownMenu}>
                                <div className="global-layout-main-header-right">
                                    <Avatar className="global-layout-main-header-right-avatar" shape="circle" size={24} src={reduxStore.user.icon}/>
                                    <span>{reduxStore.user.fullName}</span>
                                </div>
                            </Dropdown>
                        ) : null}
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
}

/**
 * admin路由页面
 * @param state 
 */
export const AsyncAdmin = withRouter(connect(authMapStateToProps)(AsyncSubModuleRouterClass))