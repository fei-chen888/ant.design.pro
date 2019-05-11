/**
 * 线下门店列表返回数据
 */
export interface IOfflineStoreList {
    id: number
    storeCode: string
    storeTypeCode: string
    storeTypeId: number
    storeName: string
    storePicUrl: string
    businessStatusCode: string
    storeIntroduction: string
    latitude: number
    locationInfo: string
    longitude: number
    createTime: string
}