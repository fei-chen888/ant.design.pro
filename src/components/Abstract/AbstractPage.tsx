import * as React from 'react'
import { store } from 'src/reducers/Store'
import { loadingActionType } from 'src/reducers/Loading/ActionType'

export interface IAbstractPageProps {
    className?: string
}

export interface IAbstractPageState {
    pageNum?: number
    pageSize?: number
    total?: number
}

export abstract class AbstractPage<P extends IAbstractPageProps, S extends IAbstractPageState> extends React.PureComponent<P, S> {
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
    abstract getRenderContent(): JSX.Element | null

    /**
     * 获取类名
     */
    getDisplayName(): string {
        return this.displayName
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
        setTimeout(
            () => {
                store.dispatch({
                    type: loadingActionType.HIDEN
                })
            },
            800
        )
    }
    
    /**
     * 不要重写，请通过实现getRenderContent
     */
    render() {
        console.log(this.displayName)
        return this.getRenderContent()
    }
}