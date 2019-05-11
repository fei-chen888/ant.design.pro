import * as React from 'react'
import { AbstractComponent, IAbstractComponentState, IAbstractComponentProps } from 'src/components/Abstract/AbstractComponent'
import { IOrderList } from 'src/models/Order'
import { Table } from 'antd'
import { TableProps, ColumnProps } from 'antd/lib/table'
import { DEFAULT_PAGESIZE, ORDER_STATUS, EXPRESS_TYPE } from 'src/utils/Constants'


interface IProps extends IAbstractComponentProps<Array<IOrderList>> {
    pageNum?: number
    pageSize?: number
    total?: number
    onPageChange: (pageNum: number) => void
    tableProps?: TableProps<IOrderList>
}

interface IState extends IAbstractComponentState {}

class OrderListTableClass extends AbstractComponent<IProps, IState> {

    displayName = 'OrderListTableClass'

    state: IState = {}

    get getTableOpt(): TableProps<IOrderList> {
        const { value, total = 0, pageNum = 1, pageSize = DEFAULT_PAGESIZE, onPageChange } = this.props
        return {
            rowKey: 'id',
            rowSelection: {
                type: 'checkbox'
            },
            bordered: true,
            dataSource: value || [],
            columns: this.getTableColumns,
            pagination: {
                current: pageNum,
                total,
                pageSize,
                showTotal: () => `共 ${total} 条`,
                onChange: (page: number) => {
                    onPageChange(page)
                }
            },
            ...this.props.tableProps
        }
    }

    get getTableColumns(): Array<ColumnProps<IOrderList>> {
        return [
            {
                title: '订单编号',
                dataIndex: 'orderCode',
                key: 'orderCode'
            },
            {
                title: '下单时间',
                dataIndex: 'createTime',
                key: 'createTime'
            },
            {
                title: '订单状态',
                dataIndex: 'orderStatus',
                key: 'orderStatus',
                render: (text: string) => {
                    return ORDER_STATUS[text] ? ORDER_STATUS[text].text : text
                }
            },
            {
                title: '订单金额',
                dataIndex: 'totalAmount',
                key: 'totalAmount'
            },
            {
                title: '配送方式',
                dataIndex: 'expressType',
                key: 'expressType',
                render: (text: string) => {
                    return EXPRESS_TYPE[text] ? EXPRESS_TYPE[text].text : text
                }
            },
            {
                title: '商店',
                dataIndex: 'storeName',
                key: 'storeName'
            }
        ]
    }

    getRenderContent() {
        return (
            <div>
                <Table {...this.getTableOpt}/>
            </div>
        )
    }
}

/**
 * 订单列表表格组件
 */
export const OrderListTable = OrderListTableClass

