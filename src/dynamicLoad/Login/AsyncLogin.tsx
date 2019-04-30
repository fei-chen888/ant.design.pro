import * as React from 'react'
import Loadable from 'react-loadable'
import { PageLoading } from 'src/components/PageLoading/PageLoading'

export const AsyncLogin = Loadable({
    loader: () => import(/* webpackChunkName: 'pages/login' */ 'src/pages/Login/Login'),
    loading: () => <PageLoading />
})
