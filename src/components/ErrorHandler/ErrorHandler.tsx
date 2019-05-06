import React from 'react'
import { ErrorInfo } from 'react'
import { IAbstractComponentProps, AbstractComponent } from 'src/components/Abstract/AbstractComponent'

interface IProps extends IAbstractComponentProps {}
interface IState {
    error: Error | null
    errorInfo: ErrorInfo | null
}

class ErrorHandlerClass extends AbstractComponent<IProps, IState> {

    displayName = 'ErrorHandlerClass'
    
    state: IState = {
        error: null,
        errorInfo: null
    }

    constructor(props: IProps) {
        super(props)
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({
            error,
            errorInfo
        })
    }

    getRenderContent() {
        const { error } = this.state
        return error ? <div>{error.message.toString()}</div> : this.props.children
    }
}

/**
 * 错误处理组件
 */
export const ErrorHandler = ErrorHandlerClass