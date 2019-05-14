import * as React from 'react'
import { Spin } from 'antd'
import { connect } from 'react-redux'
import { AbstractComponent, IAbstractComponentProps, IAbstractComponentState } from 'src/components/Abstract/AbstractComponent'
import { spinMapStateToProps, IReducerLoadingState } from 'src/reducers/Loading/Reducer'
/**
 * reduxStore redux中的数据
 */
interface IProps extends IAbstractComponentProps {
    reduxStore?: IReducerLoadingState
}

interface IState extends IAbstractComponentState {}

class GlobalSpinClass extends AbstractComponent<IProps, IState> {
    
    displayName = 'GlobalSpinClass'

    state: IState = {}

    getRenderContent() {
        const { reduxStore } = this.props
        return (
            reduxStore && reduxStore.loading && <Spin size="large" className="global-spin-full"/>
        )
    }
}

/**
 * 基于redux的全局spin组件
 */
export const GlobalSpin = connect(spinMapStateToProps)(GlobalSpinClass)
