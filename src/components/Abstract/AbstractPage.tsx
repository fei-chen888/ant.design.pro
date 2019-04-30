import * as React from 'react'

export interface IAbstractPageProps {
    className?: string
}
export abstract class AbstractPage<P extends IAbstractPageProps, S> extends React.PureComponent<P, S> {
    /**
     * 类名
     */
    abstract displayName: string

    isLoading: boolean

    /**
     * render 内容
     */
    abstract getRenderContent(): JSX.Element | null

    getDisplayName(): string {
        return this.displayName
    }
    render() {
        return this.getRenderContent()
    }
}