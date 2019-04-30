import * as React from 'react'
import { Skeleton } from 'antd'

interface IProps {}

/**
 * 动态加载组件loading组件
 */
export const PageLoading: React.SFC<IProps> = () => {
    return (
        <Skeleton loading={true}/>
    )
}