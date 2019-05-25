import * as React from 'react'
import { IAbstractComponentProps, AbstractComponent, IAbstractComponentState } from 'src/components/Abstract/AbstractComponent'
import { RouteComponentProps, withRouter } from 'react-router'
import { Icon, Menu, Avatar, Dropdown } from 'antd'
import { ClickParam } from 'antd/lib/menu'
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

interface IState extends IAbstractComponentState {}

export class UserDropdownClass extends AbstractComponent<IProps, IState> {

    displayName = 'UserDropdownClass'

    state: IState = {

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
            reduxStore && reduxStore.user ? (
                <Dropdown overlay={this.getUserDropdownMenu}>
                    <div className="global-layout-main-header-right">
                        <Avatar className="global-layout-main-header-right-avatar" shape="circle" size={24} src={reduxStore.user.icon}/>
                        <span>{reduxStore.user.fullName}</span>
                    </div>
                </Dropdown>
            ) : null
        )
    }

    shouldComponentUpdate(nextProps: IProps) {
        const { user: nextUser } = nextProps.reduxStore || { user: undefined }
        const { user } = this.props.reduxStore || { user: undefined }
        if (nextUser && user) {
            return nextUser.fullName !== user.fullName && nextUser.icon !== user.icon
        }
        return true
    }
}

/**
 * 后台头部用户Dropdown组件
 */
export const UserDropdown = withRouter(connect(authMapStateToProps)(UserDropdownClass))