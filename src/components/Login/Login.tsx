import styles from './Login.less'
import * as React from 'react'
import { Form, Button, Input, Icon, Row } from 'antd'
import { IAbstractComponentProps, AbstractComponent, IAbstractComponentState } from 'src/components/Abstract/AbstractComponent'
import { methodTryCatchDecorator } from 'src/decorator/MethodTryCatchDecorator'
import { FormComponentProps } from 'antd/lib/form'
import { authService } from 'src/services/Auth'
import { REQUEST_STATUSCODE } from 'src/utils/Constants'
import { setToken } from 'src/utils/CryptoLocalStorage'
import { IAuthLogin } from 'src/models/Auth'


interface IProps extends IAbstractComponentProps, FormComponentProps {
    /**
     * 登录成功事件
     */
    onLoginSuccess: (d: IAuthLogin) => void
}

interface IState extends IAbstractComponentState {}

/**
 * 登录组件表单字段
 */
export interface ILoginFormFileds {
    username: string
    password: string
}

class LoginClass extends AbstractComponent<IProps, IState> {

    displayName = 'LoginClass'

    state: IState = {}

    /**
     * 登录事件
     */
    @methodTryCatchDecorator()
    async onLogin() {
        const { form } = this.props
        form.validateFields( async (error, values: ILoginFormFileds) => {
            if (error) {
                return
            }
            this.showLoading()
            const res = await authService.login({
                username: values.username,
                password: values.password
            })
            if (res.data.statusCode === REQUEST_STATUSCODE.SUCCESS.code) {
                setToken(res.data.responseContent.token)
                authService.dispatchAuthToStore()
                this.props.onLoginSuccess(res.data.responseContent)
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
export default LoginClass