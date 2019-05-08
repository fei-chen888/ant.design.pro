import styles from './Login.less'
import * as React from 'react'
import { Form, Button, Input, Icon, Row, notification } from 'antd'
import { IAbstractComponentProps, AbstractComponent } from 'src/components/Abstract/AbstractComponent'
import { methodTryCatchDecorator } from 'src/decorator/MethodTryCatchDecorator'
import { withRouter, RouteComponentProps } from 'react-router'
import { FormComponentProps } from 'antd/lib/form'
import { authService } from 'src/services/Auth'
import { STATUSCODE } from 'src/utils/Constants'


interface IProps extends IAbstractComponentProps, FormComponentProps,  RouteComponentProps<any> {
    /**
     * 登录事件
     */
    onSubmit?: () => void
}

interface IState {

}

/**
 * 登录组件表单字段
 */
export interface ILoginFormFileds {
    username: string
    password: string
}

export class LoginClass extends AbstractComponent<IProps, IState> {
    displayName = 'LoginClass'

    @methodTryCatchDecorator()
    async onLogin() {
        const { history, form } = this.props
        form.validateFields( async (error, values: ILoginFormFileds) => {
            if (error) {
                return
            }
            this.showLoading()
            const res = await authService.login({
                username: values.username,
                password: values.password
            })
            if (res.data.statusCode === STATUSCODE.SUCCESS.code) {
                history.replace('/admin/dashboard/analysis')
            } else {
                notification.warn({
                    message: '登录提示',
                    description: res.data.statusMessage
                })
            }
            this.hidenLoading()
        })
    }
    
    getRenderContent() {
        const { getFieldDecorator } = this.props.form
        return (
        <Row className={styles.loginForm}>
            <div className={styles.loginFormTitle}>
                <img className={styles.loginFormLogo} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"/>
                Ant Design
            </div>
            <div className={styles.loginFormDesc}>Ant Design 是西湖区最具影响力的 Web 设计规范</div>
            <Form>
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请输入用户名!' }],
                    })(
                        <Input className="ant-input-lg" autoComplete="off" prefix={<Icon type="user"/>} placeholder="用户名" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码!' }],
                    })(
                        <Input className="ant-input-lg" autoComplete="off" prefix={<Icon type="lock"/>} type="password" placeholder="密码" />
                    )}
                </Form.Item>
                <Button onClick={() => this.onLogin()} type="primary" className={styles.loginFormButton}>登录</Button>
            </Form>
        </Row>
        )
    }
}

/**
 * 登录组件
 */
export const Login = Form.create()(withRouter(LoginClass))