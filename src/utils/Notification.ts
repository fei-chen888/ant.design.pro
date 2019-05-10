import { notification } from 'antd'
import { INotice } from 'src/models/Notice'

/**
 *  通知提醒框
 */
export function notice(params: INotice) {
    notification[params.type]({
        message: params.message,
        description: params.description,
        onClose: params.onClose
    })
}