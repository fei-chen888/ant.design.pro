import * as React from 'react'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import { BrowserRouter } from 'react-router-dom'
import { ErrorHandler } from 'src/components/ErrorHandler/ErrorHandler'
import { Routes } from 'src/routes/Routes'

class App extends React.Component {
  render() {
    return (
        <LocaleProvider locale={zhCN}>
          <ErrorHandler>
            <BrowserRouter>
                <Routes redirect="/login"/>
            </BrowserRouter>
          </ErrorHandler>
        </LocaleProvider>
    )
  }
}

export default App