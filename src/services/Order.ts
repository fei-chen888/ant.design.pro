import { request } from 'src/utils/Request'
import { IResponseListBase, IPageBase } from 'src/models/Base'
import { IOrderList } from 'src/models/Order'


export interface IOrderServiceOrderList extends IPageBase {
    orderCode: string
    storeId?: number
    onlineType: 'OFFLINE' | 'ONLINE'
}
/**
 * 订单相关服务接口
 */
export namespace orderService {
    /**
     * 订单列表接口
     */
    export function getOrderList(params: IOrderServiceOrderList) {
        return request.get<IResponseListBase<IOrderList>>('/order/{}/sale-orders/list-page-to-web', {params})
    }
}