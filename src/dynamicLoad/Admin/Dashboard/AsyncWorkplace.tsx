import * as React from 'react'
import Loadable from 'react-loadable'
import { PageLoading } from 'src/components/PageLoading/PageLoading'

export const AsyncWorkplace = Loadable({
    loader: () => import(/* webpackChunkName: 'pages/admin/dashboard/workplace' */ 'src/pages/Dashboard/Workplace'),
    loading: () => <PageLoading />
})
