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

    getDisplayName(): string {
        return this.displayName
    }
    
    renter() {
        return <p>AbstractComponent</p>
    }
}