import './globalCss/App.less'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import App from './pages/App'
import { Provider } from 'react-redux'
import { store } from 'src/reducers/Store'

// 监听state变化
store.subscribe(() => {
    console.log(store.getState())
})

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root') as HTMLElement
)

registerServiceWorker()

window.addEventListener('error', (error: any) => {
    console.log('error:', error)
})
