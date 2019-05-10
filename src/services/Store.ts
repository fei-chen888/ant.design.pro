import { request } from 'src/utils/Request'
import { IResponseListBase, IPageBase } from 'src/models/Base'
import { IListOfflineStore } from 'src/models/Store'


export interface IAuthServiceListAllOffline extends IPageBase {}
/**
 * 商店相关服务接口
 */
export namespace storeService {
    /**
     * 线下门店查询接口
     */
    export function listAllOffline(params: IAuthServiceListAllOffline) {
        return request.get<IResponseListBase<IListOfflineStore>>('/store/{}/products-store/list-all-offline', {params})
    }
}