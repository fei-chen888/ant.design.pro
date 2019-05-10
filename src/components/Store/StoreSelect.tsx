import * as React from 'react'
import { Select } from 'antd'
import { IAbstractComponentProps, AbstractComponent, IAbstractComponentState } from 'src/components/Abstract/AbstractComponent'
import { PAGESIZE, REQUEST_STATUSCODE } from 'src/utils/Constants'
import { IListOfflineStore } from 'src/models/Store'
import { storeService } from 'src/services/Store'
import { SelectProps } from 'antd/lib/select'

interface IProps extends IAbstractComponentProps<IListOfflineStore> {}

interface IState extends IAbstractComponentState {
    list: Array<IListOfflineStore>
    selectValue: IListOfflineStore | undefined
}

class OfflineStoreSelectClass extends AbstractComponent<IProps, IState> {

    displayName = 'OfflineStoreSelectClass'

    state: IState = {
        pageNum: 1,
        pageSize: PAGESIZE,
        total: 0,
        list: [],
        selectValue: undefined
    }

    static getDerivedStateFromProps(props: IProps, state: IState) {
        if (props.value && props.value.id !== (state.selectValue && state.selectValue.id)) {
            return {
                ...state,
                selectValue: props.value
            }
        } else {
            return null
        }
    }

    componentDidMount() {
        const { value } = this.props
        this.setState({
            selectValue: value
        })
        this.componentStateChange('pending')
        this.getOfflineStoreDate()
    }

    /**
     * Select属性
     */
    get getSelectOpt(): SelectProps<string> {
        const { selectValue } = this.state
        return {
            value: selectValue ? `${selectValue.id}` : '',
            onChange: d => this.onChange(d)
        }
    }

    /**
     * Select选择事件
     */
    onChange(d: string) {
        const { list } = this.state
        const { onChange } = this.props
        let selectValue: IListOfflineStore | undefined = undefined
        if (d !== '') {
            selectValue = list.find(item => item.id === Number(d))
        }
        this.setState(
            {
                selectValue
            },
            () => {
                if (onChange) {
                    onChange(selectValue)
                }
            }
        )
    }

    /**
     * 获取门店数据
     */
    async getOfflineStoreDate() {
        const { pageNum = 0, pageSize = PAGESIZE } = this.state
        this.showLoading()
        const res = await storeService.listAllOffline({
            pageNum,
            pageSize
        })
        if (res.data.statusCode === REQUEST_STATUSCODE.SUCCESS.code) {
            this.setState({
                list: res.data.responseContent.list,
                total: res.data.responseContent.total
            })
        }
        this.componentStateChange('complete')
        this.hidenLoading()
    }

    getRenderContent() {
        const { list = [] } = this.state
        return (
            <Select {...this.getSelectOpt}>
                <Select.Option key="" value="">全部</Select.Option>
                {list.map(option => {
                    return <Select.Option key={`${option.id}`} value={`${option.id}`}>{option.storeName}</Select.Option>
                })}
            </Select>
        )
    }
}

/**
 * 商店选择组件
 */
export const OfflineStoreSelect = OfflineStoreSelectClass