import * as React from 'react'
import { store } from 'src/reducers/Store'
import { loadingActionType } from 'src/reducers/Loading/ActionType'

export interface IAbstractComponentProps {
    className?: string
}
export abstract class AbstractComponent<P extends IAbstractComponentProps, S> extends React.PureComponent<P, S> {
    /**
     * 类名
     */
    abstract displayName: string

    /**
     * render 内容
     */
    abstract getRenderContent(): JSX.Element | null | React.ReactNode

    showLoading() {
        store.dispatch({
            type: loadingActionType.SHOW
        })
    }

    hidenLoading() {
        store.dispatch({
            type: loadingActionType.HIDEN
        })
    }

    getDisplayName(): string {
        return this.displayName
    }
    
    render() {
        return this.getRenderContent()
    }
}