import * as React from 'react'

interface Iprops {}
interface Istate {}

/**
 * 404错误页
 */
export class E404Page extends React.Component<Iprops, Istate> {
    render() {
        return <p>404 not found</p>
    }
}
