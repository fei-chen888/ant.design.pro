import * as React from 'react'

export interface IAbstractComponentProps {
    className?: string
}
export abstract class AbstractComponent<P extends IAbstractComponentProps, S> extends React.PureComponent<P, S> {
    /**
     * 类名
     */
    abstract displayName: string

    isLoading: boolean

    /**
     * render 内容
     */
    abstract getRenderContent(): JSX.Element | null | React.ReactNode

    

    getDisplayName(): string {
        return this.displayName
    }
    
    render() {
        return this.getRenderContent()
    }
}