import * as React from 'react'
import { loadingActionType } from 'src/reducers/Loading/ActionType';
import { ConnectHOC } from 'src/test/Provider'

interface IState {}


class Test extends React.Component<any, IState> {


    render() {
        console.log('Test')
        const { getStore } = this.props
        return (
          <div onClick={() => this.props.dispatch({type: loadingActionType.SHOW})}>
            spin:{getStore().spin.counts}
          </div>
        )
    }
}

export default ConnectHOC(Test)