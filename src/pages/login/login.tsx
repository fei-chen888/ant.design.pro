import styles from './Login.less'
import * as React from 'react'
import { FormComponentProps } from 'antd/lib/form'
import { IAbstractPageProps, AbstractPage, IAbstractPageState } from 'src/components/Abstract/AbstractPage'
import Login from 'src/components/Login/Login'
import { Layout, Form } from 'antd'
import { RouteComponentProps } from 'react-router'
import { IAuthLogin, IStaffTenant, IAuthinfo } from 'src/models/Auth'
import { methodTryCatchDecorator } from 'src/decorator/MethodTryCatchDecorator'
import { SelectTenantModal } from 'src/components/Login/SelectTenantModal'
import { ADMIN_HOME } from 'src/utils/Constants'
import { authService } from 'src/services/Auth'

interface IProps extends IAbstractPageProps, FormComponentProps, RouteComponentProps<any> {}

interface IState extends IAbstractPageState {
    staffTenants: Array<IStaffTenant>
    selectTenantModalVisble: boolean
}

/**
 * 登录页面
 */
class LoginPageClass extends AbstractPage<IProps, IState> {

    displayName = 'LoginPageClass'

    state: IState = {
        staffTenants: [],
        selectTenantModalVisble: false
    }

    componentDidMount() {
        if (authService.getAuthFormStore().token) {
            this.gotoAdminHome()
        }
    }

    /**
     * 登录组件，登录成功事件
     */
    @methodTryCatchDecorator()
    onLoginSuccess(d: IAuthLogin) {
        const staffTenants: Array<IStaffTenant> = JSON.parse(d.staffTenants || '[]')
        this.setState({
            staffTenants,
            selectTenantModalVisble: true
        })
    }

    /**
     * 选择租户，登录功能事件
     */
    @methodTryCatchDecorator()
    onSelectTenantSuccess(d: IStaffTenant, u: IAuthinfo) {
        this.gotoAdminHome()
    }

    /**
     * 跳转到管理后台页面
     */
    gotoAdminHome() {
        this.props.history.replace(ADMIN_HOME)
    }

    getRenderContent() {
        const { staffTenants = [], selectTenantModalVisble } = this.state
        return (
            <Layout className={`${styles.loginPage} global-layout`}>
                <Layout.Content className="global-layout-content">
                    <Login {...this.props} onLoginSuccess={(d) => this.onLoginSuccess(d)}/>
                    <SelectTenantModal onLoginSuccess={(d, u) => this.onSelectTenantSuccess(d, u)} onCancel={() => this.setState({selectTenantModalVisble: false})} visible={selectTenantModalVisble} value={staffTenants}/>
                </Layout.Content>
                <Layout.Footer>
                    <div className="global-layout-footer-copyright">
                        Copyright 2019 蚂蚁金服体验技术部出品
                    </div>
                </Layout.Footer>
            </Layout>
        )
    }
}

export default Form.create()(LoginPageClass)