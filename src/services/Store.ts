import { request } from 'src/utils/Request'
import { IResponseListBase, IReuqestBase, IResponseBase } from 'src/models/Base'
import { IOfflineStoreList } from 'src/models/Store'
import { store } from 'src/reducers/Store'
import { IReducerOfflineStoreSelectState } from 'src/reducers/OfflineStoreSelect/Reducer'
import { offlineStoreSelectActionType } from 'src/reducers/OfflineStoreSelect/ActionType'


export interface IStoreServiceOfflineStoreList extends IReuqestBase {}

export interface IStoreById extends IReuqestBase {
    storeId: number
}
/**
 * 商店相关服务接口
 */
export namespace storeService {
    /**
     * 线下门店列表接口
     */
    export function getOfflineStoreList(params: IStoreServiceOfflineStoreList) {
        return request.get<IResponseListBase<IOfflineStoreList>>('/store/{}/products-store/list-all-offline', {params})
    }

    /**
     * 根据id获取线下门店
     */
    export function getOfflineStoreById(params: IStoreById) {
        return request.get<IResponseBase<IOfflineStoreList>>('/store/lqx/stores/detail', {
            params
        })
    }

    /**
     * 将数据存至store
     */
    export function dispatchOfflineStoreSelectToStore(data: IReducerOfflineStoreSelectState) {
        store.dispatch({
            type: offlineStoreSelectActionType.UPDATE,
            data
        })
    }
}