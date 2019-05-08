export interface IResponseBase<T> {
    statusCode: string
    statusMessage: string
    responseContent?: T
}