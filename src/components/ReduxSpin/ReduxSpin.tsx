import * as React from 'react'
import { Spin } from 'antd'
import { connect } from 'react-redux'
import { IReduxState } from 'src/reducers/Store'
import { AbstractComponent, IAbstractComponentProps, IAbstractComponentState } from 'src/components/Abstract/AbstractComponent'

interface IProps extends IAbstractComponentProps {
    loading: boolean
}

interface IState extends IAbstractComponentState {}

class ReduxSpinClass extends AbstractComponent<IProps, IState> {

    displayName = 'ReduxSpinClass'

    state: IState = {}

    getRenderContent() {
        return (
            this.props.loading && <Spin size="large" className="global-spin-full"/>
        )
    }
}

const mapStateToProps = (state: IReduxState): IProps => {
    return {
        loading: state.loadingStore.loading
    }
}
/**
 * 基于redux的全局spin组件
 */
export const ReduxSpin = connect(mapStateToProps)(ReduxSpinClass)
