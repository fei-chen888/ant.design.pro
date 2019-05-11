import * as React from 'react'

/**
 * 经过redux connect包裹后的组件，放在Form.getFieldDecorator中使用时会warinng
 * 
 * Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?
 * 
 * 必需使用FormConnectHOC再包裹FormConnectHOC<T>(connect(mapStateToProps)(WarpComponent))
 */
export function FormConnectHOC<P = any>(WarpComponent: React.ComponentClass) {
    return class HOC extends React.Component<P> {
        render() {
            return <WarpComponent {...this.props}/>
        }
    }
}