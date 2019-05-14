import styles from './Workplace.less'
import * as React from 'react'
import { Form, Button, Icon } from 'antd'
import { IAbstractPageProps, AbstractPage, IAbstractPageState } from 'src/components/Abstract/AbstractPage'
import { FormComponentProps } from 'antd/lib/form'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { OrderSearchForm, IOrderSearchFormField } from 'src/components/Order/OrderSearhForm'
import { orderService, IOrderServiceOrderList } from 'src/services/Order'
import { OrderListTable } from 'src/components/Order/OrderListTable'
import { IOrderList } from 'src/models/Order'
import { DEFAULT_PAGESIZE } from 'src/utils/Constants'

interface IProps extends IAbstractPageProps, FormComponentProps, RouteComponentProps<any> {}

interface IState extends IAbstractPageState {
    orderList: Array<IOrderList>
}



/**
 * 工作台
 */
class WorkplacePageClass extends AbstractPage<IProps, IState> {

    displayName = 'WorkplacePageClass'

    state: IState = {
        orderList: [],
        pageNum: 1,
        pageSize: DEFAULT_PAGESIZE,
        total: 0
    }

    formSearchData: IOrderSearchFormField | undefined = undefined

    componentDidMount() {
        this.setFormValue()
    }

    /**
     * 回填表单
     */
    setFormValue() {
        const { setFieldsValue } = this.props.form
        const data: IOrderSearchFormField = {
            orderCode: '',
            offlineStore: undefined
        }
        setFieldsValue(data)
    }

    /**
     * 获取订单数据
     */
    async getOrderListData() {
        const data = this.formSearchData
        const { pageSize = 1, pageNum = 1 } = this.state
        this.showLoading()
        let params: IOrderServiceOrderList = {
            orderCode: data ? data.orderCode : '',
            onlineType: 'ONLINE',
            storeId: data ? (data.offlineStore ? data.offlineStore.id : undefined) : undefined,
            pageSize,
            pageNum
        }
        const res = await orderService.getOrderList(params)
        if (res) {
            this.setState({
                orderList: res.data.responseContent.list,
                total: res.data.responseContent.total
            })
        }
        this.hidenLoading()
    }

    /**
     * 表格切页
     */
    onPageChange(pageNum: number) {
        this.setState(
            {
                pageNum
            },
            () => {
                this.getOrderListData()
            }
        )
    }

    /**
     * 查询事件
     */
    onSearch(d: IOrderSearchFormField | undefined) {
        this.formSearchData = d
        this.setState(
            {
                pageNum: 1
            },
            () => {
                this.getOrderListData()
            }
        )
    }

    /**
     * 新建事件
     */
    onCreate() {
        const {  history } = this.props
        history.push('/admin/dashboard/analysis')
    }

    getRenderContent() {
        const { orderList, pageNum, total, pageSize } = this.state
        return (
            <div className={styles.workplacePage}>
                <OrderSearchForm {...this.props} onChange={d => this.onSearch(d)}/>
                <Button type="primary" onClick={() => this.onCreate()}><Icon type="plus"/>新建</Button>
                <div className={styles.orderListTable}>
                    <OrderListTable 
                        value={orderList} 
                        pageNum={pageNum} 
                        pageSize={pageSize}
                        total={total}
                        onPageChange={page => this.onPageChange(page)}
                        />
                </div>
            </div>
        )
    }
}

export default withRouter(Form.create()(WorkplacePageClass))

