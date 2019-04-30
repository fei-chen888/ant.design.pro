import React from 'react'
import { IAbstractComponentProps, AbstractComponent } from 'src/components/Abstract/component'
import { ErrorInfo } from 'react'
import { message } from 'antd';
interface IProps extends IAbstractComponentProps {}
interface IState {
    error: Error | null
    errorInfo: ErrorInfo | null
}

/**
 * 方法执行错误捕捉装饰器,支持async方法
 * @param catchCallbackName 类中接收cath中回调方法名，回调参数error：Error
 * @returns Function() 返回PropertyDescriptor 
 */
export function methodTryCatchDecorator(catchCallbackName?: string ) {
    async function asyncFn(_this: any, displayName: string, methodName: string, fn: Function, prams: any) {
        try {
            await fn.apply(_this, prams)
        } catch (error) {
            const errorMessage = `${displayName}/${methodName}:${error.toString()}`
            if (catchCallbackName && _this[catchCallbackName]) {
                _this[catchCallbackName](error)
            }
            console.log(errorMessage)
        }
    }

    return (target: any, methodName: string, descriptor: any) => {
        const oldValue = descriptor.value
        descriptor.value = function() {
            const oldArguments = arguments
            const displayName = this.displayName
            asyncFn(this, displayName, methodName, oldValue, oldArguments)
        }
        return descriptor
    }
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

    render() {
        const { error } = this.state
        return error ? <a onClick={() => this.onLogin({a: 'a', b: 'b'}, {a2: 'a2', b2: 'b2'}, {})}>error</a> : this.props.children
    }
}

/**
 * 错误处理组件
 */
export const ErrorHandler = ErrorHandlerClass