import * as React from 'react'

export interface IAbstractPageProps {
    className?: string
}
export abstract class AbstractPage<P extends IAbstractPageProps, S> extends React.PureComponent<P, S> {
    isLoading: boolean
    render() {
        return <p>AbstractPage</p>
    }
}