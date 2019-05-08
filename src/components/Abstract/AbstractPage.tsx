import * as React from 'react'
import { store } from 'src/reducers/Store'
import { loadingActionType } from 'src/reducers/Loading/ActionType'

export interface IAbstractPageProps {
    className?: string
}
export abstract class AbstractPage<P extends IAbstractPageProps, S> extends React.PureComponent<P, S> {
    /**
     * 类名
     */
    abstract displayName: string
    /**
     * render 内容
     */
    abstract getRenderContent(): JSX.Element | null

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