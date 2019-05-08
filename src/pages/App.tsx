import * as React from 'react'
import { LocaleProvider, Spin, notification } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import { ErrorHandler } from 'src/components/ErrorHandler/ErrorHandler'
import { Routes } from 'src/routes/Routes'
import { connect } from 'react-redux'
import { IReduxState } from 'src/reducers/Store'

interface IState {}
interface IProps {
    loading: boolean
}

const mapStateToProps = (state: IReduxState): IProps => {
    return {
        loading: state.loadingStore.loading
    }
}

notification.config({
    placement: 'topRight',
    top: 24,
    duration: 3,
})

class App extends React.Component<IProps, IState> {
    render() {
        return (
          <LocaleProvider locale={zhCN}>
              <ErrorHandler>
                {this.props.loading && <Spin size="large" className="global-spin-full"/>}
                <Routes redirect="/login" />
              </ErrorHandler>
          </LocaleProvider>
        )
    }
}

export default connect(mapStateToProps)(App)
