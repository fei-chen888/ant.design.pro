import * as React from 'react'
import { Form } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { IAbstractComponentProps, AbstractComponent } from 'src/components/Abstract/component'


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
    
    render() {
        return <div onClick={() => this.onLogin()}>登录组件</div>
    }
}

/**
 * 登录组件
 */
export const Login = Form.create()(LoginClass)