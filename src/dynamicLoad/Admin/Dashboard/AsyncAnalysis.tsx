import * as React from 'react'
import Loadable from 'react-loadable'
import { PageLoading } from 'src/components/PageLoading/PageLoading'

export const AsyncAnalysis = Loadable({
    loader: () => import(/* webpackChunkName: 'pages/admin/dashboard/analysis' */ 'src/pages/Dashboard/Analysis'),
    loading: () => <PageLoading />
})
