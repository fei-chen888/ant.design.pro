import styles from './Workplace.less'
import * as React from 'react'
import { Form, Col, Input, Button, Icon } from 'antd'
import { IAbstractPageProps, AbstractPage, IAbstractPageState } from 'src/components/Abstract/AbstractPage'
import { IListOfflineStore } from 'src/models/Store'
import { IComponentState } from 'src/models/Base'
import { OfflineStoreSelect } from 'src/components/Store/OfflineStoreSelect'
import { FormComponentProps } from 'antd/lib/form'
import { withRouter, RouteComponentProps } from 'react-router-dom'

interface IProps extends IAbstractPageProps, FormComponentProps, RouteComponentProps<any> {}

interface IState extends IAbstractPageState {}

interface IFormField {
    offlineStore: IListOfflineStore | undefined
}

/**
 * 工作台
 */
class WorkplacePageClass extends AbstractPage<IProps, IState> {

    displayName = 'WorkplacePageClass'

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

    componentDidMount() {
        this.setFormValue()
    }

    /**
     * 回填表单
     */
    setFormValue() {
        const { setFieldsValue } = this.props.form
        const data: IFormField = {
            offlineStore: { id: 147 } as IListOfflineStore
        }
        setFieldsValue(data)
    }

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

    /**
     * 查询事件
     */
    onSearch() {
        const { getFieldsValue } = this.props.form
        console.log(getFieldsValue())
    }

    /**
     * 新建事件
     */
    onCreate() {
        const {  history } = this.props
        history.push('/admin/dashboard/analysis')
    }

    getRenderContent() {
        const { getFieldDecorator } = this.props.form
        return (
            <div className={styles.workplacePage}>
                <Form className="global-form-search">
                    <Col span={24}>
                        <Form.Item label="订单编号">
                            {getFieldDecorator('orderCode')(<Input placeholder="搜索订单编号" style={{width: 200}}/>)}
                        </Form.Item>
                        <Form.Item label="线下门店">
                            {getFieldDecorator('offlineStore')(<OfflineStoreSelect onComponentStateChange={d => this.onComponentStateChange('OfflineStoreSelect', d)}/>)}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" onClick={() => this.onSearch()}>查询</Button>
                        </Form.Item>
                    </Col>
                </Form>
                <Button type="primary" onClick={() => this.onCreate()}><Icon type="plus"/>新建</Button>
            </div>
        )
    }
}

export default withRouter(Form.create()(WorkplacePageClass))

