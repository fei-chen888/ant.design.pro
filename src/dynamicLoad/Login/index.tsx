import * as React from 'react'
import Loadable from 'react-loadable'
import { PageLoading } from 'src/components/PageLoading'

export const AsyncLogin = Loadable({
    loader: () => import(/* webpackChunkName: 'pages/login' */ 'src/pages/login/login'),
    loading: () => <PageLoading />
})
