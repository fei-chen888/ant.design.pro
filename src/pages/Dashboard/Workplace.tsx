import styles from './Workplace.less'
import * as React from 'react'
import { FormComponentProps } from 'antd/lib/form'
import { IAbstractPageProps, AbstractPage, IAbstractPageState } from 'src/components/Abstract/AbstractPage'
import { OfflineStoreSelect } from 'src/components/Store/StoreSelect'
import { IListOfflineStore } from 'src/models/Store'
import { IComponentState } from 'src/models/Base'

interface IProps extends IAbstractPageProps, FormComponentProps {}

interface IState extends IAbstractPageState {
    offlineStore: IListOfflineStore | undefined
}

/**
 * 工作台
 */
interface IProps extends IAbstractPageProps, FormComponentProps {}
export default class WorkplacePage extends AbstractPage<IProps, IState> {

    displayName = 'WorkplacePage'

    state: IState = {
        offlineStore: undefined
    }

    /**
     * 子组件状态列表
     */
    componentStateList: Array<IComponentState> = [
        {
            componentName: 'OfflineStoreSelect',
            state: 'pending'
        }
    ]

    /**
     * 子组件状态改变事件
     */
    onComponentStateChange(componentName: string, state: 'pending' | 'complete') {
        if (state === 'complete') {
            this.componentStateList.forEach(item => {
                if (item.componentName === componentName) {
                    item.state = state
                }
            })
            const hasPending = this.componentStateList.some(item => {
                return item.state !== 'complete'
            })
            if (!hasPending) {
                this.getOrderListData()
            }
        }
    }

    /**
     * 获取订单数据
     */
    async getOrderListData() {
        this.showLoading()
        this.hidenLoading()
    }

    getRenderContent() {
        const { offlineStore } = this.state
        return (
            <div className={styles.workplacePage}>
                <OfflineStoreSelect onChange={d => this.setState({offlineStore: d})} value={offlineStore} onComponentStateChange={d => this.onComponentStateChange('OfflineStoreSelect', d)}/>
            </div>
        )
    }
}

