import styles from './SelectTenantModal.less'
import * as React from 'react'
import { Row, Modal, Radio, Avatar } from 'antd'
import { IAbstractComponentProps, AbstractComponent, IAbstractComponentState } from 'src/components/Abstract/AbstractComponent'
import { IStaffTenant, IAuthinfo } from 'src/models/Auth'
import { ModalProps } from 'antd/lib/modal'
import { methodTry } from 'src/decorator/Try'
import { authService } from 'src/services/Auth'
import { REQUEST_STATUSCODE } from 'src/utils/Constants'
import { setTenantCode, setUserinfo } from 'src/utils/CryptoLocalStorage'


interface IProps extends IAbstractComponentProps {
    /**
     * 选择租户成功登录
     */
    onLoginSuccess: (d: IStaffTenant, u: IAuthinfo) => void
    onCancel: () => void
    value: Array<IStaffTenant>
    visible: boolean
}

interface IState extends IAbstractComponentState {
    selectTenant: IStaffTenant | undefined
}

class SelectTenantModalClass extends AbstractComponent<IProps, IState> {

    displayName = 'SelectTenantModalClass'

    state: IState = {
        selectTenant: undefined
    }

    /**
     * 返回modal属性
     */
    get getModalOpt(): ModalProps {
        const { visible } = this.props
        return {
            width: 360,
            wrapClassName: styles.selectTenantModal,
            title: '选择租户',
            visible: visible,
            onOk: () => {
                this.onOk()
            },
            onCancel: () => {
                this.onCancel()
            }
        }
    }

    /**
     * 选择租户事件
     */
    @methodTry()
    async onOk() {
        const { selectTenant } = this.state
        if (selectTenant) {
            this.showLoading()
            const res = await authService.getAuthinfos({
                tenantCode: selectTenant.tenantCode,
                componentUUID: this.getUUID()
            })
            if (res.data.statusCode === REQUEST_STATUSCODE.SUCCESS.code && res.data.responseContent.user) {
                setTenantCode(selectTenant.tenantCode)
                setUserinfo(JSON.stringify(res.data.responseContent.user))
                authService.dispatchAuthToStore()
                this.props.onLoginSuccess(selectTenant, res.data.responseContent)
            }
            this.hidenLoading()
        }
    }

    /**
     * 取消选择
     */
    onCancel() {
        this.props.onCancel()
    }

    /**
     * modal内容
     */
    getModalContent() {
        const { value = [] } = this.props
        return (
        <Row>
            <Radio.Group className={styles.tenantGroup} onChange={d => this.setState({selectTenant: d.target.value})}>
            {value.map(tenant => {
                return (
                    <Row className={styles.tenant} key={tenant.tenantCode}>
                        <div className={styles.tenantIcon}><Avatar shape="circle" size={32} src={tenant.icon}/></div>
                        <div className={styles.tenantName}>{tenant.tenantName}</div>
                        <div className={styles.tenantFooter}>
                            <Radio value={tenant}/>
                        </div>
                    </Row>
                )
            })}
            </Radio.Group>
        </Row>
        )
    }

    getRenderContent() {
        return <Modal {...this.getModalOpt}>{this.getModalContent()}</Modal>
    }
}

/**
 * 选择租户登录组件
 */
export const SelectTenantModal = SelectTenantModalClass