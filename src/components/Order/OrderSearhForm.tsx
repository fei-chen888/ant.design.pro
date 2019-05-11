import * as React from 'react'
import { AbstractComponent, IAbstractComponentState, IAbstractComponentProps } from 'src/components/Abstract/AbstractComponent'
import { Form, Col, Input, Button } from 'antd'
import { OfflineStoreSelect } from 'src/components/Store/OfflineStoreSelect'
import { FormComponentProps } from 'antd/lib/form'
import { IOfflineStoreList } from 'src/models/Store'
import { IComponentState } from 'src/models/Base'

export interface IOrderSearchFormField {
    offlineStore: IOfflineStoreList | undefined
    orderCode: string
}

interface IProps extends IAbstractComponentProps<IOrderSearchFormField>, FormComponentProps { }

interface IState extends IAbstractComponentState {}

class OrderSearchFormClass extends AbstractComponent<IProps, IState> {

    displayName = 'OrderSearchFormClass'

    state: IState = {}

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
                this.onSearch()
            }
        }
    }

    /**
     * 查询事件
     */
    onSearch() {
        const { onChange } = this.props
        const { getFieldsValue } = this.props.form
        if (onChange) {
            onChange(getFieldsValue() as IOrderSearchFormField)
        }
    }

    getRenderContent() {
        const { getFieldDecorator } = this.props.form
        return (
            <Form className="global-form-search">
                <Col span={24}>
                    <Form.Item label="订单编号">
                        {getFieldDecorator('orderCode', {initialValue: ''})(<Input placeholder="搜索订单编号" style={{width: 200}}/>)}
                    </Form.Item>
                    <Form.Item label="线下门店">
                        {getFieldDecorator('offlineStore')(<OfflineStoreSelect onComponentStateChange={d => this.onComponentStateChange('OfflineStoreSelect', d)}/>)}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={() => this.onSearch()}>查询</Button>
                    </Form.Item>
                </Col>
            </Form>
        )
    }
}

/**
 * 订单搜索表单组件
 */
export const OrderSearchForm = OrderSearchFormClass

