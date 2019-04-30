import './globalCss/App.less'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import App from './pages/App'
ReactDOM.render(<App />, document.getElementById('root') as HTMLElement)
registerServiceWorker()
window.addEventListener('error', (error: any) => {
    console.log('error:', error)
})