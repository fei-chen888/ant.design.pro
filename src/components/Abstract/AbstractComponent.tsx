import * as React from 'react'
import { store } from 'src/reducers/Store'
import { loadingActionType } from 'src/reducers/Loading/ActionType'
import { request } from 'src/utils/Request'


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
export abstract class AbstractComponent<P extends IAbstractComponentProps, S extends IAbstractComponentState> extends React.Component<P, S> {
    /**
     * 类名
     */
    abstract displayName: string

    /**
     * state 初始化
     */
    abstract state: S

    /**
     * 组件初始化时间
     */
    initTimeSpan: number = 0

    /**
     * componentDidUpdate中需要异步请求时，防止重复请求的状态
     * 
     * 
     * 示例代码
     * 
     * componentDidUpdate(){
     *  const { name } = this.state 
     *  if (!this.componentDidUpdatePending && name ) {
     *      数据请求()
     *  }
     * }
     * async 数据请求() {
     *  this.componentDidUpdatePending = true
     *  await xxxx()
     *  this.setState(
     *      {
     *          name:XXX
     *      },
     *      () => {
     *          this.componentDidUpdatePending = false
     *      }
     *  )
     * }
     * 
     */
    componentDidUpdatePending: boolean = false

    componentState: 'pending' | 'complete' = 'pending'

    /**
     * render 内容
     */
    abstract getRenderContent(): JSX.Element | null | React.ReactNode

    constructor(props: P) {
        super(props)
        this.initTimeSpan = new Date().getTime()
    }

    /**
     * 获取组件的UUID，返回displayName_initTimeSpan
     */
    getUUID(): string {
        return `${this.displayName}_${this.initTimeSpan}`
    }

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
        if (this.componentState !== componentState) {
            this.componentState = componentState
            if (onComponentStateChange) {
                onComponentStateChange(componentState)
            }
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

    componentWillUnmount() {
        if (request.cancel) {
            request.cancel(this.getUUID())
        }
    }
    
    /**
     * 不要重写，请通过实现getRenderContent
     */
    render() {
        console.log(this.displayName)
        return this.getRenderContent()
    }
}