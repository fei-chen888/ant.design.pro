import React from 'react'
import { ErrorInfo } from 'react'
import { message } from 'antd'
import { IAbstractComponentProps, AbstractComponent } from 'src/components/Abstract/AbstractComponent'
import { methodTryCatchDecorator } from 'src/decorator/MethodTryCatchDecorator'

interface IProps extends IAbstractComponentProps {}
interface IState {
    error: Error | null
    errorInfo: ErrorInfo | null
}

class ErrorHandlerClass extends AbstractComponent<IProps, IState> {

    displayName = 'ErrorHandlerClass'
    
    state: IState = {
        error: new Error('test'),
        errorInfo: null
    }

    test: any = null

    constructor(props: IProps) {
        super(props)
    }

    catchCallBack(error: Error) {
        message.error(error.message)
        this.setState({
            error: error,
            errorInfo: null
        })
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({
            error,
            errorInfo
        })
    }
    promise(): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve({message: 'resolve'})
        })
    }

    @methodTryCatchDecorator('catchCallBack')
    async onLogin(p: any, p2: any, p3: any) {
        const res = await this.promise()
        console.log('res:', res)
        console.log(p, p2, p3)
        this.test[0] = 1
        this.updateState()
    }

    updateState() {
        console.log(this)
        this.setState({
            error: null,
            errorInfo: null
        })
    }

    getRenderContent() {
        const { error } = this.state
        return error ? <a onClick={() => this.onLogin({a: 'a', b: 'b'}, {a2: 'a2', b2: 'b2'}, {})}>error</a> : this.props.children
    }
}

/**
 * 错误处理组件
 */
export const ErrorHandler = ErrorHandlerClass