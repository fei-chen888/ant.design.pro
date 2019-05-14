import styles from './OfflineStoreSelect.less'
import * as React from 'react'
import { Dropdown, Button, Icon, Menu, Avatar, Pagination } from 'antd'
import { IAbstractComponentProps, AbstractComponent, IAbstractComponentState } from 'src/components/Abstract/AbstractComponent'
import { REQUEST_STATUSCODE, DEFAULT_PAGESIZE_SMALL } from 'src/utils/Constants'
import { IOfflineStoreList } from 'src/models/Store'
import { storeService } from 'src/services/Store'
import { connect } from 'react-redux'
import { offlineStoreSelectMapStateToProps, IReducerOfflineStoreSelectState } from 'src/reducers/OfflineStoreSelect/Reducer'
import { methodTry } from 'src/decorator/Try'
import { FormConnectHOC } from 'src/components/HOC/Hoc'

/**
 * reduxStore redux中的数据
 * value IListOfflineStore，如果只有id，其他字段请默认为‘’，组件会请求接口补全其他字段
 */
interface IProps extends IAbstractComponentProps<IOfflineStoreList> {
    reduxStore?: IReducerOfflineStoreSelectState
    value?: IOfflineStoreList
    width?: number
}

interface IState extends IAbstractComponentState {
    list: Array<IOfflineStoreList>
    selectValue: IOfflineStoreList | undefined
    dropdownVisible: boolean
}

class OfflineStoreSelectClass extends AbstractComponent<IProps, IState> {

    displayName = 'OfflineStoreSelectClass'

    state: IState = {
        pageNum: 1,
        pageSize: DEFAULT_PAGESIZE_SMALL,
        total: 0,
        list: [],
        selectValue: undefined,
        dropdownVisible: false
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

    async componentDidUpdate() {
        let { selectValue } = this.state
        if (selectValue && !selectValue.storeName && !this.componentDidUpdatePending) {
            this.getOfflineStoreDateById(selectValue.id)
        }
    }

    async componentDidMount() {
        const { value, reduxStore } = this.props
        if (reduxStore && reduxStore.list.length) {
            this.setState({
                selectValue: value,
                total: reduxStore.total,
                pageNum: reduxStore.pageNum,
                pageSize: reduxStore.pageSize,
                list: reduxStore.list
            })
            this.componentStateChange('complete')
        } else {
            this.setState({
                selectValue: value
            })
            this.componentStateChange('pending')
            this.getOfflineStoreDate()
        }
    }

    /**
     * DropdownMenu
     */
    get getDropdownMenu() {
        const { list, selectValue, total = 0, pageSize = 0, pageNum = 1 } = this.state
        return (
            <Menu>
                <Menu.Item className={!selectValue ? styles.active : ''} onClick={() => this.onDropdownMenuClick()}>{this.getMenuItemContent()}</Menu.Item>
                {list.map(item => {
                    return <Menu.Item className={selectValue && item.id === selectValue.id ? styles.active : ''}onClick={() => this.onDropdownMenuClick(item)} key={item.id}>{this.getMenuItemContent(item)}</Menu.Item>
                })}
                {total > pageSize && 
                    <div className={styles.pagination}>
                        <Pagination onChange={(p1, p2) => this.onDropdownMenuPageChange(p1, p2)} size="small" current={pageNum} pageSize={pageSize} total={total} showTotal={() => `共 ${total} 条`}/>
                    </div>
                }
            </Menu>
        )
    }

    /**
     * MenuItemContent
     */
    getMenuItemContent(e?: IOfflineStoreList) {
        return e ? <div className={styles.menuItem}><Avatar size={16} src={e.storePicUrl} className={styles.menuItemAvatar}/><span className={styles.menuItemTitle}>{e.storeName}</span></div> : <span className={styles.menuItemTitle}>全部</span>
    }

    /**
     * DropdownMenu事件
     */
    @methodTry()
    onDropdownMenuClick(e?: IOfflineStoreList) {
        const { onChange } = this.props
        const { selectValue } = this.state
        if (selectValue === e) {
            return
        } else if (selectValue && e && selectValue.id === e.id) {
            return 
        }
        this.setState({
            selectValue: e,
            dropdownVisible: false
        })
        if (onChange) {
            onChange(e)
        }
    }

    /**
     * DropdownMenu中分页器切页
     */
    onDropdownMenuPageChange(pageNum: number, pageSize?: number) {
        this.setState(
            {
                pageNum,
                pageSize
            },
            () => {
                this.getOfflineStoreDate()
            }
        )
    }
    /**
     * 获取门店数据
     */
    @methodTry()
    async getOfflineStoreDate() {
        const { pageNum = 1, pageSize = DEFAULT_PAGESIZE_SMALL } = this.state
        this.showLoading()
        const res = await storeService.getOfflineStoreList({
            pageNum,
            pageSize
        })
        if (res.data.statusCode === REQUEST_STATUSCODE.SUCCESS.code) {
            this.setState({
                list: res.data.responseContent.list,
                total: res.data.responseContent.total
            })
            storeService.dispatchOfflineStoreSelectToStore({
                pageNum,
                pageSize,
                list: res.data.responseContent.list,
                total: res.data.responseContent.total
            })
        }
        this.componentStateChange('complete')
        this.hidenLoading()
    }

    /**
     * 根据id获取门店获店数据
     */
    @methodTry()
    async getOfflineStoreDateById(storeId: number) {
        this.componentDidUpdatePending = true
        let { selectValue } = this.state
        const res = await storeService.getOfflineStoreById(storeId)
        if (res.data.statusCode === REQUEST_STATUSCODE.SUCCESS.code) {
            selectValue = {
                ...res.data.responseContent
            }
        } else {
            selectValue = {
                id: storeId,
                storeName: '-'
            } as IOfflineStoreList
        }
        this.setState(
            {
                selectValue
            },
            () => {
                const { onChange } = this.props
                if (onChange) {
                    onChange(selectValue)
                }
                this.componentDidUpdatePending = false
            }
        )
    }

    getRenderContent() {
        const { selectValue, dropdownVisible } = this.state
        return (
            <div className={styles.offlineStoreSelect} id="offlineStoreSelect">
                <Dropdown 
                    getPopupContainer={() => document.getElementById('offlineStoreSelect') || document.body} 
                    overlayClassName={styles.dropdownOverlay} 
                    placement="bottomLeft" 
                    onVisibleChange={v => this.setState({dropdownVisible: v})} 
                    overlay={this.getDropdownMenu} 
                    trigger={['click']}
                    >
                    <Button className={styles.button} style={{width: this.props.width || 200}}>
                        <div className={styles.buttonContent}>
                            <div className={styles.buttonContentBody}>
                                {this.getMenuItemContent(selectValue)}
                            </div>
                            <div className={styles.buttonContentFoot}>
                                <Icon type={dropdownVisible ? 'up' : 'down'}/>
                            </div>
                        </div>
                    </Button>
                </Dropdown>
            </div>
        )
    }
}

/**
 * 商店选择组件
 */
export const OfflineStoreSelect = FormConnectHOC<IProps>(connect(offlineStoreSelectMapStateToProps)(OfflineStoreSelectClass))

