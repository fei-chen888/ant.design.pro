import * as React from 'react'
import PropTypes from 'prop-types'
import { loadingActionType } from '../reducers/Loading/ActionType';
import { loadingReducer, IReducerLoadingState } from '../reducers/Loading/Reducer';
import { authinfoReducer, IReducerAuthState } from '../reducers/Auth/Reducer';
interface IProps {
    store: IStore
}

export interface IStore {
    dispatch(action: IAction)
    getStore()
}

export interface IAction {
    type: string
    data?: any
}

export type ReducersMapObject<S = any> = {
    [K in keyof S]: Reducer
  }

export type Reducer<S = any> = (
    state: S | undefined,
    action: IAction
) => S

interface IState {}

export class Provider extends React.Component<IProps, IState> {

    static childContextTypes = {
        store: PropTypes.object
    }

    getChildContext() {
        return {store: this.props.store}
    }

    componentDidUpdate() {
        console.log('componentDidUpdate:')
    }

    componentDidMount() {
        const { dispatch } = this.props.store
        dispatch({
            type: loadingActionType.SHOW
        })
    }
    render() {
        return (
            <div>{this.props.children}</div>
        )

    }
}

function createStore<S = any, R = any>(reducerMap: ReducersMapObject) {
    let store: S = {} as S
    let reducerList: Array<{key: string, reducer(action: IAction): any}> = []
    let subscribeList: Array<any> = []
    Object.keys(reducerMap).forEach(key => {
        store[key] = reducerMap[key](
            undefined,
            {
                type: ''
            }
        )
        reducerList.push({
            key,
            reducer: (action: IAction) => {
                store[key] = reducerMap[key](store[key], action)
            }
        })
    })
    function dispatch(action: IAction) {
        reducerList.forEach(item => {
            item.reducer(action)
        })
        subscribeList.forEach(fn => {
            fn(store)
        })
    }
    function getStore(): S {
        return store
    }
    function subscribe(fn: (data: S) => void) {
        subscribeList.push(fn)
    }
    return {
        dispatch,
        getStore,
        subscribe
    }
}

export interface IReduxState {
	spin: IReducerLoadingState
	auth: IReducerAuthState
}
interface IReducersMap {
    spin: Reducer
    auth: Reducer
}
export const providerStore = createStore<IReduxState, IReducersMap>({
    spin: loadingReducer, 
    auth: authinfoReducer
})

export function ConnectHOC<P = any>(WarpComponent: React.ComponentClass) {
    return class HOC extends React.Component<P> {
        static contextTypes = {
            store: PropTypes.object
        }
        constructor(prop: any) {
            super(prop)
            this.subscribe = this.subscribe.bind(this)
        }
        componentDidMount() {
            this.context.store.subscribe(this.subscribe)
        }
        subscribe(data: any) {
            this.forceUpdate()
        }
        getProps() {
            return this.context.store
        }
        render() {
            return <WarpComponent {...this.getProps()}/>
        }
    }
}