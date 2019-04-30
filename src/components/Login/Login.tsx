import * as React from 'react'
import { Form, Button, Row } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { IAbstractComponentProps, AbstractComponent } from 'src/components/Abstract/AbstractComponent'


interface IProps extends IAbstractComponentProps, FormComponentProps {
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

}

class LoginClass extends AbstractComponent<IProps, IState> {
    displayName = 'LoginClass'
    a: Array<number> = {} as any
    onLogin() {
        console.log('ss')
    }
    
    getRenderContent() {
        return <Row><Button type="primary" onClick={() => this.onLogin()}>登录组件</Button></Row>
    }
}

/**
 * 登录组件
 */
export const Login = Form.create()(LoginClass)