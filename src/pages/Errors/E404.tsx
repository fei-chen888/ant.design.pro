import * as React from 'react'
import { AbstractPage } from 'src/components/Abstract/AbstractPage'

interface IProps {}

interface IState {}

/**
 * 404错误页
 */
export default class E404Page extends AbstractPage<IProps, IState> {

    displayName = 'E404'

    state: IState = {}

    getRenderContent() {
        return <p>404 not found</p>
    }
}
