import * as React from 'react'
import { store } from 'src/reducers/Store'
import { loadingActionType } from 'src/reducers/Loading/ActionType'


export interface IAbstractComponentProps<T = any> {
    value?: T | undefined
    className?: string
    onChange?: (d: T | undefined) => void
    onComponentStateChange?: (componentState: 'pending' | 'complete') => void
}

export interface IAbstractComponentState {
    pageNum?: number
    pageSize?: number
    total?: number
}
export abstract class AbstractComponent<P extends IAbstractComponentProps, S extends IAbstractComponentState> extends React.PureComponent<P, S> {
    /**
     * 类名
     */
    abstract displayName: string

    /**
     * state 初始化
     */
    abstract state: S

    /**
     * render 内容
     */
    abstract getRenderContent(): JSX.Element | null | React.ReactNode

    /**
     * 获取类名
     */
    getDisplayName(): string {
        return this.displayName
    }

    /**
     * 组件状态改变
     * @param componentState 
     */
    componentStateChange(componentState: 'pending' | 'complete') {
        const { onComponentStateChange } = this.props
        if (onComponentStateChange) {
            onComponentStateChange(componentState)
        }
    }

    /**
     * 通过redux显示全局spin
     */
    showLoading() {
        store.dispatch({
            type: loadingActionType.SHOW
        })
    }

    /**
     * 通过redux隐藏全局spin
     */
    hidenLoading() {
        store.dispatch({
            type: loadingActionType.HIDEN
        })
    }

    /**
     * 组件默认在componentDidMount时，状态就完成；
     * 异步组件，需改写componentDidMount，将状态改为pending，并且实现在数据请求完成后请组件状态转为完成（this.props.componentStateChange('complete')）
     */
    componentDidMount() {
        this.componentStateChange('complete')
    }
    
    /**
     * 不要重写，请通过实现getRenderContent
     */
    render() {
        console.log(this.displayName)
        return this.getRenderContent()
    }
}