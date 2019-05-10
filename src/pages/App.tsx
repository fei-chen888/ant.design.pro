import * as React from 'react'
import { LocaleProvider, notification } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import { ErrorHandler } from 'src/components/ErrorHandler/ErrorHandler'
import { Routes } from 'src/routes/Routes'
import { ReduxSpin } from 'src/components/ReduxSpin/ReduxSpin'
import { authService } from 'src/services/Auth'

interface IProps {}

interface IState {}

notification.config({
    placement: 'topRight',
    top: 24,
    duration: 3,
})

class App extends React.Component<IProps, IState> {
    
    componentDidMount() {
        authService.dispatchAuthToStore()
    }
    
    render() {
        return (
          <LocaleProvider locale={zhCN}>
              <ErrorHandler>
                <ReduxSpin/>
                <Routes redirect="/login" />
              </ErrorHandler>
          </LocaleProvider>
        )
    }
}

export default App