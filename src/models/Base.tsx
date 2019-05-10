export interface IResponseBase<T> {
    statusCode: string
    statusMessage: string
    responseContent: T
}

export interface IResponseListBase<T> {
    statusCode: string
    statusMessage: string
    responseContent: {
        list: Array<T>
        total: number
        pageNum: number
        pages: number
        pageSize: number
    }
}

export interface IPageBase {
    pageNum: number
    pageSize: number
}

export interface IComponentState {
    componentName: string
    state: 'pending' | 'complete'
}