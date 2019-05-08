import * as React from 'react'
import { Spin } from 'antd'

interface IProps {}

/**
 * 动态加载组件loading组件
 */
export const PageLoading: React.SFC<IProps> = () => {
    return (
        <Spin size="large" className="global-spin-full"/>
    )
}